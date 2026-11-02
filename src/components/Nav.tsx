"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/poem", label: "The Poem", emoji: "🪶" },
  { href: "/how-it-works", label: "How It Works", emoji: "⚙️" },
  { href: "/why-space", label: "Why Space?", emoji: "🌍" },
  { href: "/race", label: "The Race", emoji: "🏁" },
  { href: "/future", label: "Future", emoji: "🔮" },
  { href: "/studio", label: "Agent Studio", emoji: "🤖" },
  { href: "/quiz", label: "Quiz", emoji: "🎯" },
  { href: "/trainer", label: "Trainer Kit", emoji: "🎤" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070617]/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold" onClick={() => setOpen(false)}>
          <span className="text-2xl">☀️</span>
          <span className="text-gradient">Suncatcher Academy</span>
        </Link>
        <button className="rounded-lg px-3 py-1.5 text-sm glass lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-full px-3 py-1.5 text-sm transition ${pathname === l.href ? "bg-white/15 text-white" : "text-muted hover:bg-white/10 hover:text-white"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="grid grid-cols-2 gap-2 px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className={`block rounded-xl px-3 py-2 text-sm glass ${pathname === l.href ? "ring-1 ring-fuchsia-400" : ""}`}>
                {l.emoji} {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export { links as navLinks };
