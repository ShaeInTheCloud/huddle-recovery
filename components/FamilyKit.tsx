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
import BodyMap, { heat } from "@/components/BodyMap";
import { StepTrend, TickSpark } from "@/components/Charts";
import { HEAL_ICONS, Lock } from "@/components/Icons";

type Result = "saved" | "danger" | "mood" | null;

const PLAN_TONES = ["tone-sun", "tone-sky", "tone-mint"];

export default function FamilyKit() {
  const params = useSearchParams();
  const injury = (params.get("d") || "").slice(0, 10);
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];
  const day = daysSince(injury);
  const max = t.checkin.symptoms.length * 6;
  const locale = lang === "es" ? "es-US" : "en-US";

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
  const [spot, setSpot] = useState<number | null>(0);

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

  const total = (c: CheckIn) => c.scores.reduce((a, b) => a + b, 0);
  const ready = scores.every((s) => s !== null) && danger !== null;
  const last = list[list.length - 1];
  const prev = list[list.length - 2];
  const delta = last && prev ? total(last) - total(prev) : null;
  const pathAt = day === null || day <= 1 ? 0 : 1;

  // When nothing is being rated yet, the map shows the latest saved check-in.
  const mapScores = scores.some((s) => s !== null) || !last ? scores : last.scores;

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
    const next = [...list, entry];
    setList(next);
    saveCheckIns(injury, next);
    setRising(!!last && total(entry) > total(last));
    setResult(entry.danger ? "danger" : mood >= 3 ? "mood" : "saved");
    setScores(t.checkin.symptoms.map(() => null));
    setDanger(null);
    setShareMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dayOf = (iso: string) => {
    const d = daysSince(injury);
    if (d === null) return new Date(iso).toLocaleDateString(locale, { month: "short", day: "numeric" });
    const then = new Date(iso);
    const start = new Date(+injury.slice(0, 4), +injury.slice(5, 7) - 1, +injury.slice(8, 10));
    const n = Math.max(0, Math.round((new Date(then.getFullYear(), then.getMonth(), then.getDate()).getTime() - start.getTime()) / 864e5));
    return `${t.trend.day} ${n}`;
  };

  const summary = useMemo(() => {
    if (!last) return "";
    const lines = [t.share.header];
    if (day !== null) lines.push(day === 0 ? t.dayZero : fill(t.dayCount, { n: day }));
    const when = new Date(last.date).toLocaleString(locale, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    lines.push(`${when}: ${t.checkin.scoreLabel} ${total(last)}/${max}`);
    if (last.danger) lines.push(`*** ${t.share.dangerFlag} ***`);
    const named = last.scores.map((s, i) => (s > 0 ? `${t.checkin.symptoms[i]} ${s}` : "")).filter(Boolean);
    if (named.length) lines.push(named.join(", "));
    lines.push(
      `${t.checkin.sleep}: ${last.sleep} · ${t.checkin.school}: ${t.checkin.schoolOptions[last.school]} · ${t.checkin.mood}: ${t.checkin.moodOptions[last.mood]}`,
    );
    if (list.length > 1) lines.push(`${t.checkin.scoreLabel}: ${list.slice(-5).map(total).join(" → ")}`);
    lines.push(t.share.footer);
    return lines.join("\n");
  }, [list, last, t, locale, day, max]);

  const note = fill(t.school.note, { date: injury ? formatDate(injury, lang) : "____" });
  const dayText = day === null ? null : day === 0 ? t.dayZero : fill(t.dayCount, { n: day });

  return (
    <main className="page wide">
      {/* Dashboard band */}
      <section className="hero">
        <div className="herotop">
          <div>
            <div className="brand">
              Huddle <span>Recovery</span>
            </div>
            <p className="tagline">{t.tagline}</p>
          </div>
          <div className="herochips">
            {dayText && <span className="chip">{dayText}</span>}
            <button className="chip btnchip" onClick={switchLang} lang={lang === "en" ? "es" : "en"}>
              {t.switchLabel}
            </button>
          </div>
        </div>

        <div className="tiles">
          <div className="tile">
            <div className="tlabel">{t.dash.score}</div>
            <div className="trow">
              <div>
                <div className="big">
                  {last ? total(last) : "–"}
                  <small>{fill(t.dash.outOf, { max })}</small>
                </div>
                {!last && <div className="tnote">{t.dash.noScore}</div>}
              </div>
              <TickSpark values={list.map(total)} max={max} />
            </div>
          </div>
          <div className="tile">
            <div className="tlabel">{t.dash.trend}</div>
            <div className="big mid">
              {delta === null ? "–" : delta > 0 ? `▲ ${delta}` : delta < 0 ? `▼ ${Math.abs(delta)}` : "="}
            </div>
            <div className={`tnote ${delta !== null && delta > 0 ? "warnText" : delta !== null && delta < 0 ? "goodText" : ""}`}>
              {delta === null
                ? t.dash.firstOne
                : delta > 0
                  ? fill(t.dash.up, { n: delta })
                  : delta < 0
                    ? fill(t.dash.down, { n: Math.abs(delta) })
                    : t.dash.same}
            </div>
          </div>
          <div className="tile">
            <div className="tlabel">{t.dash.sleep}</div>
            <div className="big mid">
              {last ? last.sleep : "–"}
              <small>{t.dash.hours}</small>
            </div>
          </div>
          <div className="tile">
            <div className="tlabel">{t.dash.checkins}</div>
            <div className="big mid">{list.length}</div>
            <div className="tnote">{t.dash.checkinsNote}</div>
          </div>
        </div>

      </section>

      {result === "danger" && (
        <div className="banner crit" role="alert">
          {t.checkin.erNow}
        </div>
      )}
      {result === "mood" && (
        <div className="banner warn" role="status">
          {fill(t.checkin.saved, { score: last ? total(last) : 0, max })} {t.checkin.moodSupport}
        </div>
      )}
      {result === "saved" && (
        <div className="banner ok" role="status">
          {fill(t.checkin.saved, { score: last ? total(last) : 0, max })}
          {rising ? ` ${t.checkin.rising}` : ""}
        </div>
      )}

      <section className="er" aria-labelledby="er-title">
        <div className="erhead">
          <span className="ericon" aria-hidden="true">
            !
          </span>
          <div>
            <h2 id="er-title">{t.er.title}</h2>
            <p>{t.er.intro}</p>
          </div>
        </div>
        <ul className="ersigns">
          {t.er.signs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="call">{t.er.call911}</p>
      </section>

      <section className="hero heroband">
        <div className="panels">
          <div className="panel" aria-labelledby="path-title">
            <h2 id="path-title">{t.path.title}</h2>
            <ol className="path">
              {t.path.steps.map((s, i) => {
                const lockedStep = i >= t.path.steps.length - 2;
                const state = i < pathAt ? "done" : i === pathAt ? "now" : "next";
                return (
                  <li key={s.name} className={`pstep ${state}${lockedStep ? " locked" : ""}`}>
                    <span className="pnode" aria-hidden="true">
                      {lockedStep ? <Lock /> : i + 1}
                    </span>
                    <span className="ptext">
                      <strong>{s.name}</strong>
                      <span>{i === pathAt ? t.path.here : lockedStep ? t.path.locked : s.note}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="pcap">{t.path.caption}</p>
          </div>

          <div className="panel" aria-labelledby="heal-title">
            <h2 id="heal-title">{t.heal.title}</h2>
            <p className="pcap" style={{ marginTop: 4 }}>
              {t.heal.intro}
            </p>
            <ol className="heal">
              {t.heal.nodes.map((n, i) => (
                <li key={n.title}>
                  <span className={`hnode h${i}`} aria-hidden="true">
                    {(() => {
                      const I = HEAL_ICONS[i] ?? HEAL_ICONS[0];
                      return <I />;
                    })()}
                  </span>
                  <div>
                    <strong>{n.title}</strong>
                    <p>{n.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="twocol">
        <section className="card" aria-labelledby="ci-title">
          <h2 id="ci-title">{t.checkin.title}</h2>
          <p className="muted">{t.body.intro}</p>
          <div className="checkgrid">
            <BodyMap
              names={t.checkin.symptoms}
              scores={mapScores}
              why={t.body.symptomWhy}
              selected={spot}
              onSelect={setSpot}
              title={t.body.title}
            />
            <div className="sym">
              {t.checkin.symptoms.map((name, i) => (
                <div className={`symrow${spot === i ? " focus" : ""}`} key={name}>
                  <span id={`sym-${i}`} className="symname">
                    <span className="dot" style={{ background: heat(scores[i]) }} />
                    {name}
                  </span>
                  <div className="scale" role="group" aria-labelledby={`sym-${i}`}>
                    {[0, 1, 2, 3, 4, 5, 6].map((v) => (
                      <button
                        key={v}
                        aria-pressed={scores[i] === v}
                        aria-label={`${name} ${v}`}
                        onClick={() => {
                          setScores((s) => s.map((x, j) => (j === i ? v : x)));
                          setSpot(i);
                        }}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <p className="muted">{t.checkin.scaleHint}</p>
            </div>
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
        </section>

        <div className="stack">
          <section className="card" aria-labelledby="trend-title">
            <h2 id="trend-title">{t.trend.title}</h2>
            {list.length === 0 ? (
              <p className="muted">{t.trend.empty}</p>
            ) : (
              <>
                <StepTrend points={list.slice(-14).map((c) => ({ label: dayOf(c.date), value: total(c) }))} max={max} dayLabel={t.trend.title} />
                {list.some((c) => c.danger) && (
                  <p className="flagline">
                    {t.share.dangerFlag}: {list.filter((c) => c.danger).map((c) => dayOf(c.date)).join(", ")}
                  </p>
                )}
                {confirmClear ? (
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
                    <button className="ghost small" onClick={() => setConfirmClear(false)} aria-label="Cancel">
                      ✕
                    </button>
                  </div>
                ) : (
                  <button className="linkbtn" onClick={() => setConfirmClear(true)}>
                    {t.checkin.clear}
                  </button>
                )}
              </>
            )}
          </section>

          <section className="card" aria-labelledby="share-title">
            <h2 id="share-title">{t.share.title}</h2>
            <p className="muted">{t.share.intro}</p>
            {summary ? (
              <>
                <div className="out">{summary}</div>
                <div className="btnrow">
                  <button
                    className="btn"
                    onClick={async () => {
                      const r = await shareText(summary);
                      setShareMsg(r === "copied" ? t.share.copied : "");
                    }}
                  >
                    {t.share.button}
                  </button>
                  <button className="ghost" onClick={async () => setShareMsg((await copyText(summary)) ? t.share.copied : "")}>
                    {t.share.copy}
                  </button>
                </div>
                {shareMsg && (
                  <p className="muted" role="status">
                    {shareMsg}
                  </p>
                )}
              </>
            ) : (
              <p className="muted">{t.share.empty}</p>
            )}
          </section>
        </div>
      </div>

      <section aria-labelledby="plan-title" className="plan">
        <div className="sectionhead">
          <h2 id="plan-title">{t.plan.title}</h2>
          <p className="muted">{t.plan.intro}</p>
        </div>
        <div className="plantiles">
          {t.plan.phases.map((ph, i) => (
            <div className={`ptile ${PLAN_TONES[i]}`} key={ph.when}>
              <h3>{ph.when}</h3>
              <div className="lbl">{t.plan.doLabel}</div>
              <ul>
                {ph.doList.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="lbl">{t.plan.avoidLabel}</div>
              <ul className="avoid">
                {ph.avoidList.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="twocol">
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

        <section className="card tone-sky" aria-labelledby="doc-title">
          <h2 id="doc-title">{t.doctor.title}</h2>
          <ul className="doclist">
            {t.doctor.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      </div>

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
