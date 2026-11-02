// Earth with a Suncatcher satellite orbiting it, and the Sun feeding it light.
export function OrbitHero() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" aria-hidden>
      <div className="absolute -top-2 -right-2 h-20 w-20 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-500 shadow-[0_0_80px_30px_rgba(251,191,36,0.45)] float" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-white/20" />
      <div className="absolute inset-[6%] rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-[28%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#7dd3fc,#2563eb_45%,#1e1b4b_80%)] shadow-[0_0_80px_10px_rgba(56,189,248,0.35)]">
        <div className="absolute inset-[18%] rounded-[45%_55%_40%_60%] bg-emerald-400/50 blur-[2px]" />
        <div className="absolute left-[55%] top-[20%] h-[25%] w-[30%] rounded-full bg-emerald-300/50 blur-[1px]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_40%,rgba(0,0,0,0.55))]" />
      </div>
      <div className="absolute left-1/2 top-1/2 -ml-5 -mt-5 orbiter" style={{ ["--r" as string]: "min(170px, 40vw)", ["--t" as string]: "14s" }}>
        <div className="flex h-10 w-10 items-center justify-center text-3xl drop-shadow-[0_0_12px_rgba(244,114,182,0.9)]">🛰️</div>
      </div>
      <div className="absolute left-1/2 top-1/2 -ml-3 -mt-3 orbiter" style={{ ["--r" as string]: "min(120px, 28vw)", ["--t" as string]: "9s" }}>
        <div className="text-xl">✨</div>
      </div>
    </div>
  );
}
