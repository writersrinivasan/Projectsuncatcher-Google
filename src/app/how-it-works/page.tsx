import { Constellation } from "@/components/Constellation";
import { Card, PageHeader, Section } from "@/components/ui";
import { architecture } from "@/data/knowledge";

export const metadata = { title: "How It Works · Suncatcher Academy" };

const stack = [
  { emoji: "☀️", layer: "The Sun", role: "Fuel", detail: "Near-constant sunlight in a dawn–dusk orbit", color: "from-yellow-300 to-amber-500" },
  { emoji: "🔆", layer: "Solar arrays", role: "Power plant", detail: "Up to 8× the yearly energy of the same panel on Earth", color: "from-amber-400 to-orange-500" },
  { emoji: "🔋", layer: "Power bus and batteries", role: "Grid", detail: "Suncatcher-1: about 1 kW, enough for one TPU at a time", color: "from-orange-500 to-rose-500" },
  { emoji: "🧠", layer: "TPU trays", role: "Servers", detail: "4 radiation-tested TPUs running Gemma 4", color: "from-rose-500 to-fuchsia-500" },
  { emoji: "🌡️", layer: "Radiators", role: "Chillers", detail: "Infrared heat rejection into deep space", color: "from-fuchsia-500 to-violet-500" },
  { emoji: "🔦", layer: "Optical inter-satellite links", role: "Network fabric", detail: "Laser links, 1.6 Tbps demo, aiming for tens of Tbps", color: "from-violet-500 to-indigo-500" },
  { emoji: "📡", layer: "Ground stations", role: "Internet backbone", detail: "Uplink prompts, downlink answers (e.g. Svalbard)", color: "from-indigo-500 to-sky-500" },
  { emoji: "👩‍💻", layer: "Users on Earth", role: "Customers", detail: "Send a prompt, get an answer from orbit", color: "from-sky-500 to-emerald-500" },
];

const mapping = [
  ["🏢 Building", "🛰️ Satellite bus"],
  ["🔌 Power grid", "☀️ Solar array"],
  ["❄️ Chillers and water towers", "🌡️ Radiators"],
  ["🧵 Network switches and fiber", "🔦 Laser links"],
  ["🌐 Internet backbone", "📡 Ground stations"],
  ["🧑‍🔧 On-site technicians", "♻️ Redundancy and fault-tolerant software"],
];

const radiation = [
  { label: "Expected 5-year shielded dose", value: 0.75, color: "bg-emerald-400" },
  { label: "HBM memory first shows errors", value: 2, color: "bg-amber-400" },
  { label: "No hard failures up to (single chip)", value: 15, color: "bg-fuchsia-400" },
];

export default function HowItWorks() {
  return (
    <>
      <PageHeader kicker="Technical deep dive" title={<>A data center, <span className="text-gradient">rebuilt for orbit</span></>}>
        Each part of a normal data center has a space version. Here&apos;s the stack, the cluster design and the test data behind Suncatcher.
      </PageHeader>

      <Section title="The orbital stack" emoji="🧱">
        <div className="space-y-2">
          {stack.map((s, i) => (
            <div key={s.layer} className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <div className={`flex items-center gap-3 rounded-xl bg-gradient-to-r ${s.color} px-4 py-3 font-semibold text-white shadow-lg`} style={{ marginLeft: `${Math.min(i, 4) * 6}px` }}>
                <span className="text-2xl">{s.emoji}</span>
                <span>{s.layer}</span>
                <span className="ml-auto rounded-full bg-black/25 px-2 py-0.5 text-xs">{s.role}</span>
              </div>
              <p className="text-muted">{s.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Six engineering pillars" emoji="🏛️">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {architecture.map((a) => (
            <Card key={a.title}>
              <div className="text-4xl">{a.emoji}</div>
              <h3 className="mt-2 font-display text-xl font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted">{a.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="The 81-satellite cluster (Google's example design)" emoji="🕸️">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Constellation />
          <div className="space-y-4 text-lg">
            <p>Lasers lose strength over distance, so <b>flying close together</b> is how Suncatcher gets data-center-class bandwidth between satellites.</p>
            <p className="text-muted">The paper models 81 satellites at ~650 km altitude in a cluster about 1 km in radius. The spacing between neighbors swings between ~100 and ~200 m as the satellites orbit. Physics models suggest only modest thrusting is needed to keep formation.</p>
            <p className="text-muted">Think of it as a server rack spread across a kilometer of vacuum, with lasers as the cables.</p>
          </div>
        </div>
      </Section>

      <Section title="Radiation test: Trillium TPU in a 67 MeV proton beam" emoji="☢️">
        <Card>
          <div className="space-y-4">
            {radiation.map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm">
                  <span>{r.label}</span>
                  <span className="font-mono">{r.value >= 1 ? `${r.value} krad(Si)` : `${r.value * 1000} rad(Si)`}</span>
                </div>
                <div className="mt-1 h-4 rounded-full bg-white/10">
                  <div className={`h-4 rounded-full ${r.color}`} style={{ width: `${(r.value / 15) * 100}%`, minWidth: "1rem" }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-muted">
            Takeaway: memory errors start at ~3× the dose a shielded chip would get in 5 years, and nothing broke permanently up to 20× that dose. Inference also tolerates occasional bit flips better than training.
          </p>
        </Card>
      </Section>

      <Section title="Earth data center → space data center" emoji="🔁">
        <div className="grid gap-3 sm:grid-cols-2">
          {mapping.map(([earth, space]) => (
            <div key={earth} className="flex items-center gap-3 rounded-xl p-4 glass">
              <span className="flex-1">{earth}</span>
              <span className="text-fuchsia-300">→</span>
              <span className="flex-1 text-right font-semibold">{space}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
