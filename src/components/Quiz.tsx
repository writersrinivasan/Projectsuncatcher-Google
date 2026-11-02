"use client";

import { useState } from "react";
import type { QuizQ } from "@/data/knowledge";

const optionColors = ["from-pink-500 to-rose-500", "from-amber-400 to-orange-500", "from-emerald-500 to-teal-500", "from-sky-500 to-indigo-500"];

export function Quiz({ questions, compact = false }: { questions: QuizQ[]; compact?: boolean }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= questions.length;

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-3xl p-8 text-center glass">
        <div className="text-6xl">{pct >= 80 ? "🚀" : pct >= 50 ? "🛰️" : "🌍"}</div>
        <p className="mt-3 font-display text-4xl font-bold text-gradient">{score} / {questions.length}</p>
        <p className="mt-2 text-muted">{pct >= 80 ? "Mission specialist!" : pct >= 50 ? "Cleared for orbit." : "Still on the launch pad. Try again!"}</p>
        <button onClick={() => { setI(0); setScore(0); setPicked(null); }} className="mt-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-2 font-semibold">
          ↻ Play again
        </button>
      </div>
    );
  }

  const q = questions[i];
  return (
    <div className={`rounded-3xl glass ${compact ? "p-5" : "p-6 sm:p-10"}`}>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Question {i + 1} / {questions.length}</span>
        <span>⭐ {score}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all" style={{ width: `${(i / questions.length) * 100}%` }} />
      </div>
      <h3 className={`mt-6 font-display font-bold ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>{q.q}</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {q.options.map((o, k) => {
          const isRight = picked !== null && k === q.answer;
          const isWrong = picked === k && k !== q.answer;
          return (
            <button
              key={o}
              disabled={picked !== null}
              onClick={() => { setPicked(k); if (k === q.answer) setScore((s) => s + 1); }}
              className={`rounded-2xl bg-gradient-to-r ${optionColors[k]} px-5 py-4 text-left font-semibold text-white transition
                ${picked === null ? "hover:scale-[1.02] hover:shadow-xl" : ""}
                ${picked !== null && !isRight && !isWrong ? "opacity-35" : ""}
                ${isRight ? "ring-4 ring-emerald-300" : ""} ${isWrong ? "ring-4 ring-red-300" : ""}`}
            >
              <span className="mr-2 opacity-80">{"ABCD"[k]}.</span>{o} {isRight && "✅"} {isWrong && "❌"}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-6 rise">
          <p className="rounded-xl bg-white/5 p-4 text-muted">💡 {q.why}</p>
          <button onClick={() => { setI(i + 1); setPicked(null); }} className="mt-4 rounded-full bg-white/15 px-6 py-2 font-semibold hover:bg-white/25">
            {i + 1 < questions.length ? "Next question →" : "See score 🏆"}
          </button>
        </div>
      )}
    </div>
  );
}
