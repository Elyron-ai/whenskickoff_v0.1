# 06 · Roadmap

## 1. Phases

| Phase | When | What ships | Out of scope |
|---|---|---|---|
| **v0 — decide & prove** | now → Sep 2026 | This doc pack; the [clickable prototype](../prototype/); 10–15 pub/partner conversations using it; Favored API integration scoped + commercial terms agreed; pick fixture providers and sign | any production code |
| **v1 — UK launch (layer A), web only** | ~Q4 2026 → Q1 2027 | **One simple Next.js web app**: onboarding, Home, match detail, search, My Teams; football (EPL/UCL/WSL + cups) + NFL + cricket top comps; kickoff-relative reminders (.ics + web push); curated UK broadcast rows with affiliate links; SEO match pages | native apps, live-score depth, venues (unless pilot ready early), premium |
| **v1.5 — London venue pilot (layer B)** | ~Q1–Q2 2027 | Nearby + venue detail + map, powered by the Favored API, ~50–100 London venues; "Book table"; featured-venue B2B proof | national venue coverage |
| **v2 — expat hubs + premium** | ~H2 2027 | NYC, Dubai, Singapore, Sydney: curated broadcast data per hub + Favored city expansion for venues; premium tier (calendar sync, unlimited alerts, dual-timezone) | more cities |
| **iOS app — separate track** | after web retention proves out | Native SwiftUI client on the same API: push (APNs), Live Activities / Dynamic Island kickoff countdown, home-screen widget, late-night nudge | Android (later still) |
| **Tournament mode (layer C)** | recurring | Playbook per event: themed onboarding, competition hub, share cards, venue promos, sponsor slot | — |

**Tournament calendar to build against:** Women's World Cup 2027 → England-hosted Ashes 2027 (night-owl special) → **Euro 2028 (UK & Ireland) — the flagship: home tournament, every match a pub moment** → Women's Euros 2029 → World Cup 2030. Each event is an acquisition wave measured by spike→evergreen conversion.

**Dependencies that gate the plan:** Favored commercial terms agreed and city coverage confirmed before v1.5 scoping ([04 §4](04-data-and-licensing.md#favored)); fixture-provider contracts signed before v1 build starts; crest licensing path chosen (a web-launch concern; also gates any later App Store submission — [04 §5](04-data-and-licensing.md)).

**Team shape (rough):** web v1 is buildable by ~2 people (full-stack TS/Next.js, design/founder doing curation + venue conversations); v1.5 adds venue ops muscle (founder-led at pilot scale); the iOS track adds a Swift engineer when it starts.

## 2. Success metrics

| Metric | Definition | Healthy signal |
|---|---|---|
| Activation | new user follows ≥1 team in first session | > 60% |
| Reminder opt-in | activated users with ≥1 alert on | > 25% *(kill-criteria threshold per [01 §7](01-proposition-options.md))* |
| W4 retention | active in week 4 (returning visits / reminders firing) | > 20% for a utility |
| Venue tap-through | match-detail sessions tapping a venue surface (pilot, London) | > 10% |
| Favored referrals | bookings + venue-page opens attributed | growing weekly in pilot |
| Spike→evergreen | tournament visitors following a team within 2 weeks | > 5% |

## 3. Risk register

| # | Risk | Likelihood | Impact | Owner / mitigation |
|---|---|---|---|---|
| 1 | Favored "showing this" data stale/inaccurate → trust damage | medium | high | Consumption rules: stale-beats-wrong demotion, degrade-gracefully on thin coverage ([04 §4](04-data-and-licensing.md#favored)) |
| 2 | Favored commercial terms unagreed | medium | medium | One-page agreement in v0 (API itself is a provided dependency) |
| 3 | Multi-sport data stitching underestimated | medium | medium | Ingestion layer owns reconciliation; start football-only in beta if needed |
| 4 | Seasonality cliff post-WC2026 | certain | medium | Ship v1 alerts before memory fades; email capture on the current site **now** |
| 5 | Crest/IP exposure | low–medium | medium | Monogram fallback shipped; legal review pre-submission; keep prototype URL private |
| 6 | Fanzo competitive response in venues | medium | medium | Quality-over-coverage positioning; Favored editorial moat; don't fight on venue count |
| 7 | Web reminders unreliable on iOS Safari (web push needs PWA install) | medium | low | `.ics` add-to-calendar as the universal v1 reminder; web push as enhancement; native push arrives on the iOS track ([05 §5](05-platform-architecture.md)) |

---
*Previous: [05 · Platform & architecture](05-platform-architecture.md) · Back to: [00 · Overview](00-overview.md)*
