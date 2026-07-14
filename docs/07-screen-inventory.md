# 07 · Screen inventory & design backlog

*A map of what's designed, what's compressed, and what's missing — as a starting point for iterating the screens in Claude Design.*

**References:** the clickable [prototype](../prototype/) (8 screens, live) · the original "WhensKickoff Exploration" design canvas (screens 1a–1h) · design tokens in [`prototype/css/tokens.css`](../prototype/css/tokens.css).

**Context note (platform):** v1 is **web only** ([05 · Platform](05-platform-architecture.md)); native iOS is a later track. The existing mockups are iPhone-framed — when iterating, consider the **responsive web** layout for each screen (single mobile column → wider desktop layout), not just the phone frame.

## Brand system to hold consistent

Recently unified so the brand carries screen-to-screen — keep this when iterating:
- **KO? speech-bubble mark** (green `#03bd6d`) + **wordmark** "when's**kickoff**" (900 weight, tight tracking).
- **Top-level screens** (Home, Nearby, Search, My Teams): header = KO? bubble + screen title on the left, **persistent user avatar** on the right (Home uses the full wordmark + the timezone/city dropdown).
- **Detail screens** (Match, Venue, Map): header = back · centred context or KO? bubble · right-aligned actions.
- **Favored pink `#ef7fae`** for every venue surface + a "powered by Favored" attribution.
- Tone: British, fan-first, warm ("Right, let's go", "Your lot", "one for the night owls 🦉").

**Legend:** ✅ built · 🟡 compressed / partial · ⬜ missing

---

## 1. Built ✅ (14 screens in the prototype)

**Core (1a–1h):**

| Screen | Route | Purpose | Key elements |
|---|---|---|---|
| **Onboarding** | `#/onboarding` | Pick sports & teams, grant location | 3-step progress bar, sport chips, follow-team rows, location card, "Right, let's go →" CTA |
| **Home** | `#/home` | Today's kickoffs in your timezone | Wordmark + city dropdown + avatar, sport filter chips, LIVE card (score + minute), UP NEXT rows with bells |
| **Match detail** | `#/match/:id` | One fixture: when + where to watch | Green hero (kickoff time, live countdown, remind-me), "On the box" channel rows, "Watching it out?" Favored venue carousel |
| **Live match** | `#/match/:id` (live) | In-play variant of match detail | Score + minute in the hero instead of countdown |
| **Nearby** | `#/nearby` | Pubs/bars/food with the game on | Filter chips, Favored venue cards (pink rating, fixture tags), "Map view" pill |
| **Venue detail** | `#/venue/:id` | One venue: what's on + Favored review | Photo hero + rating, Call/Directions/Book, "Favored says" quote, "On the screens today", amenities |
| **Map** | `#/map` | Who's showing the selected fixture | Filter pill, pins (pubs / restaurant / not-showing), user dot, tappable bottom venue card |
| **Search** | `#/search` | Find teams, comps, global kickoffs | Query + scope chips, hero result card (World Cup Final), competition rows, popular chips |
| **My Teams** | `#/teams` | Your follows + alert settings | Followed rows, per-team alert-timing chips, late-night nudge, "+ Follow another" |

**Backlog, now built (4a–4f):**

| Screen | Route | Purpose | Key elements |
|---|---|---|---|
| **Team page** | `#/team/:id` | A followed team's page | Gradient identity band (crest, position, W/D/L form, Follow), NEXT UP hero, fixtures list, recent-results tiles, alerts summary |
| **Competition hub** | `#/competition/:id` | Tournament mode | Dark header (TOURNAMENT MODE, tab chips), Final hero with flag circles, fixture rows, add-all-to-calendar promo |
| **Notification centre** | `#/alerts` | Fired + queued alerts | Icon-tile rows, unread wash + dots, "Today" / "Queued up" (dashed) sections, night-owl tile |
| **Notification settings** | `#/alerts/settings` | Alert defaults & delivery | Default-alert chips, "how we reach you" toggle rows (push / calendar / email), quiet hours + night-owl exception |
| **Profile & settings** | `#/profile` | Account & preferences | Identity row, Time & place rows (timezone, country, mi/km), App rows (notifications, theme, KO Pro), sign-in/out |
| **Sign in** | `#/signin` | Cross-device sync (skippable) | Green glow, KO? bubble, Apple / Google / email, skip link, Favored footnote |

## 2. Compressed / partial 🟡

| Item | Today | Needs |
|---|---|---|
| **Onboarding flow** | One screen does everything; a 3-step progress bar is shown but not real | Break into real steps (see §3) with forward/back and skip |
| **My Teams (team manager)** | Follows list; alert-timing chips shown on one card only | Reordering, alert timing on every follow, per-competition options, unfollow |
| **Search states** | Works for the happy path | Loading, empty ("no results"), recent searches |

### Recently built (were in this backlog)
Team page, Competition hub / tournament mode, Notification centre + settings, Profile & settings, and Sign in have all been designed (canvas turn 4) and built into the prototype — see §1. The remaining backlog below is what's still open.

## 3. Missing ⬜ (design backlog)

### Onboarding — as a real step-by-step flow
The single screen should become a short flow. Suggested steps:
1. **Welcome / value** — one line on the promise ("Never miss kickoff. Know where to watch."), the KO? brand moment.
2. **Pick your sports** — the sport chips, full-screen.
3. **Follow teams & competitions** — searchable list, not just three suggestions.
4. **Notifications priming** — explain the value *before* the OS prompt ("We'll nudge you 15 min before kickoff"). Web: also offer add-to-calendar.
5. **Location priming** — why we ask (local channels + nearby pubs), with a skip.
6. **Done / first-run** — drop into Home with a subtle "here's today" cue.

### Competition hub — deeper tabs
The hub's **Groups / Knockouts / Following** tabs are placeholders — design the bracket, group tables, and a following view.

### Schedule & discovery
- ⬜ **Full schedule / calendar** — Home is "today" only; add a week view / date picker / by-competition browse.
- ⬜ **"All pubs showing this"** — the full list behind the match-detail carousel and "See all N pubs" (currently routes to Nearby).

### Commerce
- ⬜ **Premium / upgrade** — the "KO Pro" screen (calendar sync, unlimited alerts, multi-timezone) referenced in [03 · Monetization](03-monetization.md). (An entry point exists on Profile; the screen itself is still to design.)

### System & edge states (cross-cutting)
- ⬜ **Empty states** — no follows yet, no games today, no pubs nearby, no search results.
- ⬜ **Loading & skeletons**, **error / offline / retry**, **permission-denied** (location or notifications refused, with graceful fallback).

## 4. Suggested design priority

1. **Onboarding flow** (real steps) — first impression + the follows/permissions that everything depends on.
2. **Empty/loading/error states** across the built screens — the biggest gap now the core + backlog screens exist.
3. **Competition hub deeper tabs** (groups, knockouts, following) — flesh out tournament mode.
4. **Premium / KO Pro** screen — the entry point exists; design the upgrade surface.
5. **Full schedule/calendar** and **All-pubs list** — round out discovery.

---
*Part of the [WhensKickoff proposition pack](00-overview.md).*
