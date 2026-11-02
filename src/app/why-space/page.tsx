import { Card, PageHeader, Section } from "@/components/ui";
import { earthChallenges, spaceAdvantages, spaceChallenges, whyWorkflow } from "@/data/knowledge";

export const metadata = { title: "Why Space? · Suncatcher Academy" };

const flowColors = [
  "from-pink-500 to-rose-500",
  "from-orange-500 to-amber-400",
  "from-red-500 to-orange-500",
  "from-yellow-400 to-lime-400",
  "from-emerald-500 to-teal-400",
  "from-sky-500 to-cyan-400",
  "from-violet-500 to-fuchsia-500",
];

export default function WhySpace() {
  return (
    <>
      <PageHeader kicker="The big why" title={<>Why put data centers <span className="text-gradient">in space?</span></>}>
        AI needs electricity faster than Earth can deliver it. This page walks through the logic, the limits on Earth, and the new problems orbit brings.
      </PageHeader>

      <Section title="The workflow: from AI boom to orbit" emoji="🌈">
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {whyWorkflow.map((s, i) => (
            <li key={s.title} className="relative">
              <div className={`h-full rounded-2xl bg-gradient-to-br ${flowColors[i]} p-5 text-white shadow-xl`}>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{s.emoji}</span>
                  <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-1 text-white/90">{s.detail}</p>
              </div>
              {i < whyWorkflow.length - 1 && (
                <span className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 text-2xl md:hidden" aria-hidden>⬇️</span>
              )}
            </li>
          ))}
          <li className="flex items-center justify-center rounded-2xl border-2 border-dashed border-white/20 p-5 text-center text-muted">
            <span>
              <span className="block text-4xl">❓</span>
              Your turn: what&apos;s step 8?
            </span>
          </li>
        </ol>
      </Section>

      <Section title="Data center electricity is set to more than double" emoji="⚡">
        <Card>
          <div className="space-y-4">
            {[
              { year: "2024", twh: 415, color: "from-amber-400 to-orange-500" },
              { year: "2030 (projection)", twh: 945, color: "from-red-500 to-fuchsia-500" },
            ].map((b) => (
              <div key={b.year}>
                <div className="flex justify-between text-sm"><span>{b.year}</span><span className="font-mono">~{b.twh} TWh</span></div>
                <div className="mt-1 h-6 rounded-full bg-white/10">
                  <div className={`h-6 rounded-full bg-gradient-to-r ${b.color}`} style={{ width: `${(b.twh / 945) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">IEA estimate for global data centers. For scale, ~945 TWh is roughly what Japan uses in a year.</p>
        </Card>
      </Section>

      <Section title="8 problems with data centers on Earth" emoji="🌍">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {earthChallenges.map((c) => (
            <div key={c.title} className="overflow-hidden rounded-2xl glass">
              <div className={`bg-gradient-to-r ${c.color} px-4 py-3`}>
                <span className="text-3xl">{c.emoji}</span>
                <h3 className="font-display text-lg font-bold text-white">{c.title}</h3>
              </div>
              <div className="p-4">
                <p className="font-mono text-sm text-amber-200">{c.stat}</p>
                <p className="mt-2 text-sm text-muted">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The trade-off" emoji="⚖️">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-gradient-to-br from-emerald-500/15 to-sky-500/15">
            <h3 className="font-display text-2xl font-bold">✅ What orbit gives you</h3>
            <ul className="mt-4 space-y-3">
              {spaceAdvantages.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <span className="text-2xl">{a.emoji}</span>
                  <span><b>{a.title}.</b> <span className="text-muted">{a.detail}</span></span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-gradient-to-br from-rose-500/15 to-amber-500/15">
            <h3 className="font-display text-2xl font-bold">⚠️ What orbit makes harder</h3>
            <ul className="mt-4 space-y-3">
              {spaceChallenges.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <span className="text-2xl">{a.emoji}</span>
                  <span><b>{a.title}.</b> <span className="text-muted">{a.detail}</span></span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
