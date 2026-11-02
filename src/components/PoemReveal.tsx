"use client";

import { useEffect, useState } from "react";
import { poem } from "@/data/knowledge";

const colors = ["bg-pink-500/30", "bg-amber-500/30", "bg-emerald-500/30", "bg-sky-500/30", "bg-violet-500/30", "bg-rose-500/30", "bg-lime-500/30"];

export function PoemReveal() {
  const [shown, setShown] = useState(0);
  const [syllables, setSyllables] = useState(false);

  useEffect(() => {
    if (shown >= poem.lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 400 : 1400);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">📡 Received via Svalbard ground station</p>
      <div className="mt-6 space-y-3 font-display text-3xl font-semibold leading-snug sm:text-5xl">
        {poem.lines.map((line, i) => (
          <p key={line} className={`transition-all duration-700 ${i < shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            {syllables ? (
              <span className="flex flex-wrap gap-1.5">
                {poem.syllables[i].map((s, j) => (
                  <span key={j} className={`rounded-lg px-2 py-0.5 ${colors[j % colors.length]}`}>{s}</span>
                ))}
                <span className="ml-2 self-center rounded-full bg-white/10 px-3 py-1 text-base font-sans">{poem.syllables[i].length}</span>
              </span>
            ) : (
              line
            )}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
        <button onClick={() => setSyllables(!syllables)} className="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">
          {syllables ? "Hide" : "Show"} 5·7·5 syllables
        </button>
        <button onClick={() => setShown(0)} className="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">
          ↻ Replay transmission
        </button>
        <span className="text-muted">{poem.form} · {poem.model}</span>
      </div>
    </div>
  );
}
