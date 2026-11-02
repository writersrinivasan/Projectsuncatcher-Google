import { earthChallenges, players, poem, poemJourney, spaceAdvantages, spaceChallenges, stats, timeline, quiz } from "@/data/knowledge";
import { searchKnowledge } from "./search";
import type { AgentEvent, EngagementKitT, InfographicT } from "./schema";

// Offline demo: the same three-agent flow, but the "agents" assemble infographics
// from the knowledge base without calling a model. Keeps a live session running
// when there's no API key or no Wi-Fi.

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function pickInfographic(topic: string): InfographicT {
  const t = topic.toLowerCase();
  if (/(compan|race|openai|spacex|anthropic|meta|player|llm|compet)/.test(t)) {
    return {
      title: "The Orbital Compute Race",
      subtitle: "Who's flying, who's filing, and who's staying on the ground.",
      palette: "nebula",
      blocks: [
        { kind: "stats", heading: "Scoreboard", items: [
          { value: "3", label: "Programs with compute already in orbit", emoji: "🛰️" },
          { value: "1M", label: "Satellites in SpaceX's FCC filing", emoji: "📄" },
          { value: "51,600", label: "Blue Origin Project Sunrise filing", emoji: "🌅" },
          { value: "88k", label: "Starcloud constellation filing", emoji: "⭐" },
        ] },
        { kind: "flow", heading: "Who's doing what", steps: players.slice(0, 6).map((p) => ({ emoji: p.emoji, title: p.name, detail: p.program })) },
        { kind: "compare", heading: "Two strategies", left: { title: "Go to orbit", emoji: "🚀", points: ["Google: TPUs in orbit", "SpaceX: owns the rockets", "Starcloud: H100 in orbit"] }, right: { title: "Stay on Earth (for now)", emoji: "🌍", points: ["OpenAI: Stargate campuses", "Meta: nuclear and gas deals", "Anthropic: multi-cloud chips"] } },
        { kind: "callout", emoji: "💡", text: "Whoever controls launch cost controls the economics. That's why rocket owners are in the lead." },
      ],
    };
  }
  if (/(challenge|risk|problem|radiation|heat|thermal|debris|hard)/.test(t)) {
    return {
      title: "Space Is Hard: 8 Big Hurdles",
      subtitle: "Unlimited sunlight comes with a long engineering to-do list.",
      palette: "solar",
      blocks: [
        { kind: "flow", heading: "The hurdles", steps: spaceChallenges.map((c) => ({ emoji: c.emoji, title: c.title, detail: c.detail })) },
        { kind: "stats", heading: "Radiation test results", items: [
          { value: "2 krad", label: "HBM errors start", emoji: "☢️" },
          { value: "750 rad", label: "Expected 5-year dose", emoji: "🛡️" },
          { value: "~3×", label: "Safety margin", emoji: "✅" },
          { value: "15 krad", label: "No hard failures up to", emoji: "💪" },
        ] },
        { kind: "callout", emoji: "🧊", text: "Getting rid of heat may be harder than getting power: radiators are big and heavy." },
      ],
    };
  }
  if (/(earth|why|water|grid|energy|power|land)/.test(t)) {
    return {
      title: "Why Leave Earth?",
      subtitle: "AI needs power faster than the ground can supply it.",
      palette: "sunrise",
      blocks: [
        { kind: "stats", heading: "The pressure", items: earthChallenges.slice(0, 4).map((c) => ({ value: c.stat, label: c.title, emoji: c.emoji })) },
        { kind: "compare", heading: "Earth vs orbit", left: { title: "On Earth", emoji: "🌍", points: earthChallenges.slice(0, 5).map((c) => c.title) }, right: { title: "In orbit", emoji: "🛰️", points: spaceAdvantages.map((a) => a.title) } },
        { kind: "callout", emoji: "☀️", text: "In a dawn–dusk orbit, a solar panel produces up to 8× more energy per year than on Earth." },
      ],
    };
  }
  return {
    title: "A Haiku From Orbit",
    subtitle: "How a prompt reached a TPU in space and came back as poetry.",
    palette: "aurora",
    blocks: [
      { kind: "callout", emoji: "🪐", text: poem.lines.join(" / ") },
      { kind: "flow", heading: "The poem's journey", steps: poemJourney.map((s) => ({ emoji: s.emoji, title: s.title, detail: s.detail })) },
      { kind: "stats", heading: "Mission in numbers", items: stats.slice(0, 4) },
      { kind: "timeline", heading: "How we got here", events: timeline.slice(0, 5).map((e) => ({ date: e.date, title: e.title, detail: e.detail })) },
    ],
  };
}

function pickKit(topic: string): EngagementKitT {
  return {
    hook: `Quick question before we start: what do "${topic}" and a haiku written 650 km above Earth have in common?`,
    analogy: "Suncatcher-1 is a camping trip for chips: we're checking whether they survive outdoors before building a city.",
    discussion: [
      "Which AI workloads would you move to orbit first, and why?",
      "Is a sky full of compute satellites an environmental fix or a new problem?",
      "Who should regulate a data center that isn't in any country?",
    ],
    quiz: quiz.slice(0, 4),
  };
}

export async function runDemo(topic: string, emit: (e: AgentEvent) => void) {
  emit({ type: "agent_start", agent: "researcher" });
  for (const q of [topic, "suncatcher TPU orbit", "challenges power"]) {
    await wait(500);
    emit({ type: "tool_call", agent: "researcher", tool: "search_knowledge_base", summary: `“${q}” → ${searchKnowledge(q).length} facts` });
  }
  await wait(400);
  emit({ type: "note", agent: "researcher", text: "Brief ready: facts, numbers and caveats collected." });
  emit({ type: "agent_done", agent: "researcher" });

  emit({ type: "agent_start", agent: "designer" });
  await wait(900);
  const info = pickInfographic(topic);
  emit({ type: "tool_call", agent: "designer", tool: "publish_infographic", summary: `“${info.title}” · ${info.blocks.length} blocks` });
  emit({ type: "infographic", data: info });
  emit({ type: "agent_done", agent: "designer" });

  emit({ type: "agent_start", agent: "coach" });
  await wait(700);
  const kit = pickKit(topic);
  emit({ type: "tool_call", agent: "coach", tool: "publish_engagement_kit", summary: `${kit.quiz.length} quiz questions · ${kit.discussion.length} prompts` });
  emit({ type: "kit", data: kit });
  emit({ type: "agent_done", agent: "coach" });
}
