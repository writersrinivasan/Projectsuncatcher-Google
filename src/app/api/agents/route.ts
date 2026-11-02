import Anthropic from "@anthropic-ai/sdk";
import { runPipeline } from "@/lib/agents/pipeline";
import { runDemo } from "@/lib/agents/demo";
import type { AgentEvent } from "@/lib/agents/schema";

export const maxDuration = 300;

// Streams newline-delimited JSON AgentEvents to the Agent Studio.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { topic?: string; audience?: string; mode?: "auto" | "demo" };
  const topic = (body.topic ?? "").trim().slice(0, 200) || "How the poem traveled from orbit to Earth";
  const audience = (body.audience ?? "").trim().slice(0, 120) || "mixed technical and non-technical professionals";
  const forceDemo = body.mode === "demo";

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const emit = (e: AgentEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        if (forceDemo) {
          emit({ type: "mode", mode: "demo", reason: "Demo mode selected" });
          await runDemo(topic, emit);
        } else {
          emit({ type: "mode", mode: "live" });
          try {
            await runPipeline(topic, audience, emit);
          } catch (err) {
            // No credentials or no network → fall back to the offline demo so the session keeps going.
            // The SDK throws a plain Error (no typed class) when it finds no credentials at all.
            const noCreds =
              err instanceof Anthropic.AuthenticationError ||
              (err instanceof Error && !(err instanceof Anthropic.APIError) && err.message.startsWith("Could not resolve authentication method"));
            if (noCreds || err instanceof Anthropic.APIConnectionError) {
              emit({
                type: "mode",
                mode: "demo",
                reason: noCreds
                  ? "No Anthropic credentials found, so this is the offline demo. Set ANTHROPIC_API_KEY to run the live agents."
                  : "Couldn't reach the Anthropic API, so this is the offline demo.",
              });
              await runDemo(topic, emit);
            } else {
              throw err;
            }
          }
        }
        emit({ type: "done" });
      } catch (err) {
        const message =
          err instanceof Anthropic.RateLimitError
            ? "Rate limited. Wait a moment and try again."
            : err instanceof Anthropic.APIError
              ? `API error ${err.status}: ${err.message}`
              : err instanceof Error
                ? err.message
                : "Unknown error";
        emit({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache, no-transform" },
  });
}
