# Huddle Recovery

Free, open-source injury recovery support for student athletes and the families caring for them.

Players are going to keep playing, and people are going to keep watching. Huddle Recovery starts from that honest place and asks one question: how do we make recovery faster, safer, and affordable for the kids we care about?

Most of the recovery help that exists today is built for clinics and sits behind a paywall. Many high schools have no full-time athletic trainer. After a concussion, a lot of families go home with a handout and very little day-to-day guidance. This project exists to close that gap.

> Huddle Recovery supports a doctor's care. It does not replace it. It never diagnoses an injury and never clears an athlete to play.

## What's here now: the Night-One Kit

The first release is a mobile web page a coach or athletic trainer texts to a family right after an injury. No app to download, no account, works in English and Spanish.

It gives the family:

- **Go-to-the-ER danger signs**, always at the top
- **A plan for tonight and the first 72 hours**
- **A 60-second daily check-in** that stays on the family's own phone
- **A summary they can text back** to the coach or athletic trainer
- **Return-to-learn guidance** and a ready-to-send note for teachers

Coaches and athletic trainers use `/coach` to make the link. The link carries only the injury date and language, never a name or health details.

The kit starts with concussion. Bone and soft-tissue injuries come next.

## Our promises

Inspired by a parent who built a free, open-source speaking app for his non-verbal son when the existing one sat behind a paywall.

- **Open code.** Any school or district can run it. Anyone can check how it works. ([MIT License](LICENSE))
- **Open content.** The guides and exercises are free to reuse with credit. ([CC BY 4.0](CONTENT-LICENSE.md))
- **Open evidence.** We will publish how well it works, good and bad.
- **Family data is never sold.** In this first release, check-ins never leave the family's phone.

## Clinical review status

All health content in `content/` is **pending review** by a licensed athletic trainer or physical therapist. It follows widely published guidance (including CDC HEADS UP and international concussion consensus statements), but it has not yet been reviewed for this project. Spanish content also needs review by a native speaker. Do not treat this release as reviewed medical guidance until this section says otherwise.

## Roadmap

1. **Night-one kit** (this release)
2. **Volunteer clinician network** and a mode for schools with no athletic trainer
3. **Adaptive home program** that adjusts day to day within limits a clinician sets
4. **Heart-rate guided recovery**, following the University at Buffalo exercise research
5. **School and identity support**
6. **Phone-based reaction, balance, and eye checks**, only with a research partner and proper validation
7. **Recovery drills as sport games**

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the family kit and http://localhost:3000/coach for the link maker.

`npm run build` creates a static site in `out/` that any static host can serve. We deploy on AWS Amplify Hosting.

## Contributing

We'd love your help, especially from athletic trainers, physical therapists, translators, parents, and developers. See [CONTRIBUTING.md](CONTRIBUTING.md).

Built in public by [Shae Lyda (@shaeinthecloud)](https://github.com/ShaeInTheCloud). This is a personal project and is not affiliated with any employer.
