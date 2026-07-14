# 04 · Data & licensing

The product's credibility lives or dies on three datasets: **fixtures** (when), **broadcast** (what channel, per country), and **venues** (who's showing it, near you). This doc sets a strategy for each, plus the IP questions around crests and marks.

## 1. Canonical match model

Everything ingested gets normalized into one model; every screen renders from it:

```
Match {
  id, sport, competition { id, name, stage },
  participants [ { teamId, name, short, crestRef } ],   // 2 teams, or a field (F1)
  kickoffUtc,                                           // the only stored time — see 05 timezone doctrine
  status { phase: upcoming|live|finished, minute?, score? },
  broadcasts [ { country, channelId, channelName, coverageStartUtc?, streamUrl?, affiliateTag? } ],
  venueSummary { nearbyShowingCount? }                  // resolved per-user at query time via Favored
}
```

## 2. Fixtures & scores — provider comparison

| Provider | Coverage | Price posture | Redistribution terms | Live latency | Verdict |
|---|---|---|---|---|---|
| **API-Football** (api-sports.io) | Football: excellent, global | ~£0–300/mo tiers | app use OK on paid tiers | good (min-by-min) | **v1 primary for football** |
| **SportMonks** | Football strong, cricket product exists | ~£30–300/mo | similar | good | football alt; **cricket candidate** |
| **TheSportsDB** | Broad multi-sport, community-sourced | free/cheap patron | permissive | patchy | prototype/fallback only — accuracy risk for a product whose whole promise is the right time |
| **football-data.org** | European football | free–low | non-commercial leanings at free tier | ok | dev/testing only |
| **Sportradar** | Everything incl. NFL, cricket, F1, official feeds | £high, per-sport contracts | negotiated | best | **the consolidation path once revenue justifies it** |
| League-direct (NFL, F1 public schedule data) | own sport | free-ish for schedules | ToS-bound | n/a for live | schedules workable; live scores not |

**The plain finding:** *no affordable single provider covers football + cricket + NFL (+ rugby + F1) well.* Therefore:

> **v1 recommendation — stitch per-sport providers behind one ingestion layer.** Named primaries: API-Football (football), SportMonks or CricAPI (cricket), league schedule data + a modest feed for NFL, official calendar for F1 (schedules only — race *start times* are the product need; live timing is out of scope). The normalized model above absorbs the mess; clients never know. Consolidate onto Sportradar when revenue supports a contract.

Costs at v1 scale: low hundreds £/month total. The real cost is engineering the ingestion workers and the reconciliation (team-name mapping across providers) — budget for that, not the API bills.

## 3. TV listings ("on the box"), per country

Broadcast data is the sleeper licensing problem: comprehensive EPG data (Gracenote et al.) is licensed and expensive, and rights change constantly.

**v1 recommendation — manually curated broadcast data for top competitions.** The insight: the product doesn't need the full EPG; it needs *"which channel shows THIS match"* for the ~20 competitions users actually follow. That's a small, high-value dataset — effectively what wheresthematch curates — maintainable by one person-hour a day with an admin screen, seeded per country:

- **UK:** Sky Sports (+ which sub-channel), TNT Sports, Amazon Prime, BBC/ITV (free-to-air windows), Discovery+, DAZN. Include channel numbers ("Sky ch. 410") and coverage start ("Coverage from 17:00") as in the designs.
- **US (NYC):** NBC/Peacock (EPL), ESPN+, Fox, Paramount+ (UCL).
- **UAE (Dubai):** beIN Sports dominance; venue-first behaviour is even stronger — many expats have no home subscription.
- **Singapore:** StarHub/Hub Sports, mio; similar venue-first dynamics.
- **Australia (Sydney):** Optus Sport (EPL), Kayo/Fox, free-to-air cricket.

Automate later (Gracenote licence or broadcaster partnerships) once the curation load or country count makes manual untenable. Affiliate tags (see [03](03-monetization.md)) ride on these rows from day one.

## 4. Venues — the Favored API <a id="favored"></a>

