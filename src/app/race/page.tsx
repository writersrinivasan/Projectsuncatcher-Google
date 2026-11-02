import { PageHeader, Section, StatusPill } from "@/components/ui";
import { players, timeline } from "@/data/knowledge";

export const metadata = { title: "The Orbital Race · Suncatcher Academy" };

export default function Race() {
  return (
    <>
      <PageHeader kicker="Every big AI player's angle" title={<>The race for <span className="text-gradient">orbital compute</span></>}>
        Some are flying hardware, some have filed paperwork, and some are betting on Earth. The badges show how real each plan is, and the &ldquo;perspective&rdquo; lines are our analysis, not company statements.
      </PageHeader>

      <Section title="The players" emoji="🏁">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {players.map((p) => (
            <article key={p.name} className="flex flex-col overflow-hidden rounded-2xl glass">
              <div className={`bg-gradient-to-r ${p.color} px-5 py-4 text-white`}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <span className="text-2xl">{p.emoji}</span>
                </div>
                <p className="mt-1 text-sm text-white/90">{p.program}</p>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <StatusPill status={p.status} />
                <ul className="mt-3 space-y-1.5 text-sm">
                  {p.facts.map((f) => (
                    <li key={f} className="flex gap-2"><span className="text-fuchsia-300">▸</span>{f}</li>
                  ))}
                </ul>
                <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-muted">
                  <b className="text-white">🧭 Perspective:</b> {p.perspective}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Timeline" emoji="🗓️">
        <ol className="relative ml-3 border-l-2 border-dashed border-white/20">
          {timeline.map((t) => (
            <li key={t.title} className="mb-6 ml-6">
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 pulse-ring" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-amber-200">{t.date}</span>
                <StatusPill status={t.status} />
              </div>
              <h3 className="mt-1 font-display text-lg font-bold">{t.title}</h3>
              <p className="text-muted">{t.detail}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
