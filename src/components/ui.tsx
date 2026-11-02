import type { ReactNode } from "react";
import type { Status } from "@/data/knowledge";

export function PageHeader({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">{kicker}</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-6xl">{title}</h1>
      {children && <div className="mt-5 max-w-3xl text-lg text-muted">{children}</div>}
    </section>
  );
}

export function Section({ title, emoji, children, id }: { title: string; emoji?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">
        {emoji && <span className="mr-2">{emoji}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl p-5 glass ${className}`}>{children}</div>;
}

const statusStyle: Record<Status, { label: string; cls: string }> = {
  flying: { label: "🛰️ In orbit", cls: "bg-emerald-400/20 text-emerald-200 ring-emerald-400/40" },
  planned: { label: "🗓️ Planned", cls: "bg-sky-400/20 text-sky-200 ring-sky-400/40" },
  filed: { label: "📄 Filed / announced", cls: "bg-amber-400/20 text-amber-200 ring-amber-400/40" },
  reported: { label: "📰 Reported only", cls: "bg-pink-400/20 text-pink-200 ring-pink-400/40" },
  none: { label: "🌍 Earth-focused", cls: "bg-slate-400/20 text-slate-200 ring-slate-400/40" },
  analysis: { label: "🔮 Projection", cls: "bg-violet-400/20 text-violet-200 ring-violet-400/40" },
};

export function StatusPill({ status }: { status: Status }) {
  const s = statusStyle[status];
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${s.cls}`}>{s.label}</span>;
}
