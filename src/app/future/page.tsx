import { Card, PageHeader, Section } from "@/components/ui";
import { futureVision, glossary } from "@/data/knowledge";

export const metadata = { title: "Future Roadmap · Suncatcher Academy" };

const colors = ["from-emerald-500 to-teal-500", "from-sky-500 to-indigo-500", "from-violet-500 to-fuchsia-500", "from-pink-500 to-amber-500"];

const unlocks = [
  { emoji: "🚀", title: "Cheap, reusable heavy launch", detail: "Starship / New Glenn class. Google's paper needs < $200/kg." },
  { emoji: "🧊", title: "Lightweight radiators", detail: "Shedding megawatts of heat without huge mass." },
  { emoji: "🔦", title: "Tens of Tbps laser links", detail: "So satellites can work as one big computer." },
  { emoji: "🛡️", title: "Fault-tolerant AI software", detail: "Training and serving that ride through bit flips and dead chips." },
  { emoji: "🌐", title: "Optical ground links", detail: "Enough bandwidth to and from Earth." },
  { emoji: "⚖️", title: "Rules for orbit", detail: "Debris limits, spectrum, data jurisdiction, astronomy protections." },
];

const llmUseCases = [
  { emoji: "🛰️", title: "Earth-observation AI in orbit", detail: "Analyze satellite images where they're taken and send down only the insights. This is likely the first real use." },
  { emoji: "💬", title: "Batch inference", detail: "Non-urgent jobs like summarizing archives or generating embeddings don't care about latency." },
  { emoji: "🏋️", title: "Model training (later)", detail: "Needs huge bandwidth between nodes and handles bit flips poorly, so it's harder." },
  { emoji: "🌕", title: "Deep-space autonomy", detail: "Moon and Mars missions need on-board intelligence because the round trip to Earth is too slow." },
];

export default function Future() {
  return (
    <>
      <PageHeader kicker="Where this goes next" title={<>From one haiku to <span className="text-gradient">gigawatts in orbit</span></>}>
        These are projections based on Google&apos;s paper, company filings and public statements. Treat dates as scenarios, not promises.
      </PageHeader>

      <Section title="Roadmap" emoji="🗺️">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {futureVision.map((f, i) => (
            <div key={f.horizon} className={`rounded-2xl bg-gradient-to-br ${colors[i]} p-5 text-white shadow-xl`}>
              <div className="text-4xl">{f.emoji}</div>
              <p className="mt-2 font-mono text-sm opacity-90">{f.horizon}</p>
              <h3 className="font-display text-xl font-bold">{f.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-white/90">
                {f.points.map((p) => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="6 things that must go right" emoji="🔓">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unlocks.map((u) => (
            <Card key={u.title}>
              <div className="text-3xl">{u.emoji}</div>
              <h3 className="mt-2 font-display text-lg font-bold">{u.title}</h3>
              <p className="text-sm text-muted">{u.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="What runs in orbit first? (the LLM view)" emoji="🤖">
        <div className="grid gap-4 md:grid-cols-2">
          {llmUseCases.map((u, i) => (
            <Card key={u.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">{u.emoji}</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-300">Likelihood #{i + 1}</p>
                <h3 className="font-display text-lg font-bold">{u.title}</h3>
                <p className="text-sm text-muted">{u.detail}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Glossary" emoji="📖">
        <dl className="grid gap-3 sm:grid-cols-2">
          {glossary.map((g) => (
            <div key={g.term} className="rounded-xl p-4 glass">
              <dt className="font-display font-bold text-amber-200">{g.term}</dt>
              <dd className="mt-1 text-sm text-muted">{g.def}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
