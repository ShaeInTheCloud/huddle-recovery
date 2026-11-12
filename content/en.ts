// English content for the Night-One Kit (concussion).
// Status: PENDING CLINICAL REVIEW. Based on widely published guidance including
// CDC HEADS UP and international consensus statements on sport-related concussion.
// Licensed CC BY 4.0. See CONTENT-LICENSE.md.
import type { Content } from "./types";

const en: Content = {
  langCode: "en",
  switchLabel: "Español",
  tagline: "Concussion recovery, step by step",
  dayCount: "Day {n} since the injury",
  dayZero: "Injury day",

  er: {
    title: "Go to the ER now if you see",
    intro: "These signs mean the brain may need emergency care. Do not wait to see if they pass.",
    signs: [
      "A headache that gets worse and does not go away",
      "Throwing up more than once, or strong nausea",
      "Slurred speech, weakness, numbness, or trouble with coordination",
      "Very sleepy or hard to wake up",
      "A seizure (shaking or twitching)",
      "One pupil (the black part of the eye) larger than the other",
      "Confusion, acting strange, restless, or not recognizing people or places",
      "Passing out, even for a moment",
    ],
    call911: "Call 911 for a seizure, passing out, or if you cannot wake them.",
  },

  plan: {
    title: "Your plan for the first few days",
    intro: "The brain heals best with a short rest, then a slow return to normal life. Go at the pace symptoms allow.",
    doLabel: "Do",
    avoidLabel: "Avoid",
    phases: [
      {
        when: "Tonight",
        doList: [
          "Let them sleep. Sleep helps the brain heal. You do not need to wake them through the night unless the doctor told you to.",
          "Keep the room quiet and dim.",
          "Check on them before bed and in the morning. Keep this page handy in case danger signs show up.",
          "Ask the doctor or pharmacist which pain medicine is okay before giving any.",
        ],
        avoidList: [
          "Any sports, practice, or physical play",
          "Driving",
          "Alcohol, or sleep or pain medicines the doctor has not okayed",
        ],
      },
      {
        when: "Days 1 to 2",
        doList: [
          "Rest, but not total darkness. Light, calm activity around the house is fine.",
          "Short screen time in small blocks, with breaks. Turn the brightness down.",
          "Keep a normal sleep schedule.",
          "Do the daily check-in below.",
        ],
        avoidList: [
          "Sports, gym class, lifting, or anything with a risk of another hit",
          "Long stretches of screens, video games, or loud places",
          "Driving",
        ],
      },
      {
        when: "Day 3 and after",
        doList: [
          "Add light activity like a short, easy walk, as long as symptoms only go up a little (no more than 2 points out of 10) and settle within an hour.",
          "Start getting back to normal routines a little each day.",
          "Begin the return-to-school steps below.",
          "Follow up with the doctor, and tell the coach or athletic trainer how it is going.",
        ],
        avoidList: [
          "Contact or any activity with a risk of hitting the head, until a doctor clears it",
          "Pushing through symptoms that keep getting worse",
        ],
      },
    ],
  },

  checkin: {
    title: "Daily check-in",
    intro: "One minute a day. Rate each symptom from 0 (none) to 6 (severe). Your answers stay on this phone.",
    symptoms: [
      "Headache",
      "Dizziness",
      "Nausea",
      "Bothered by light",
      "Bothered by noise",
      "Trouble concentrating",
      "Feeling foggy or slowed down",
      "Irritable or emotional",
    ],
    scaleHint: "0 = none, 6 = severe",
    sleep: "Hours slept last night",
    school: "School today",
    schoolOptions: ["Stayed home", "Part of the day", "Full day", "No school today"],
    mood: "Mood today",
    moodOptions: ["Great", "Good", "Okay", "Low", "Really struggling"],
    dangerQuestion: "Any of the ER danger signs today?",
    yes: "Yes",
    no: "No",
    save: "Save check-in",
    needAll: "Rate every symptom and answer the danger sign question to save.",
    saved: "Saved. Today's symptom score is {score} out of {max}.",
    erNow: "Go to the emergency room now or call 911. A danger sign needs a doctor today. Then let your coach or athletic trainer know.",
    moodSupport: "Being sidelined is hard. If you are struggling, call or text 988 any time to talk with someone. Please also tell a parent, coach, or counselor how you are feeling.",
    rising: "Symptoms went up from last time. Take it easier today. If they keep rising for 2 or more days, call the doctor.",
    historyTitle: "Check-in history",
    noHistory: "No check-ins yet. Your first one will show here.",
    scoreLabel: "Score",
    clear: "Clear all check-ins on this phone",
  },

  share: {
    title: "Send an update to your coach or athletic trainer",
    intro: "This makes a short text you can send. Nothing is shared unless you send it.",
    button: "Share update",
    copy: "Copy update",
    copied: "Copied. Paste it into a text message.",
    empty: "Do a check-in first, then you can send an update.",
    header: "Huddle Recovery update",
    dangerFlag: "DANGER SIGN REPORTED",
    footer: "Sent from the family's Huddle Recovery check-ins.",
  },

  school: {
    title: "Getting back to school",
    intro: "School is part of recovery. Most students go back in a few days with some help. Move to the next step when the current one does not make symptoms much worse.",
    stages: [
      { name: "At home, light activity", desc: "Light reading, TV, and short screen time that do not make symptoms worse." },
      { name: "Schoolwork at home", desc: "Homework and reading in short blocks with breaks." },
      { name: "Part-time at school", desc: "Shorter days or extra breaks, with help from teachers." },
      { name: "Full days at school", desc: "Back to a normal schedule, catching up on missed work slowly." },
    ],
    noteTitle: "Note for teachers and the school nurse",
    note:
      "Hello. My child had a concussion on {date} and is recovering. While they heal, please allow rest breaks, extra time on assignments and tests, reduced screen time, and a quiet place if symptoms come on. Please excuse them from PE and sports until a doctor clears them. Thank you for your help.",
    copyNote: "Copy note",
    copied: "Copied",
  },

  doctor: {
    title: "When to call the doctor (not an emergency)",
    items: [
      "Symptoms are getting worse over 2 or more days",
      "Symptoms are not improving after about a week",
      "Symptoms are still there after 2 weeks",
      "Trouble with school, sleep, or mood that is not getting better",
      "Ask about a concussion specialist if symptoms last past 4 weeks",
    ],
  },

  footer: {
    disclaimer: "Huddle Recovery supports your doctor's care. It does not replace it. Only the treating doctor can clear a return to sports.",
    review: "This content is waiting for review by a licensed athletic trainer or physical therapist.",
    openSource: "Free and open source.",
  },

  coach: {
    title: "Send a family the Night-One Kit",
    intro: "Make a link for a family after an injury. They open it on their phone. No app and no account.",
    dateLabel: "Date of injury",
    langLabel: "Family's language",
    make: "Make link",
    linkLabel: "Link",
    messageLabel: "Text message to send",
    message:
      "Hi, this is your coach. Here is a free recovery guide for tonight and the next few days: {link} It shows the ER danger signs, a day-by-day plan, and a 1-minute daily check-in. Please text me an update each day from the page.",
    copyLink: "Copy link",
    copyMessage: "Copy message",
    copied: "Copied",
    privacy: "The link only carries the injury date and language. Never add the athlete's name or health details to a link.",
    preview: "Open the family page",
  },
};

export default en;
