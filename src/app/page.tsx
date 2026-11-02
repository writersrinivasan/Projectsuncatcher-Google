import Link from "next/link";
import { OrbitHero } from "@/components/OrbitHero";
import { Card, Section } from "@/components/ui";
import { mission, poem, stats } from "@/data/knowledge";

const tiles = [
  { href: "/poem", emoji: "🪶", title: "The Poem From Space", text: "Read the haiku and follow its 7-hop trip from Earth to orbit and back.", color: "from-pink-500/30 to-violet-500/30" },
  { href: "/how-it-works", emoji: "⚙️", title: "How It Works", text: "Orbits, lasers, radiation-tested TPUs and the heat problem.", color: "from-emerald-500/30 to-cyan-500/30" },
  { href: "/why-space", emoji: "🌍", title: "Why Go to Space?", text: "Earth's data-center limits, explained as a colorful workflow.", color: "from-amber-500/30 to-red-500/30" },
  { href: "/race", emoji: "🏁", title: "The Orbital Race", text: "Google, SpaceX, Starcloud, Blue Origin, OpenAI, Anthropic, Meta and more.", color: "from-sky-500/30 to-indigo-500/30" },
  { href: "/future", emoji: "🔮", title: "Future Roadmap", text: "From one haiku to gigawatts in orbit: what has to happen.", color: "from-fuchsia-500/30 to-purple-500/30" },
  { href: "/studio", emoji: "🤖", title: "Agent Studio", text: "Three AI agents research, design and quiz on any topic, live.", color: "from-lime-500/30 to-emerald-500/30" },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-6 lg:grid-cols-2">
        <div className="rise">
          <p className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest glass text-amber-200">
            🚀 Launched 1 Oct 2026 · first AI answer from orbit
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] sm:text-7xl">
            An AI wrote a poem <span className="text-gradient">in space.</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            Google&apos;s <b className="text-white">{mission.name}</b> put four TPUs in orbit. A prompt went up, Gemma 4 ran on a chip moving at
            ~27,000 km/h, and a haiku came back down over Svalbard. This is the first step toward AI data centers powered directly by the Sun.
          </p>
          <blockquote className="mt-8 rounded-2xl border-l-4 border-fuchsia-400 p-5 font-display text-2xl leading-snug glass">
            {poem.lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
            <footer className="mt-3 text-sm font-sans text-muted">— Gemma 4, on a Google TPU in low Earth orbit</footer>
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/poem" className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 font-semibold shadow-lg shadow-fuchsia-500/30 hover:brightness-110">
              Follow the poem&apos;s journey →
            </Link>
            <Link href="/studio" className="rounded-full px-6 py-3 font-semibold glass hover:bg-white/10">
              🤖 Try the AI agents
            </Link>
          </div>
        </div>
        <OrbitHero />
      </section>

      <Section title="The mission in numbers" emoji="📊">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <div className="text-3xl">{s.emoji}</div>
              <div className="mt-2 font-display text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Explore" emoji="🧭">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t) => (
            <Link key={t.href} href={t.href} className={`group rounded-2xl bg-gradient-to-br ${t.color} p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-white/30`}>
              <div className="text-4xl transition group-hover:scale-110">{t.emoji}</div>
              <h3 className="mt-3 font-display text-xl font-bold">{t.title}</h3>
              <p className="mt-2 text-sm text-white/80">{t.text}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Reality check" emoji="🧪">
        <Card className="border-amber-400/30">
          <p className="text-lg">{mission.notYet}</p>
          <p className="mt-2 text-muted">{mission.power}. {mission.duration}.</p>
        </Card>
      </Section>
    </>
  );
}
