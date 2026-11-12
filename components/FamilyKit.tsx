"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { content, isLang, type Lang } from "@/content";
import {
  clearCheckIns,
  copyText,
  daysSince,
  fill,
  formatDate,
  loadCheckIns,
  saveCheckIns,
  shareText,
  type CheckIn,
} from "@/lib/browser";

type Result = "saved" | "danger" | "mood" | null;

export default function FamilyKit() {
  const params = useSearchParams();
  const injury = (params.get("d") || "").slice(0, 10);
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];
  const day = daysSince(injury);
  const max = t.checkin.symptoms.length * 6;

  const [list, setList] = useState<CheckIn[]>([]);
  const [scores, setScores] = useState<(number | null)[]>(() => t.checkin.symptoms.map(() => null));
  const [sleep, setSleep] = useState("8");
  const [school, setSchool] = useState(0);
  const [mood, setMood] = useState(2);
  const [danger, setDanger] = useState<boolean | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [rising, setRising] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [noteMsg, setNoteMsg] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  // Language: link parameter first, then the phone's language.
  useEffect(() => {
    const p = params.get("lang");
    if (isLang(p)) setLang(p);
    else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es")) setLang("es");
  }, [params]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    setList(loadCheckIns(injury));
  }, [injury]);

  const switchLang = () => {
    const next: Lang = lang === "en" ? "es" : "en";
    setLang(next);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* keep working without updating the address */
    }
  };

  const ready = scores.every((s) => s !== null) && danger !== null;
  const total = (c: CheckIn) => c.scores.reduce((a, b) => a + b, 0);

  const save = () => {
    if (!ready) return;
    const entry: CheckIn = {
      date: new Date().toISOString(),
      scores: scores as number[],
      sleep: Math.max(0, Math.min(24, Number(sleep) || 0)),
      school,
      mood,
      danger: !!danger,
    };
    const prev = list[list.length - 1];
    const next = [...list, entry];
    setList(next);
    saveCheckIns(injury, next);
    setRising(!!prev && total(entry) > total(prev));
    setResult(entry.danger ? "danger" : mood >= 3 ? "mood" : "saved");
    setScores(t.checkin.symptoms.map(() => null));
    setDanger(null);
    setShareMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const summary = useMemo(() => {
    const last = list[list.length - 1];
    if (!last) return "";
    const lines = [t.share.header];
    if (day !== null) lines.push(day === 0 ? t.dayZero : fill(t.dayCount, { n: day }));
    const when = new Date(last.date).toLocaleString(lang === "es" ? "es-US" : "en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    lines.push(`${when}: ${t.checkin.scoreLabel} ${total(last)}/${max}`);
    if (last.danger) lines.push(`*** ${t.share.dangerFlag} ***`);
    const named = last.scores
      .map((s, i) => (s > 0 ? `${t.checkin.symptoms[i]} ${s}` : ""))
      .filter(Boolean);
    if (named.length) lines.push(named.join(", "));
    lines.push(
      `${t.checkin.sleep}: ${last.sleep} · ${t.checkin.school}: ${t.checkin.schoolOptions[last.school]} · ${t.checkin.mood}: ${t.checkin.moodOptions[last.mood]}`,
    );
    if (list.length > 1) lines.push(`${t.checkin.scoreLabel}: ${list.slice(-5).map(total).join(" → ")}`);
    lines.push(t.share.footer);
    return lines.join("\n");
  }, [list, t, lang, day, max]);

  const note = fill(t.school.note, { date: injury ? formatDate(injury, lang) : "____" });

  return (
    <main className="page">
      <header className="topbar">
        <div>
          <div className="brand">
            Huddle <span>Recovery</span>
          </div>
          <p className="tagline">{t.tagline}</p>
          {day !== null && <span className="daybadge">{day === 0 ? t.dayZero : fill(t.dayCount, { n: day })}</span>}
        </div>
        <button className="ghost small" onClick={switchLang} lang={lang === "en" ? "es" : "en"}>
          {t.switchLabel}
        </button>
      </header>

      {result === "danger" && (
        <div className="banner crit" role="alert">
          {t.checkin.erNow}
        </div>
      )}
      {result === "mood" && (
        <div className="banner warn" role="status">
          {fill(t.checkin.saved, { score: list.length ? total(list[list.length - 1]) : 0, max })} {t.checkin.moodSupport}
        </div>
      )}
      {result === "saved" && (
        <div className="banner ok" role="status">
          {fill(t.checkin.saved, { score: list.length ? total(list[list.length - 1]) : 0, max })}
          {rising ? ` ${t.checkin.rising}` : ""}
        </div>
      )}

      <section className="er" aria-labelledby="er-title">
        <h2 id="er-title">{t.er.title}</h2>
        <p className="muted" style={{ marginTop: 6, color: "var(--ink)" }}>
          {t.er.intro}
        </p>
        <ul>
          {t.er.signs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="call">{t.er.call911}</p>
      </section>

      <section className="card" aria-labelledby="plan-title">
        <h2 id="plan-title">{t.plan.title}</h2>
        <p className="muted">{t.plan.intro}</p>
        {t.plan.phases.map((ph) => (
          <div className="phase" key={ph.when}>
            <h3>{ph.when}</h3>
            <div className="cols">
              <div>
                <div className="lbl">{t.plan.doLabel}</div>
                <ul>
                  {ph.doList.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="lbl">{t.plan.avoidLabel}</div>
                <ul>
                  {ph.avoidList.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="card" aria-labelledby="ci-title">
        <h2 id="ci-title">{t.checkin.title}</h2>
        <p className="muted">{t.checkin.intro}</p>
        <div className="sym">
          {t.checkin.symptoms.map((name, i) => (
            <div className="symrow" key={name}>
              <span id={`sym-${i}`}>{name}</span>
              <div className="scale" role="group" aria-labelledby={`sym-${i}`}>
                {[0, 1, 2, 3, 4, 5, 6].map((v) => (
                  <button
                    key={v}
                    aria-pressed={scores[i] === v}
                    aria-label={`${name} ${v}`}
                    onClick={() => setScores((s) => s.map((x, j) => (j === i ? v : x)))}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="muted">{t.checkin.scaleHint}</p>
        </div>

        <div className="fields">
          <div className="field">
            <label className="lbl" htmlFor="sleep">
              {t.checkin.sleep}
            </label>
            <input id="sleep" type="number" inputMode="numeric" min={0} max={24} value={sleep} onChange={(e) => setSleep(e.target.value)} />
          </div>
          <div className="field">
            <label className="lbl" htmlFor="school">
              {t.checkin.school}
            </label>
            <select id="school" value={school} onChange={(e) => setSchool(Number(e.target.value))}>
              {t.checkin.schoolOptions.map((o, i) => (
                <option key={o} value={i}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="lbl" htmlFor="mood">
              {t.checkin.mood}
            </label>
            <select id="mood" value={mood} onChange={(e) => setMood(Number(e.target.value))}>
              {t.checkin.moodOptions.map((o, i) => (
                <option key={o} value={i}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="lbl" id="danger-q" style={{ marginBottom: 6 }}>
            {t.checkin.dangerQuestion}
          </div>
          <div className="yn" role="group" aria-labelledby="danger-q">
            <button className="y" aria-pressed={danger === true} onClick={() => setDanger(true)}>
              {t.checkin.yes}
            </button>
            <button className="n" aria-pressed={danger === false} onClick={() => setDanger(false)}>
              {t.checkin.no}
            </button>
          </div>
        </div>

        <button className="btn" onClick={save} disabled={!ready}>
          {t.checkin.save}
        </button>
        {!ready && <p className="muted">{t.checkin.needAll}</p>}

        <div>
          <h3 style={{ marginBottom: 8 }}>{t.checkin.historyTitle}</h3>
          {list.length === 0 ? (
            <p className="muted">{t.checkin.noHistory}</p>
          ) : (
            <ul className="history">
              {list
                .slice()
                .reverse()
                .slice(0, 14)
                .map((c) => (
                  <li key={c.date}>
                    <span style={{ minWidth: "9ch" }}>
                      {new Date(c.date).toLocaleDateString(lang === "es" ? "es-US" : "en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span className="bar" aria-hidden="true">
                      <span style={{ width: `${(total(c) / max) * 100}%` }} />
                    </span>
                    <span className="num">{total(c)}</span>
                    {c.danger && (
                      <span className="flag" aria-label={t.share.dangerFlag}>
                        !
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
        {list.length > 0 &&
          (confirmClear ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                className="ghost small"
                onClick={() => {
                  clearCheckIns(injury);
                  setList([]);
                  setConfirmClear(false);
                  setResult(null);
                }}
              >
                {t.checkin.clear}
              </button>
              <button className="ghost small" onClick={() => setConfirmClear(false)}>
                ✕
              </button>
            </div>
          ) : (
            <button className="linkbtn" onClick={() => setConfirmClear(true)}>
              {t.checkin.clear}
            </button>
          ))}
      </section>

      <section className="card" aria-labelledby="share-title">
        <h2 id="share-title">{t.share.title}</h2>
        <p className="muted">{t.share.intro}</p>
        {summary ? (
          <>
            <div className="out">{summary}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button
                className="btn"
                onClick={async () => {
                  const r = await shareText(summary);
                  setShareMsg(r === "copied" ? t.share.copied : "");
                }}
              >
                {t.share.button}
              </button>
              <button
                className="ghost"
                onClick={async () => setShareMsg((await copyText(summary)) ? t.share.copied : "")}
              >
                {t.share.copy}
              </button>
            </div>
            {shareMsg && <p className="muted" role="status">{shareMsg}</p>}
          </>
        ) : (
          <p className="muted">{t.share.empty}</p>
        )}
      </section>

      <section className="card" aria-labelledby="school-title">
        <h2 id="school-title">{t.school.title}</h2>
        <p className="muted">{t.school.intro}</p>
        <ol className="steps">
          {t.school.stages.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.desc}
            </li>
          ))}
        </ol>
        <h3>{t.school.noteTitle}</h3>
        <div className="note">{note}</div>
        <button className="ghost" onClick={async () => setNoteMsg((await copyText(note)) ? t.school.copied : "")}>
          {noteMsg || t.school.copyNote}
        </button>
      </section>

      <section className="card" aria-labelledby="doc-title">
        <h2 id="doc-title">{t.doctor.title}</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
          {t.doctor.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <footer>
        <p>{t.footer.disclaimer}</p>
        <p>{t.footer.review}</p>
        <p>
          {t.footer.openSource}{" "}
          <a href="https://github.com/ShaeInTheCloud/huddle-recovery" target="_blank" rel="noreferrer">
            github.com/ShaeInTheCloud/huddle-recovery
          </a>
        </p>
      </footer>
    </main>
  );
}
