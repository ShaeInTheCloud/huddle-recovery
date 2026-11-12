// Small hand-drawn SVG charts. No chart library, so the page stays light.

export function TickSpark({ values, max }: { values: number[]; max: number }) {
  const N = 24;
  const recent = values.slice(-N);
  const start = N - recent.length;
  const W = 120;
  const H = 34;
  const step = W / N;
  return (
    <svg viewBox={`0 0 ${W} ${H + 8}`} className="tickspark" aria-hidden="true">
      {Array.from({ length: N }).map((_, i) => {
        const v = i >= start ? recent[i - start] : null;
        const h = v === null ? 8 : 6 + (v / max) * (H - 6);
        const x = i * step + step / 2;
        const last = i === N - 1 && v !== null;
        return (
          <line
            key={i}
            x1={x}
            x2={x}
            y1={H}
            y2={H - h}
            stroke={last ? "var(--sun)" : "var(--tick)"}
            strokeOpacity={v === null ? 0.35 : 1}
            strokeWidth={last ? 2.2 : 1.4}
            strokeLinecap="round"
          />
        );
      })}
      {values.length > 0 && <path d={`M${W - step / 2 - 4} ${H + 8} L${W - step / 2} ${H + 2} L${W - step / 2 + 4} ${H + 8} Z`} fill="var(--sun)" />}
    </svg>
  );
}

export function StepTrend({
  points,
  max,
  dayLabel,
}: {
  points: { label: string; value: number }[];
  max: number;
  dayLabel: string;
}) {
  const W = 560;
  const H = 200;
  const L = 30;
  const R = 10;
  const T = 12;
  const B = 28;
  const n = points.length;
  const ymax = Math.max(12, Math.ceil(Math.max(...points.map((p) => p.value), 0) / 12) * 12);
  const colW = (W - L - R) / Math.max(n, 1);
  const y = (v: number) => T + (1 - v / ymax) * (H - T - B);
  let d = "";
  points.forEach((p, i) => {
    const x0 = L + i * colW;
    const x1 = x0 + colW;
    d += `${i === 0 ? "M" : "L"}${x0} ${y(p.value)} L${x1} ${y(p.value)} `;
  });
  const area = n ? `${d} L${L + n * colW} ${y(0)} L${L} ${y(0)} Z` : "";
  const ticks = [0, ymax / 2, ymax];
  const every = Math.ceil(n / 7);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="steptrend" role="img" aria-label={`${dayLabel}: ${points.map((p) => p.value).join(", ")} / ${max}`}>
      <defs>
        <linearGradient id="trendfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--chart)" stopOpacity="0.38" />
          <stop offset="1" stopColor="var(--chart)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="var(--grid)" />
          <text x={L - 6} y={y(v) + 4} textAnchor="end" className="axis">
            {v}
          </text>
        </g>
      ))}
      {n > 0 && <path d={area} fill="url(#trendfill)" />}
      {n > 0 && <path d={d} fill="none" stroke="var(--sun-line)" strokeWidth="2.2" strokeLinejoin="round" />}
      {points.map((p, i) =>
        i % every === 0 || i === n - 1 ? (
          <text key={i} x={L + i * colW + colW / 2} y={H - 8} textAnchor="middle" className="axis">
            {p.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}