Venue data is **provided by the Favored API** (favored.ai) — this pack assumes Favored exposes the surface WhensKickoff consumes; the app integrates it rather than sourcing venue data itself. **Hard rule carried over from the designs: every venue surface renders "powered by Favored"** (pink `#ef7fae` wordmark) — list cards, venue detail, map bottom-cards, match-detail carousels.

**API surface consumed (provided by Favored):**

| Capability | Used by |
|---|---|
| Geo search (lat/lng + radius, type filter pub/bar/restaurant) | Nearby, Map |
| Rating + review count | badges everywhere |
| Photos | cards, venue hero |
| "Favored says" editorial quote | venue detail quote card |
| Amenities (screens count, garden, food hours, dogs, late licence) | venue detail, filters, night-owl nudge |
| Booking deep-link / referral tracking | Book table |
| **Per-venue, per-fixture "showing this" declarations** (+ room/sound notes: "Main bar + garden · sound on") | *the entire B layer* |

**That last row — "which pub is showing which match" — is the data that makes the B layer possible, and Favored supplies it.** It isn't scrapeable or in any public dataset (Fanzo built a decade of venue-side tooling to collect it); Favored owns the venue relationship and the declaration flow that feeds this field, so WhensKickoff's job is to **consume it well**, not to collect it.

Two consumption-side rules the app owns regardless:

1. **Stale beats wrong.** A declaration older than the fixture week is demoted to "usually shows football" phrasing rather than asserting "showing this" — wrong data destroys trust faster than missing data.
2. **Degrade gracefully on thin coverage.** Where Favored's coverage is sparse (early in a new city), hide the pub count rather than show zeros — venue *coverage depth per city* is the rollout dependency, and it paces the B-layer expansion in [06 · Roadmap](06-roadmap.md).

## 5. Crests, logos & IP

- The design mockups (and the prototype in this repo) hotlink club crests from Wikipedia/Wikimedia. **That is a mockup convenience only** — club crests are trademarks; production use needs licensed assets.
- Production options, in order of preference: (1) **licensed image packs via the data provider** (API-Football and Sportradar both offer media add-ons — cheapest legitimate path); (2) direct league licensing (Premier League/NFL programmes — slow, expensive); (3) **designed fallback: colored-monogram circles** (the prototype already implements this as its image-error fallback — it's an acceptable v1 aesthetic if licensing drags).
- Team/competition *names* used factually (fixture listings) are generally fine; using marks in *advertising* the app is not. Get one legal review before the App Store submission, not after.
- If this repo's prototype is ever published (e.g. GitHub Pages) to show partners, swap crests to monograms first or keep the URL private — hotlinked crests on a public marketing URL is exactly the "advertising use" that invites letters.

## 6. Ingestion architecture

```mermaid
flowchart LR
  AF[API-Football] --> ING[Ingestion workers<br/>per-provider adapters]
  CK[Cricket feed] --> ING
  NFL[NFL schedule feed] --> ING
  F1[F1 calendar] --> ING
  CUR[Curated broadcast admin] --> ING
  ING --> NORM[(Normalized store<br/>Postgres: matches, teams,<br/>competitions, broadcasts)]
  FAV[Favored API<br/>venues + showings] -. queried live,<br/>cached briefly .-> API
  NORM --> API[WhensKickoff API<br/>Next.js route handlers]
  API --> WEB[Next.js web app<br/>v1]
  API -.later.-> IOS[SwiftUI iOS]
  API --> NOTIF[Reminder scheduler<br/>.ics + web push · APNs later]
```

Posture: fixtures sync on schedules (hourly; minutely near kickoff for live status), broadcast data is human-curated, venue data is **queried from Favored at request time** (their data, their freshness) with short-lived caching. Rate limits and provider outages are absorbed in the ingestion layer — clients only ever see the normalized store.

---
*Previous: [03 · Monetization](03-monetization.md) · Next: [05 · Platform & architecture](05-platform-architecture.md)*
