import { z } from "zod";

// Shared between the agents (tool input schemas) and the UI renderer.

export const Palette = z.enum(["sunrise", "ocean", "aurora", "nebula", "solar"]);

const StatsBlock = z.object({
  kind: z.literal("stats"),
  heading: z.string(),
  items: z.array(z.object({ value: z.string(), label: z.string(), emoji: z.string() })).min(2).max(6),
});

const FlowBlock = z.object({
  kind: z.literal("flow"),
  heading: z.string(),
  steps: z.array(z.object({ emoji: z.string(), title: z.string(), detail: z.string() })).min(3).max(8),
});

const CompareBlock = z.object({
  kind: z.literal("compare"),
  heading: z.string(),
  left: z.object({ title: z.string(), emoji: z.string(), points: z.array(z.string()).min(2).max(6) }),
  right: z.object({ title: z.string(), emoji: z.string(), points: z.array(z.string()).min(2).max(6) }),
});

const TimelineBlock = z.object({
  kind: z.literal("timeline"),
  heading: z.string(),
  events: z.array(z.object({ date: z.string(), title: z.string(), detail: z.string() })).min(2).max(8),
});

const CalloutBlock = z.object({
  kind: z.literal("callout"),
  emoji: z.string(),
  text: z.string(),
});

export const InfographicBlock = z.discriminatedUnion("kind", [StatsBlock, FlowBlock, CompareBlock, TimelineBlock, CalloutBlock]);

export const Infographic = z.object({
  title: z.string().describe("Punchy title, max ~8 words"),
  subtitle: z.string().describe("One sentence framing the takeaway"),
  palette: Palette,
  blocks: z.array(InfographicBlock).min(3).max(6),
});

export const EngagementKit = z.object({
  hook: z.string().describe("A 1–2 sentence opener a trainer reads aloud"),
  analogy: z.string().describe("A memorable everyday analogy"),
  discussion: z.array(z.string()).min(2).max(4),
  quiz: z
    .array(
      z.object({
        q: z.string(),
        options: z.array(z.string()).length(4),
        answer: z.number().int().min(0).max(3),
        why: z.string(),
      }),
    )
    .min(3)
    .max(5),
});

export type InfographicT = z.infer<typeof Infographic>;
export type InfographicBlockT = z.infer<typeof InfographicBlock>;
export type EngagementKitT = z.infer<typeof EngagementKit>;

export type AgentName = "researcher" | "designer" | "coach";

export type AgentEvent =
  | { type: "mode"; mode: "live" | "demo"; reason?: string }
  | { type: "agent_start"; agent: AgentName }
  | { type: "tool_call"; agent: AgentName; tool: string; summary: string }
  | { type: "note"; agent: AgentName; text: string }
  | { type: "agent_done"; agent: AgentName }
  | { type: "infographic"; data: InfographicT }
  | { type: "kit"; data: EngagementKitT }
  | { type: "error"; message: string }
  | { type: "done" };
