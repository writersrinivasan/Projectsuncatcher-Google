import { knowledgeChunks } from "@/data/knowledge";

const STOP = new Set(["the", "a", "an", "of", "to", "and", "in", "on", "for", "is", "are", "what", "how", "why", "with", "it", "be", "by"]);

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9$<.\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));

// Small keyword scorer over the curated knowledge base. Deliberately local: the
// agents ground themselves in vetted facts rather than the open web.
export function searchKnowledge(query: string, limit = 8) {
  const terms = tokenize(query);
  const chunks = knowledgeChunks();
  return chunks
    .map((c) => {
      const hay = `${c.topic} ${c.text}`.toLowerCase();
      const score = terms.reduce((acc, t) => acc + (hay.includes(t) ? (c.topic.includes(t) ? 3 : 1) : 0), 0);
      return { ...c, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export const TOPICS = ["poem", "poem journey", "mission", "stats", "architecture", "earth challenges", "space advantages", "space challenges", "why space workflow", "timeline", "companies", "future", "glossary"];
