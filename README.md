# ☀️ Suncatcher Academy

A colorful, interactive learning hub about **Google's Project Suncatcher**, the first step toward AI data centers in space. Built for training sessions and knowledge-transfer talks.

> *Blue marble below / Data streams in silent grace / Starlight feeds my core.*
> Gemma 4, running on a Google TPU in low Earth orbit (late Oct 2026)

## What's inside

| Page | What the audience gets |
|---|---|
| `/` | Hero, the poem, the mission in numbers |
| `/poem` | Animated poem reveal (with a 5·7·5 syllable view), an interactive 7-hop journey (uplink → TPU → Svalbard downlink), mission fact sheet |
| `/how-it-works` | Orbital data-center stack, the 81-satellite cluster diagram, radiation test results, Earth-to-space component mapping |
| `/why-space` | Colorful "why go to space" workflow, IEA power outlook, 8 problems on Earth, pros and cons of orbit |
| `/race` | Google, SpaceX/xAI, Starcloud, Blue Origin, OpenAI, Anthropic, Meta, Microsoft, China, each with a status badge |
| `/future` | 2026→2040+ roadmap, what has to go right, which LLM workloads move to orbit first, glossary |
| `/studio` | **Agent Studio**: 3 Claude agents build an infographic and an engagement kit on any topic, live |
| `/quiz` | 10-question quiz for the big screen |
| `/trainer` | 60-minute run sheet, talking points, discussion prompts, analogies |

## Run it

```bash
npm install
cp .env.example .env.local   # optional: add ANTHROPIC_API_KEY for live agents
npm run dev                  # http://localhost:3000
```

Without a key, the Agent Studio switches to an **offline demo** that builds infographics from the knowledge base, so the session never stalls.

## The agentic pipeline

`src/lib/agents/` uses the Anthropic TypeScript SDK's **Tool Runner** (`client.beta.messages.toolRunner`) with `claude-opus-5-5`:

1. 🔭 **Mission Researcher**: tools `search_knowledge_base` and `read_topic`. Writes a fact brief grounded in `src/data/knowledge.ts`.
2. 🎨 **Infographic Designer**: tool `publish_infographic`. Its input is a Zod schema (stats / flow / compare / timeline / callout blocks), so the UI only renders validated specs.
3. 🎤 **Session Coach**: tool `publish_engagement_kit` (hook, analogy, discussion prompts, quiz).

`/api/agents` streams each agent's progress to the browser as NDJSON. Requests opt into server-side refusal fallbacks (`fallbacks: "default"`).

## Updating the content

All facts live in **`src/data/knowledge.ts`**. Every page, the quiz and the agents' search tool read from it. Edit it once and the whole app updates. `docs/KNOWLEDGE.md` has the same material as plain notes for slides and handouts.

Facts are current as of **2 Nov 2026**. Company "perspectives" and future timelines are labelled as analysis or projection, not announcements.
