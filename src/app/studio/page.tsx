import { PageHeader, Section } from "@/components/ui";
import { Studio } from "./Studio";

export const metadata = { title: "Agent Studio · Suncatcher Academy" };

const pipeline = [
  { emoji: "🧑‍🏫", title: "You pick a topic", detail: "Plus the audience level." },
  { emoji: "🔭", title: "Researcher agent", detail: "Calls search_knowledge_base and read_topic, then writes a fact brief." },
  { emoji: "🎨", title: "Designer agent", detail: "Calls publish_infographic with a schema-checked visual spec." },
  { emoji: "🎤", title: "Coach agent", detail: "Calls publish_engagement_kit: hook, analogy, discussion prompts, quiz." },
  { emoji: "🖥️", title: "Your screen", detail: "Events stream live into the lanes and the infographic renders." },
];

export default function StudioPage() {
  return (
    <>
      <PageHeader kicker="Agentic AI, live in the room" title={<>Agent <span className="text-gradient">Studio</span></>}>
        Three Claude agents work as a team: one researches, one designs an infographic, and one builds an engagement kit. They only use the vetted knowledge base, so they don&apos;t invent facts. Without an API key it runs an offline demo.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4">
        <Studio />
      </section>

      <Section title="How the agents work together" emoji="🧩">
        <ol className="grid gap-3 md:grid-cols-5">
          {pipeline.map((p, i) => (
            <li key={p.title} className="rounded-2xl p-4 glass">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{p.emoji}</span>
                <span className="rounded-full bg-white/10 px-2 text-xs">{i + 1}</span>
              </div>
              <p className="mt-2 font-semibold">{p.title}</p>
              <p className="text-sm text-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">
          Built on the Anthropic TypeScript SDK&apos;s Tool Runner (<code>client.beta.messages.toolRunner</code>) using <code>claude-opus-5-5</code>. Tool inputs are Zod schemas, so every infographic is checked against the schema before it renders. The code is in <code>src/lib/agents/</code>.
        </p>
      </Section>
    </>
  );
}
