// Small browser helpers. Every storage call is wrapped so the page still works
// in private windows or when storage is blocked.

export type CheckIn = {
  date: string; // ISO timestamp
  scores: number[];
  sleep: number;
  school: number; // index into schoolOptions
  mood: number; // index into moodOptions, 0 = best
  danger: boolean;
};

const key = (injury: string) => `huddle-checkins-${injury || "undated"}`;

export function loadCheckIns(injury: string): CheckIn[] {
  try {
    const raw = window.localStorage.getItem(key(injury));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCheckIns(injury: string, list: CheckIn[]): boolean {
  try {
    window.localStorage.setItem(key(injury), JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function clearCheckIns(injury: string) {
  try {
    window.localStorage.removeItem(key(injury));
  } catch {
    /* nothing stored */
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export async function shareText(text: string): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share({ text });
      return "shared";
    } catch {
      // user cancelled or share failed; fall through to copy
    }
  }
  return (await copyText(text)) ? "copied" : "failed";
}

// Days between an injury date (YYYY-MM-DD) and today, in local time.
export function daysSince(injury: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(injury);
  if (!m) return null;
  const start = new Date(+m[1], +m[2] - 1, +m[3]);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((today.getTime() - start.getTime()) / 864e5);
  return diff >= 0 && diff < 366 ? diff : null;
}

export function formatDate(iso: string, lang: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(iso);
  return d.toLocaleDateString(lang === "es" ? "es-US" : "en-US", { month: "long", day: "numeric" });
}

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
}
