import Link from "next/link";
import { Card, PageHeader, Section } from "@/components/ui";
import { trainerKit, poem, mission } from "@/data/knowledge";

export const metadata = { title: "Trainer Kit · Suncatcher Academy" };

const colors = ["from-pink-500 to-rose-500", "from-orange-500 to-amber-400", "from-emerald-500 to-teal-500", "from-sky-500 to-indigo-500", "from-violet-500 to-fuchsia-500", "from-lime-500 to-emerald-500"];

const routes: Record<string, string> = {
  Hook: "/poem",
  "Why space?": "/why-space",
  "How it works": "/how-it-works",
  "The race": "/race",
  "Live agent demo": "/studio",
  "Quiz and wrap-up": "/quiz",
};

export default function Trainer() {
  return (
    <>
      <PageHeader kicker="For facilitators" title={<>Your 60-minute <span className="text-gradient">session plan</span></>}>
        A ready-made run sheet, talking points, discussion prompts and analogies. Each block links to the page to show on screen.
      </PageHeader>

      <Section title="Run sheet" emoji="⏱️">
        <ol className="space-y-3">
          {trainerKit.agenda.map((a, i) => (
            <li key={a.title} className="grid items-stretch gap-3 sm:grid-cols-[120px_1fr]">
              <div className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${colors[i]} p-3 font-mono font-bold text-white`}>{a.min} min</div>
              <div className="flex flex-wrap items-center gap-3 rounded-2xl p-4 glass">
                <div className="flex-1">
                  <p className="font-display text-lg font-bold">{a.title}</p>
                  <p className="text-sm text-muted">{a.activity}</p>
                </div>
                {routes[a.title] && (
                  <Link href={routes[a.title]} className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20">Open screen →</Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="30-second talking points" emoji="🗒️">
        <Card>
          <ul className="space-y-2">
            <li>☀️ <b>What:</b> {mission.name}, {mission.tagline.toLowerCase()}</li>
            <li>🚀 <b>When:</b> launched {mission.launch}.</li>
            <li>🧠 <b>What&apos;s on board:</b> {mission.chips}. {mission.power}.</li>
            <li>🪶 <b>The moment:</b> Gemma 4 wrote “{poem.lines.join(" / ")}”, downlinked over Svalbard.</li>
            <li>🧪 <b>Reality check:</b> {mission.notYet}</li>
            <li>🔮 <b>Next:</b> two laser-linked satellites in 2027. Cost parity with Earth depends on launch prices below ~$200/kg.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Discussion prompts" emoji="🗣️">
        <div className="grid gap-3 md:grid-cols-2">
          {trainerKit.discussion.map((d, i) => (
            <div key={d} className="flex gap-3 rounded-2xl p-4 glass">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colors[i]} font-bold`}>{i + 1}</span>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Analogies that land" emoji="💡">
        <div className="grid gap-3 sm:grid-cols-2">
          {trainerKit.analogies.map((a) => (
            <Card key={a.text} className="flex gap-3">
              <span className="text-3xl">{a.emoji}</span>
              <p>{a.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Engagement tips" emoji="🎯">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["🙋", "Poll first", "Before showing the poem, ask the room to guess where it was written."],
            ["🎲", "Team debate", "Give each team one company from The Race and 60 seconds to pitch its strategy."],
            ["🤖", "Audience-driven AI", "Take a topic from the audience and run it live in the Agent Studio."],
          ].map(([e, t, d]) => (
            <Card key={t}>
              <div className="text-3xl">{e}</div>
              <p className="mt-2 font-display font-bold">{t}</p>
              <p className="text-sm text-muted">{d}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
