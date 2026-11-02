import type { InfographicT, InfographicBlockT } from "@/lib/agents/schema";

const palettes: Record<InfographicT["palette"], { bg: string; chips: string[] }> = {
  sunrise: { bg: "from-rose-600/40 via-orange-500/30 to-amber-400/30", chips: ["from-pink-500 to-rose-500", "from-orange-500 to-amber-400", "from-amber-400 to-yellow-300", "from-red-500 to-pink-500"] },
  ocean: { bg: "from-sky-600/40 via-cyan-500/30 to-teal-400/30", chips: ["from-sky-500 to-blue-600", "from-cyan-400 to-sky-500", "from-teal-400 to-emerald-500", "from-indigo-500 to-sky-500"] },
  aurora: { bg: "from-emerald-600/40 via-teal-500/30 to-violet-500/30", chips: ["from-emerald-400 to-teal-500", "from-teal-400 to-cyan-500", "from-violet-500 to-fuchsia-500", "from-lime-400 to-emerald-500"] },
  nebula: { bg: "from-violet-700/40 via-fuchsia-600/30 to-pink-500/30", chips: ["from-violet-500 to-purple-600", "from-fuchsia-500 to-pink-500", "from-indigo-500 to-violet-500", "from-pink-500 to-rose-500"] },
  solar: { bg: "from-amber-600/40 via-orange-600/30 to-red-600/30", chips: ["from-yellow-400 to-amber-500", "from-orange-500 to-red-500", "from-amber-500 to-orange-600", "from-red-500 to-rose-600"] },
};

function Block({ block, chips }: { block: InfographicBlockT; chips: string[] }) {
  const chip = (i: number) => chips[i % chips.length];
  switch (block.kind) {
    case "stats":
      return (
        <div>
          <h3 className="mb-3 font-display text-xl font-bold">{block.heading}</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {block.items.map((s, i) => (
              <div key={i} className={`rounded-2xl bg-gradient-to-br ${chip(i)} p-4 text-white shadow-lg`}>
                <div className="text-2xl">{s.emoji}</div>
                <div className="mt-1 font-display text-2xl font-bold leading-tight">{s.value}</div>
                <div className="text-sm text-white/90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "flow":
      return (
        <div>
          <h3 className="mb-3 font-display text-xl font-bold">{block.heading}</h3>
          <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch">
            {block.steps.map((s, i) => (
              <li key={i} className="flex items-center gap-2 md:flex-1 md:basis-[180px]">
                <div className="h-full w-full rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
                  <div className="flex items-center gap-2">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${chip(i)} text-lg`}>{s.emoji}</span>
                    <span className="font-semibold">{s.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/75">{s.detail}</p>
                </div>
                {i < block.steps.length - 1 && <span className="hidden text-white/50 md:block">➜</span>}
              </li>
            ))}
          </ol>
        </div>
      );
    case "compare":
      return (
        <div>
          <h3 className="mb-3 font-display text-xl font-bold">{block.heading}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[block.left, block.right].map((side, i) => (
              <div key={i} className={`rounded-2xl bg-gradient-to-br ${chip(i * 2)} p-5 text-white`}>
                <p className="font-display text-lg font-bold">{side.emoji} {side.title}</p>
                <ul className="mt-2 space-y-1 text-sm">{side.points.map((p, k) => <li key={k}>• {p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      );
    case "timeline":
      return (
        <div>
          <h3 className="mb-3 font-display text-xl font-bold">{block.heading}</h3>
          <ol className="grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
            {block.events.map((e, i) => (
              <li key={i} className="rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
                <span className={`inline-block rounded-full bg-gradient-to-r ${chip(i)} px-2.5 py-0.5 text-xs font-bold text-white`}>{e.date}</span>
                <p className="mt-2 font-semibold">{e.title}</p>
                <p className="text-sm text-white/75">{e.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    case "callout":
      return (
        <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
          <span className="text-4xl">{block.emoji}</span>
          <p className="font-display text-lg font-semibold sm:text-xl">{block.text}</p>
        </div>
      );
  }
}

export function InfographicView({ data }: { data: InfographicT }) {
  const p = palettes[data.palette] ?? palettes.nebula;
  return (
    <article className={`rise overflow-hidden rounded-3xl bg-gradient-to-br ${p.bg} p-6 ring-1 ring-white/15 sm:p-8`}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">☀️ Suncatcher Academy · AI-generated infographic</p>
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{data.title}</h2>
      <p className="mt-1 text-lg text-white/80">{data.subtitle}</p>
      <div className="mt-6 space-y-6">
        {data.blocks.map((b, i) => <Block key={i} block={b} chips={p.chips} />)}
      </div>
    </article>
  );
}
