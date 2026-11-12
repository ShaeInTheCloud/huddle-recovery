"use client";

// Original stylized figure with symptom hotspots. Each hotspot glows by the
// score the family picked (0 to 6). Tapping one explains why it happens.

type Props = {
  names: string[];
  scores: (number | null)[];
  why: string[];
  selected: number | null;
  onSelect: (i: number) => void;
  title: string;
};

// Hotspot positions, in the same order as the symptom list.
const SPOTS: [number, number][] = [
  [120, 24], // headache: top of head
  [86, 64], // dizziness: inner ear
  [120, 206], // nausea: stomach
  [120, 62], // light: eyes
  [154, 64], // noise: ear
  [102, 40], // concentrating: forehead
  [138, 40], // foggy: temple
  [134, 150], // irritable: heart and mood
];

export function heat(score: number | null): string {
  if (score === null) return "var(--spot-empty)";
  if (score === 0) return "var(--spot-0)";
  if (score <= 2) return "var(--spot-1)";
  if (score <= 4) return "var(--spot-2)";
  return "var(--spot-3)";
}

export default function BodyMap({ names, scores, why, selected, onSelect, title }: Props) {
  const sel = selected ?? null;
  return (
    <div className="bodymap">
      <svg viewBox="0 0 240 430" role="group" aria-label={title} className="figure">
        <defs>
          <linearGradient id="fig" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--figure-top)" />
            <stop offset="1" stopColor="var(--figure-bottom)" />
          </linearGradient>
          <radialGradient id="floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--figure-top)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--figure-top)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="414" rx="90" ry="12" fill="url(#floor)" />
        <g fill="url(#fig)" stroke="url(#fig)" strokeLinecap="round">
          <line x1="74" y1="138" x2="46" y2="258" strokeWidth="24" />
          <line x1="166" y1="138" x2="194" y2="258" strokeWidth="24" />
          <line x1="102" y1="250" x2="96" y2="404" strokeWidth="32" />
          <line x1="138" y1="250" x2="144" y2="404" strokeWidth="32" />
          <path d="M70 128 Q120 112 170 128 L160 254 Q120 266 80 254 Z" strokeWidth="2" />
          <rect x="108" y="96" width="24" height="22" rx="8" strokeWidth="0" />
          <ellipse cx="120" cy="58" rx="36" ry="42" strokeWidth="0" />
        </g>
        {SPOTS.map(([x, y], i) => {
          const s = scores[i];
          const on = sel === i;
          return (
            <g
              key={i}
              className="spot"
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${names[i]}${s !== null ? `: ${s}` : ""}`}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(i);
                }
              }}
            >
              {s !== null && s > 0 && <circle cx={x} cy={y} r={10 + s * 2.4} fill={heat(s)} opacity="0.28" />}
              <circle cx={x} cy={y} r={on ? 11 : 9} fill={heat(s)} stroke="var(--spot-ring)" strokeWidth={on ? 3 : 2} />
            </g>
          );
        })}
      </svg>
      <div className="spotinfo" aria-live="polite">
        {sel === null ? null : (
          <>
            <div className="spotname">
              <span className="dot" style={{ background: heat(scores[sel]) }} />
              {names[sel]}
              {scores[sel] !== null && <span className="spotscore">{scores[sel]}/6</span>}
            </div>
            <p>{why[sel]}</p>
          </>
        )}
      </div>
    </div>
  );
}
