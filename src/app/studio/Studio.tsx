"use client";

import { useRef, useState } from "react";
import { InfographicView } from "@/components/InfographicView";
import { Quiz } from "@/components/Quiz";
import type { AgentEvent, AgentName, EngagementKitT, InfographicT } from "@/lib/agents/schema";

const presets = [
  "How the poem traveled from orbit to Earth",
  "Why Earth is running out of room for AI data centers",
  "The biggest engineering challenges in space",
  "Which AI companies are racing to orbit, and why",
  "Radiation vs TPUs: will chips survive?",
];

const audiences = ["Mixed technical and non-technical professionals", "Software engineers", "Business leaders", "College students", "School kids (age 12–15)"];

const agentMeta: Record<AgentName, { emoji: string; name: string; role: string; color: string }> = {
  researcher: { emoji: "🔭", name: "Mission Researcher", role: "Searches the knowledge base and writes a fact brief", color: "from-sky-500 to-cyan-400" },
  designer: { emoji: "🎨", name: "Infographic Designer", role: "Turns the brief into a colorful visual spec", color: "from-pink-500 to-fuchsia-500" },
  coach: { emoji: "🎤", name: "Session Coach", role: "Writes a hook, analogy, discussion prompts and quiz", color: "from-amber-400 to-orange-500" },
};

type Status = "idle" | "working" | "done";
type Log = { agent: AgentName; text: string; kind: "tool" | "note" };

export function Studio() {
  const [topic, setTopic] = useState(presets[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [demo, setDemo] = useState(false);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<Record<AgentName, Status>>({ researcher: "idle", designer: "idle", coach: "idle" });
  const [logs, setLogs] = useState<Log[]>([]);
  const [mode, setMode] = useState<{ mode: "live" | "demo"; reason?: string } | null>(null);
  const [info, setInfo] = useState<InfographicT | null>(null);
  const [kit, setKit] = useState<EngagementKitT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  function handle(e: AgentEvent) {
    switch (e.type) {
      case "mode": setMode({ mode: e.mode, reason: e.reason }); if (e.mode === "demo") setStatus({ researcher: "idle", designer: "idle", coach: "idle" }); break;
      case "agent_start": setStatus((s) => ({ ...s, [e.agent]: "working" })); break;
      case "agent_done": setStatus((s) => ({ ...s, [e.agent]: "done" })); break;
      case "tool_call": setLogs((l) => [...l, { agent: e.agent, kind: "tool", text: `🛠️ ${e.tool}: ${e.summary}` }]); break;
      case "note": setLogs((l) => [...l, { agent: e.agent, kind: "note", text: e.text }]); break;
      case "infographic": setInfo(e.data); break;
      case "kit": setKit(e.data); break;
      case "error": setError(e.message); break;
    }
  }

  async function run() {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setRunning(true); setLogs([]); setInfo(null); setKit(null); setError(null); setMode(null);
    setStatus({ researcher: "idle", designer: "idle", coach: "idle" });
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, audience, mode: demo ? "demo" : "auto" }),
        signal: ctrl.signal,
      });
      if (!res.body) throw new Error("No response stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) if (line.trim()) handle(JSON.parse(line) as AgentEvent);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") setError((err as Error).message);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="rounded-3xl p-6 glass">
        <label className="text-sm font-semibold text-amber-200" htmlFor="topic">What should the agents explain?</label>
        <input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-2 w-full rounded-xl bg-black/30 px-4 py-3 text-lg outline-none ring-1 ring-white/15 focus:ring-fuchsia-400"
          placeholder="e.g. Why do satellites fly 100 m apart?"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p} onClick={() => setTopic(p)} className={`rounded-full px-3 py-1 text-sm ${topic === p ? "bg-fuchsia-500/40" : "bg-white/10 hover:bg-white/20"}`}>{p}</button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <label className="text-sm">
            <span className="mr-2 text-muted">Audience</span>
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className="rounded-lg bg-black/40 px-3 py-2 ring-1 ring-white/15">
              {audiences.map((a) => <option key={a}>{a}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={demo} onChange={(e) => setDemo(e.target.checked)} className="h-4 w-4 accent-fuchsia-500" />
            Offline demo (no API key needed)
          </label>
          <button
            onClick={run}
            disabled={running || !topic.trim()}
            className="ml-auto rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-7 py-3 font-bold shadow-lg shadow-fuchsia-500/30 disabled:opacity-50"
          >
            {running ? "🛰️ Agents working…" : "🚀 Launch agents"}
          </button>
        </div>
        {mode && (
          <p className={`mt-4 rounded-xl px-4 py-2 text-sm ${mode.mode === "live" ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"}`}>
            {mode.mode === "live" ? "🟢 Live: Claude agents running against the knowledge base" : `🟡 ${mode.reason ?? "Demo mode"}`}
          </p>
        )}
      </div>

      {/* Agent lanes */}
      <div className="grid gap-4 lg:grid-cols-3">
        {(Object.keys(agentMeta) as AgentName[]).map((a, idx) => {
          const m = agentMeta[a];
          const st = status[a];
          return (
            <div key={a} className={`relative rounded-2xl p-5 glass ${st === "working" ? "ring-2 ring-fuchsia-400" : ""}`}>
              <div className="flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color} text-2xl ${st === "working" ? "pulse-ring" : ""}`}>{m.emoji}</span>
                <div>
                  <p className="text-xs text-muted">Agent {idx + 1}</p>
                  <h3 className="font-display font-bold">{m.name}</h3>
                </div>
                <span className="ml-auto text-sm">{st === "done" ? "✅" : st === "working" ? "⏳" : "💤"}</span>
              </div>
              <p className="mt-2 text-xs text-muted">{m.role}</p>
              <ul className="mt-3 max-h-48 space-y-1.5 overflow-y-auto text-xs">
                {logs.filter((l) => l.agent === a).map((l, i) => (
                  <li key={i} className={`rounded-lg px-2 py-1.5 ${l.kind === "tool" ? "bg-white/10 font-mono" : "bg-black/20 text-white/80"}`}>{l.text}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {error && <p className="rounded-xl bg-red-500/20 px-4 py-3 text-red-200">⚠️ {error}</p>}

      {info && (
        <div>
          <div className="mb-3 flex justify-end">
            <button onClick={() => window.print()} className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20">🖨️ Print / save as PDF</button>
          </div>
          <InfographicView data={info} />
        </div>
      )}

      {kit && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/25 to-pink-500/25 p-5 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-200">🎤 Opening hook</p>
              <p className="mt-2 font-display text-xl">{kit.hook}</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-sky-500/25 to-emerald-500/25 p-5 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">💡 Analogy</p>
              <p className="mt-2">{kit.analogy}</p>
            </div>
            <div className="rounded-2xl p-5 glass">
              <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-200">🗣️ Discussion prompts</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">{kit.discussion.map((d) => <li key={d}>{d}</li>)}</ol>
            </div>
          </div>
          <Quiz key={kit.hook} questions={kit.quiz} compact />
        </div>
      )}
    </div>
  );
}
