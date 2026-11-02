import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { sources } from "@/data/knowledge";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suncatcher Academy",
  description: "A colorful, interactive learning hub on Google's Project Suncatcher and AI data centers in space.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${space.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="stars" aria-hidden />
        <Nav />
        <main className="relative z-10 flex-1">{children}</main>
        <footer className="relative z-10 mt-24 border-t border-white/10 px-4 py-10 text-sm text-muted">
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-base text-white">Sources</p>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-white underline-offset-4 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs">
              Facts current as of 2 Nov 2026. Company perspectives and future timelines are analysis, not announcements. Built for training and knowledge-transfer sessions.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
