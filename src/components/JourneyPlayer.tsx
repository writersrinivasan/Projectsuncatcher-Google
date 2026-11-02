"use client";

import { useEffect, useState } from "react";
import { poemJourney } from "@/data/knowledge";

// Satellite position along an arc for each hop (in SVG viewBox units)
const satPos = [
  { x: 90, y: 150 }, { x: 150, y: 80 }, { x: 260, y: 45 }, { x: 370, y: 45 }, { x: 480, y: 80 }, { x: 540, y: 150 }, { x: 540, y: 150 },
];

export function JourneyPlayer() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const last = poemJourney.length - 1;
    if (!playing || step >= last) return;
    const t = setTimeout(() => {
      setStep(step + 1);
      if (step + 1 >= last) setPlaying(false);
    }, 1800);
    return () => clearTimeout(t);
  }, [playing, step]);

  const cur = poemJourney[step];
  const sat = satPos[step];
  const uplink = step === 1;
  const downlink = step === 5 || step === 6;
  const computing = step === 2 || step === 3;

  return (
    <div className="rounded-3xl p-5 sm:p-8 glass">
      <svg viewBox="0 0 630 260" className="w-full" role="img" aria-label="Diagram of the satellite's path from the uplink station over the orbit to Svalbard">
        <defs>
          <radialGradient id="earth" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
          <linearGradient id="arc" x1="0" x2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <ellipse cx="315" cy="330" rx="420" ry="130" fill="url(#earth)" />
        <path d="M 60 170 Q 315 -40 570 170" fill="none" stroke="url(#arc)" strokeWidth="2" strokeDasharray="4 6" opacity="0.7" />
        {/* ground stations */}
        <g>
          <circle cx="70" cy="222" r="7" fill="#f472b6" />
          <text x="70" y="248" textAnchor="middle" fontSize="13" fill="#fbcfe8">Uplink station</text>
          <circle cx="560" cy="222" r="7" fill="#34d399" />
          <text x="560" y="248" textAnchor="middle" fontSize="13" fill="#a7f3d0">Svalbard 🇳🇴</text>
        </g>
        {uplink && <line x1="70" y1="222" x2={sat.x} y2={sat.y} stroke="#f472b6" strokeWidth="3" className="beam" />}
        {downlink && <line x1={sat.x} y1={sat.y} x2="560" y2="222" stroke="#34d399" strokeWidth="3" className="beam" />}
        <g style={{ transform: `translate(${sat.x}px, ${sat.y}px)`, transition: "transform 1.2s ease-in-out" }}>
          {computing && <circle r="26" fill="#fbbf24" opacity="0.25"><animate attributeName="r" values="18;30;18" dur="1.2s" repeatCount="indefinite" /></circle>}
          <text textAnchor="middle" dominantBaseline="central" fontSize="30">🛰️</text>
        </g>
        <text x="315" y="22" textAnchor="middle" fontSize="13" fill="#c7d2fe">☀️ dawn–dusk orbit · near-constant sunlight</text>
      </svg>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className={`rounded-2xl bg-gradient-to-br ${cur.color} p-6 text-white shadow-xl`} key={step}>
          <div className="text-xs font-semibold uppercase tracking-widest opacity-80">Hop {step + 1} of {poemJourney.length}</div>
          <div className="mt-2 text-5xl">{cur.emoji}</div>
          <h3 className="mt-2 font-display text-2xl font-bold">{cur.title}</h3>
          <p className="mt-2 text-white/90">{cur.detail}</p>
        </div>
        <ol className="space-y-2">
          {poemJourney.map((s, i) => (
            <li key={s.title}>
              <button
                onClick={() => { setPlaying(false); setStep(i); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${i === step ? "bg-white/15 ring-1 ring-white/30" : i < step ? "opacity-80 hover:bg-white/5" : "opacity-50 hover:bg-white/5"}`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.color} text-lg`}>{s.emoji}</span>
                <span className="font-semibold">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => { if (step >= poemJourney.length - 1) setStep(0); setPlaying(!playing); }}
          className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-2 font-semibold"
        >
          {playing ? "⏸ Pause" : "▶ Play the journey"}
        </button>
        <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-full bg-white/10 px-4 py-2">← Back</button>
        <button onClick={() => setStep(Math.min(poemJourney.length - 1, step + 1))} className="rounded-full bg-white/10 px-4 py-2">Next →</button>
      </div>
    </div>
  );
}
