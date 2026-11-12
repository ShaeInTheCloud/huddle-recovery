// Simple line icons drawn for this project (no icon library).
const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Bolt = () => (
  <svg {...base}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </svg>
);
export const Battery = () => (
  <svg {...base}>
    <rect x="2" y="7" width="17" height="10" rx="2" />
    <path d="M22 11v2M6 10v4" />
  </svg>
);
export const Walk = () => (
  <svg {...base}>
    <circle cx="13" cy="4" r="2" />
    <path d="M9 21l2-6 3 3v3M7 12l3-4h4l2 4 3 1M11 15l1-5" />
  </svg>
);
export const Brain = () => (
  <svg {...base}>
    <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h0V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V4z" />
  </svg>
);
export const Lock = () => (
  <svg {...base} width={14} height={14}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const HEAL_ICONS = [Bolt, Battery, Walk, Brain];
