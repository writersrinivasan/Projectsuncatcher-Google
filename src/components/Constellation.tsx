// 81 satellites = 1 hub + rings of 8, 16, 24, 32. Shows the ~1 km cluster with laser links.
const rings = [
  { n: 1, r: 0 },
  { n: 8, r: 45 },
  { n: 16, r: 90 },
  { n: 24, r: 135 },
  { n: 32, r: 180 },
];
const hues = ["#fbbf24", "#f472b6", "#a78bfa", "#38bdf8", "#34d399"];

export function Constellation() {
  const pts = rings.flatMap((ring, ri) =>
    Array.from({ length: ring.n }, (_, i) => {
      const a = (i / ring.n) * Math.PI * 2 + ri * 0.3;
      return { x: 200 + ring.r * Math.cos(a), y: 200 + ring.r * Math.sin(a), ri };
    }),
  );
  const links: [number, number][] = [];
  pts.forEach((p, i) =>
    pts.forEach((q, j) => {
      if (j <= i) return;
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 40) links.push([i, j]);
    }),
  );
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-md" role="img" aria-label="81 satellites flying in a 1 km cluster, connected by laser links">
      <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 5" />
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke="#f472b6" strokeOpacity="0.35" strokeWidth="1" />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.ri === 0 ? 7 : 4.5} fill={hues[p.ri]}>
          <animate attributeName="opacity" values="1;0.5;1" dur={`${2 + (i % 5) * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="200" y="395" textAnchor="middle" fontSize="12" fill="#c7d2fe">~1 km radius · neighbors 100–200 m apart</text>
    </svg>
  );
}
