import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { searchKnowledge, TOPICS } from "./search";
import { knowledgeChunks } from "@/data/knowledge";
import { Infographic, EngagementKit, type AgentEvent, type AgentName, type InfographicT, type EngagementKitT } from "./schema";

const MODEL = "claude-opus-5-5";

type Emit = (e: AgentEvent) => void;

// Shared request settings. `fallbacks: "default"` lets the API re-run a declined
// request on Anthropic's recommended fallback model instead of returning a refusal.
const base = {
  model: MODEL,
  max_tokens: 16000,
  betas: ["server-side-fallback-2026-07-01"],
  fallbacks: "default" as const,
};

const GROUNDING = `Ground every claim in the knowledge base tool results. Never invent numbers, dates, quotes or company plans.
If something is a projection or analysis, say so. Keep language vivid and classroom-friendly.`;

async function runAgent(
  client: Anthropic,
  agent: AgentName,
  emit: Emit,
  params: { system: string; prompt: string; tools: Parameters<typeof client.beta.messages.toolRunner>[0]["tools"]; effort: "low" | "medium" | "high" },
) {
  emit({ type: "agent_start", agent });
  const runner = client.beta.messages.toolRunner({
    ...base,
    system: params.system,
    tools: params.tools,
    output_config: { effort: params.effort },
    max_iterations: 8,
    messages: [{ role: "user", content: params.prompt }],
  });

  let text = "";
  for await (const message of runner) {
    if (message.stop_reason === "refusal") {
      throw new Error(`The ${agent} agent declined this topic. Try rephrasing it around Project Suncatcher.`);
    }
    for (const block of message.content) {
      if (block.type === "text" && block.text.trim()) {
        text = block.text;
        emit({ type: "note", agent, text: block.text.length > 280 ? `${block.text.slice(0, 280)}…` : block.text });
      }
    }
  }
  emit({ type: "agent_done", agent });
  return text;
}

export async function runPipeline(topic: string, audience: string, emit: Emit) {
  const client = new Anthropic();

  // ── Agent 1: Mission Researcher ─────────────────────────────────────────
  const search = betaZodTool({
    name: "search_knowledge_base",
    description: "Keyword search over the curated Project Suncatcher knowledge base. Returns the most relevant fact chunks.",
    inputSchema: z.object({ query: z.string().describe("Keywords, e.g. 'radiation HBM TPU'") }),
    run: async ({ query }) => {
      const hits = searchKnowledge(query);
      emit({ type: "tool_call", agent: "researcher", tool: "search_knowledge_base", summary: `“${query}” → ${hits.length} facts` });
      return hits.length ? hits.map((h) => `[${h.id} · ${h.topic}] ${h.text}`).join("\n") : "No matches. Try other keywords or read_topic.";
    },
  });
  const readTopic = betaZodTool({
    name: "read_topic",
    description: `Read every fact in one knowledge-base topic. Topics: ${TOPICS.join(", ")}.`,
    inputSchema: z.object({ topic: z.string() }),
    run: async ({ topic: t }) => {
      const hits = knowledgeChunks().filter((c) => c.topic === t.toLowerCase());
      emit({ type: "tool_call", agent: "researcher", tool: "read_topic", summary: `${t} → ${hits.length} facts` });
      return hits.length ? hits.map((h) => `[${h.id}] ${h.text}`).join("\n") : `Unknown topic. Valid: ${TOPICS.join(", ")}`;
    },
  });

  const brief = await runAgent(client, "researcher", emit, {
    effort: "low",
    tools: [search, readTopic],
    system: `You are the Mission Researcher on a team that builds training infographics about Google's Project Suncatcher (AI data centers in space). ${GROUNDING}`,
    prompt: `Topic requested by the trainer: "${topic}"\nAudience: ${audience}\n\nUse the tools to collect the relevant facts (2–5 searches is plenty). Then write a research brief of 10–15 bullet points: key facts with numbers, a cause→effect chain, and any caveats. Bullets only.`,
  });

  // ── Agent 2: Infographic Designer ───────────────────────────────────────
  let infographic: InfographicT | null = null;
  const publishInfographic = betaZodTool({
    name: "publish_infographic",
    description: "Publish the finished infographic spec to the trainer's screen. Call exactly once.",
    inputSchema: Infographic,
    run: async (spec) => {
      infographic = spec;
      emit({ type: "tool_call", agent: "designer", tool: "publish_infographic", summary: `“${spec.title}” · ${spec.blocks.length} blocks` });
      emit({ type: "infographic", data: spec });
      return "Published.";
    },
  });

  await runAgent(client, "designer", emit, {
    effort: "medium",
    tools: [publishInfographic],
    system: `You are the Infographic Designer. You turn research briefs into colorful, scannable infographics for live training sessions.
Mix block kinds (stats, flow, compare, timeline, callout) to fit the story. Use one emoji per item. Keep text short: labels ≤ 8 words, details ≤ 20 words.
Use only facts in the brief. ${GROUNDING}`,
    prompt: `Audience: ${audience}\nTopic: ${topic}\n\nResearch brief:\n${brief}\n\nDesign the infographic and publish it with publish_infographic. After publishing, reply with one short sentence.`,
  });
  if (!infographic) throw new Error("The designer agent finished without publishing an infographic.");

  // ── Agent 3: Session Coach ──────────────────────────────────────────────
  const publishKit = betaZodTool({
    name: "publish_engagement_kit",
    description: "Publish the audience engagement kit (hook, analogy, discussion prompts, quiz). Call exactly once.",
    inputSchema: EngagementKit,
    run: async (kit: EngagementKitT) => {
      emit({ type: "tool_call", agent: "coach", tool: "publish_engagement_kit", summary: `${kit.quiz.length} quiz questions · ${kit.discussion.length} prompts` });
      emit({ type: "kit", data: kit });
      return "Published.";
    },
  });

  await runAgent(client, "coach", emit, {
    effort: "low",
    tools: [publishKit],
    system: `You are the Session Coach. You make training sessions interactive: hooks, analogies, discussion questions and quick quizzes.
Quiz answers must come from the brief. Make the wrong options plausible. ${GROUNDING}`,
    prompt: `Audience: ${audience}\nTopic: ${topic}\n\nResearch brief:\n${brief}\n\nBuild the engagement kit and publish it with publish_engagement_kit. After publishing, reply with one short sentence.`,
  });
}
