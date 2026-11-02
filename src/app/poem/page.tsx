import { PoemReveal } from "@/components/PoemReveal";
import { JourneyPlayer } from "@/components/JourneyPlayer";
import { Card, PageHeader, Section } from "@/components/ui";
import { mission, poem } from "@/data/knowledge";

export const metadata = { title: "The Poem From Space · Suncatcher Academy" };

const facts: [string, string][] = [
  ["Mission", mission.name],
  ["Built by", mission.partner],
  ["Launched", mission.launch],
  ["Size", mission.size],
  ["Compute", mission.chips],
  ["Power", mission.power],
  ["Checkout", mission.commissioning],
  ["Model", poem.model],
  ["Chip", poem.chip],
  ["Prompt", poem.prompt],
  ["Downlink", poem.downlink],
];

export default function PoemPage() {
  return (
    <>
      <PageHeader kicker="First words from an orbital data center" title={<>The haiku that <span className="text-gradient">phoned home</span></>}>
        {poem.claim} Google&apos;s own words: <i>“{poem.googleQuote}”</i>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4">
        <PoemReveal />
      </section>

      <Section title="Reading it line by line" emoji="🔍">
        <div className="grid gap-4 md:grid-cols-3">
          {poem.reading.map((r, i) => (
            <Card key={r.line}>
              <div className="text-3xl">{["🌍", "📡", "☀️"][i]}</div>
              <p className="mt-2 font-display text-xl font-semibold">“{r.line}”</p>
              <p className="mt-2 text-muted">{r.meaning}</p>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">{poem.alsoTried}</p>
      </Section>

      <Section title="The 7-hop journey: Earth → orbit → Earth" emoji="🛰️">
        <JourneyPlayer />
      </Section>

      <Section title="Mission fact sheet" emoji="📋">
        <div className="overflow-hidden rounded-2xl glass">
          <dl className="divide-y divide-white/10">
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[160px_1fr]">
                <dt className="font-semibold text-amber-200">{k}</dt>
                <dd className="text-white/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
