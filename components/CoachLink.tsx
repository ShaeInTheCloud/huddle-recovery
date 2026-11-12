"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { content, isLang, type Lang } from "@/content";
import { copyText, fill } from "@/lib/browser";

const today = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function CoachLink() {
  const params = useSearchParams();
  const [ui, setUi] = useState<Lang>("en"); // language of this coach page
  const [familyLang, setFamilyLang] = useState<Lang>("en");
  const [date, setDate] = useState(today());
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState<"" | "link" | "msg">("");

  useEffect(() => {
    const p = params.get("lang");
    if (isLang(p)) setUi(p);
  }, [params]);

  useEffect(() => {
    document.documentElement.lang = ui;
  }, [ui]);

  const t = content[ui];
  const familyT = content[familyLang];

  const make = () => {
    const url = new URL("/", window.location.origin);
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) url.searchParams.set("d", date);
    url.searchParams.set("lang", familyLang);
    setLink(url.toString());
    setCopied("");
  };

  // The text goes out in the family's language.
  const message = link ? fill(familyT.coach.message, { link }) : "";

  return (
    <main className="page">
      <header className="topbar">
        <div>
          <div className="brand">
            Huddle <span>Recovery</span>
          </div>
          <p className="tagline">{t.coach.title}</p>
        </div>
        <button className="ghost small" onClick={() => setUi(ui === "en" ? "es" : "en")}>
          {t.switchLabel}
        </button>
      </header>

      <section className="card">
        <p>{t.coach.intro}</p>
        <div className="fields">
          <div className="field">
            <label className="lbl" htmlFor="date">
              {t.coach.dateLabel}
            </label>
            <input id="date" type="date" value={date} max={today()} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="field">
            <label className="lbl" htmlFor="flang">
              {t.coach.langLabel}
            </label>
            <select id="flang" value={familyLang} onChange={(e) => setFamilyLang(e.target.value as Lang)}>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
        <button className="btn" onClick={make}>
          {t.coach.make}
        </button>
        <p className="muted">{t.coach.privacy}</p>
      </section>

      {link && (
        <section className="card" aria-live="polite">
          <div className="lbl">{t.coach.messageLabel}</div>
          <div className="out">{message}</div>
          <button
            className="btn"
            onClick={async () => setCopied((await copyText(message)) ? "msg" : "")}
          >
            {copied === "msg" ? t.coach.copied : t.coach.copyMessage}
          </button>
          <div className="lbl">{t.coach.linkLabel}</div>
          <div className="out">{link}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button className="ghost" onClick={async () => setCopied((await copyText(link)) ? "link" : "")}>
              {copied === "link" ? t.coach.copied : t.coach.copyLink}
            </button>
            <a className="ghost" href={link} target="_blank" rel="noreferrer" style={{ textAlign: "center", textDecoration: "none" }}>
              {t.coach.preview}
            </a>
          </div>
        </section>
      )}

      <footer>
        <p>{t.footer.disclaimer}</p>
        <p>{t.footer.review}</p>
      </footer>
    </main>
  );
}
