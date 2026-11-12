// Shape of the Night-One Kit content. Every language file must fill all of it.
// Content in this folder is licensed CC BY 4.0. See CONTENT-LICENSE.md.
// Placeholders in curly braces, like {n} or {date}, are filled in by the app.

export type Phase = { when: string; doList: string[]; avoidList: string[] };

export type Content = {
  langCode: "en" | "es";
  switchLabel: string; // label for the button that switches to the other language
  tagline: string;
  dayCount: string; // "{n}"
  dayZero: string;

  er: { title: string; intro: string; signs: string[]; call911: string };

  dash: {
    score: string;
    outOf: string; // "of {max}"
    noScore: string;
    trend: string;
    up: string;
    down: string;
    same: string;
    firstOne: string;
    sleep: string;
    hours: string;
    checkins: string;
    checkinsNote: string;
  };

  path: {
    title: string;
    caption: string;
    here: string;
    locked: string;
    steps: { name: string; note: string }[]; // 7 steps; the last two need a doctor
  };

  heal: { title: string; intro: string; nodes: { title: string; text: string }[] }; // 4 nodes

  body: { title: string; intro: string; symptomWhy: string[] }; // one per symptom

  trend: { title: string; empty: string; day: string };

  plan: { title: string; intro: string; phases: Phase[]; doLabel: string; avoidLabel: string };

  checkin: {
    title: string;
    intro: string;
    symptoms: string[];
    scaleHint: string;
    sleep: string;
    school: string;
    schoolOptions: string[];
    mood: string;
    moodOptions: string[]; // best to worst, 5 items
    dangerQuestion: string;
    yes: string;
    no: string;
    save: string;
    needAll: string;
    saved: string; // "{score}" "{max}"
    erNow: string;
    moodSupport: string;
    rising: string;
    historyTitle: string;
    noHistory: string;
    scoreLabel: string;
    clear: string;
  };

  share: {
    title: string;
    intro: string;
    button: string;
    copy: string;
    copied: string;
    empty: string;
    header: string;
    dangerFlag: string;
    footer: string;
  };

  school: {
    title: string;
    intro: string;
    stages: { name: string; desc: string }[];
    noteTitle: string;
    note: string; // "{date}"
    copyNote: string;
    copied: string;
  };

  doctor: { title: string; items: string[] };

  footer: { disclaimer: string; review: string; openSource: string };

  coach: {
    title: string;
    intro: string;
    dateLabel: string;
    langLabel: string;
    make: string;
    linkLabel: string;
    messageLabel: string;
    message: string; // "{link}"
    copyLink: string;
    copyMessage: string;
    copied: string;
    privacy: string;
    preview: string;
  };
};
