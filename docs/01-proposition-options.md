# 01 · Proposition options

> The founder's ask: *"explore the product proposition options for whenskickoff.com — think of it as an iOS + Web app, pulling on various sports and offering the same functionality with pubs nearby integrated too alongside TV channels showing the games."*
>
> This doc lays out three candidate wedges, shows why they're layers rather than forks, and recommends a sequence.

## 1. Framing: two jobs, one proven

WhensKickoff answers two questions:

1. **"When's kickoff?"** — in *my* timezone, for *my* teams, across sports.
2. **"Where can I watch it?"** — which TV channel in *my* country, and which pubs/bars/restaurants near me are showing it.

The World Cup 2026 run proves real demand for job 1: people genuinely struggle with "21:00 BST kickoff in New Jersey — what's that for me?". It proves **nothing yet** about job 2 — the site never had venue or channel data. That asymmetry matters: job 1 is cheap to serve and commoditized; job 2 is expensive to serve and differentiated.

A second framing distinction: a **utility** wins by being opened reflexively (retention via alerts and habit); a **marketplace** wins by owning both sides (fans who want a screen, venues who want fans). They're different businesses with different cold-start problems, and the options below sit at different points on that line.

## 2. Option A — Fixtures-first multi-sport kickoff utility

**Concept.** The timezone-native fixtures app: follow teams and competitions across football, NFL, rugby, cricket, F1; see today's kickoffs localized; set kickoff-relative reminders (15 min before / kickoff / full-time). TV channels and pub counts appear as *detail-level* metadata on each fixture. This is the direct upgrade of what whenskickoff.com already is.

| | |
|---|---|
| **Target user** | Any fan juggling more than one sport/timezone; the WC2026 audience carried over |
| **MVP surface** | Onboarding, Home ("today's kickoffs"), Match detail, Search, My Teams + notifications |
| **Data cost** | Low–medium: fixtures APIs are cheap at small scale; no venue data needed |
| **Moat** | Weak on data, real on experience: nobody does *multi-sport + timezone-native + alerts* well in one place |
| **Revenue path** | Streaming affiliates on channel rows → premium tier (calendar sync, unlimited alerts) |
| **What kills it** | Being a worse FotMob: if users only care about one sport, incumbents win on depth |

**Strengths.** Cheap to build and run; a clear retention loop (the bell is the product); direct continuity with the existing site and its SEO; the designs (Home, My Teams, Search) already express it.

**Weaknesses.** Fixture times are commoditized — Google answers "when do Chelsea play" in the search results page. The differentiation is aggregation + timezone + alerts, which is real but thin on its own.

## 3. Option B — Venue-first "where to watch" discovery marketplace

**Concept.** The product is the *Nearby* tab: a Favored-powered map and list of pubs, bars and restaurants near you, filtered by "showing today's games", with ratings, editorial ("Favored says…"), screens/sound/room notes, late-licence flags, and table booking. Fixtures exist to index venues. B2B angle: venues pay (via Favored) for placement, promotion, and bookings.

| | |
|---|---|
| **Target user** | Fans who watch *out*: groups, big-match occasions, expats without the right subscriptions |
| **MVP surface** | Nearby, Venue detail, Map, plus a thin fixture layer to filter by |
| **Data cost** | Supplied by the Favored API — the per-fixture "showing this" data isn't obtainable elsewhere, so Favored providing it is the moat, not a build cost |
| **Moat** | Strong: Favored's venue relationships + quality/editorial layer are the defensible asset, and WhensKickoff has privileged access to them |
| **Revenue path** | Day-one plausible: venue promotion, booking referrals, big-match sponsorship |
| **What kills it** | Stale/inaccurate "showing this" data, or thin Favored coverage in a new city, destroying trust in one bad Saturday |

**Strengths.** Genuinely differentiated; monetizable early; perfect sister-product synergy — Favored provides ratings, reviews, photos, booking *and* the per-fixture "showing this" data via its API, while WhensKickoff brings the *reason to go out tonight*. The pink-badged venue surfaces in the designs are the most distinctive screens in the app.

**Weaknesses.** Fanzo (ex-MatchPint) has spent a decade on exactly this in the UK; the dependency now is Favored's **coverage depth per city** (see [04 · Data](04-data-and-licensing.md#favored)) rather than whether the data exists — so it realistically launches London-first, where Favored is deepest, not nationwide.

## 4. Option C — Tournament-mode event companion

**Concept.** Lean into what already worked: a product that spikes with the sporting calendar. For each big tournament (World Cup, Euros, Ashes, Lions tours, the Olympics), WhensKickoff becomes *the* companion: full schedule localized to your timezone, "where's it on near you" for every match, shareable fixture cards, themed onboarding. Between tournaments, the my-teams core keeps a smaller base warm.

| | |
|---|---|
| **Target user** | The casual-to-committed fan who materializes for tournaments; expats especially |
| **MVP surface** | Search hero (the World Cup Final card in the designs), competition pages, share cards |
| **Data cost** | Low per event: one competition's fixtures + curated broadcast data is a weekend of curation |
| **Moat** | None structurally — it's a *playbook*, not a product; brand + execution speed is the edge |
| **Revenue path** | Event sponsorship (broadcaster/brewery), venue promos around big matches |
| **What kills it** | The cliff: WC2026 ends this Sunday and traffic craters Monday. C alone is a seasonal business |

**Strengths.** Acquisition is *proven* — this is the only option with real traction evidence. Tournaments are press-able, shareable, and exactly when the "where to watch near me" job peaks (venue demand and venue willingness-to-pay both spike).

**Weaknesses.** Retention between events is an open question C can't answer by itself.

## 5. Layers, not forks

The options aren't mutually exclusive products — they're the same product with different centers of gravity, and each fixes another's weakness:

- **A needs differentiation** → B's venue layer is exactly that.
- **B needs an audience and a reason-to-open** → A's alerts and C's tournament spikes deliver fans to venue surfaces.
- **C needs somewhere for the spike to land** → A's "follow your teams" converts tournament visitors into evergreen users.

| | A · Utility | B · Venue marketplace | C · Tournament mode |
|---|---|---|---|
| User value (day 1) | High for multi-sport fans | High *where covered* | Very high, briefly |
| Data cost | £ | £££ + ops | £ per event |
| Revenue timing | Late (premium/affiliate) | Early (B2B) | Spiky (sponsorship) |
| Defensibility | Low–medium | High if supply won | None (playbook) |
| Cold-start risk | Low | High | Low |
| Proof so far | WC2026 site (job 1) | None | WC2026 site (traffic) |

**Sequencing paths considered:**

1. **A-spine → B-layer, C as campaigns** *(recommended, below)* — build the utility everyone can use anywhere; light up venues where Favored has depth; ride every tournament as an acquisition wave.
2. **B-first London pilot** — go straight at Fanzo with a quality/editorial angle. Highest potential moat, but bets everything on the hardest data problem before there's an audience, and shrinks the addressable market to one city.
3. **C-only "event app each summer"** — cheapest, matches proven traction, but it's a side project, not a company; no compounding asset between events.

## 6. Recommendation

> **A is the spine. B is the differentiator, shipped as surfaces inside A from v1 wherever Favored has venue depth (London pilot). C is a repeating acquisition campaign, not a separate product.**

Concretely:

- **v1 ships Option A** end-to-end (follow → today's kickoffs → match detail → remind me), UK-first with full timezone support baked in — see [06 · Roadmap](06-roadmap.md).
- **Match detail and Nearby carry Option B surfaces from the start**, powered by Favored, scoped to where the data is real (London pilot). Where venue data is thin, the surfaces degrade gracefully (hide the pub count rather than show zeros).
- **Option C is a playbook executed on the calendar**: Women's World Cup 2027 → England-hosted Ashes 2027 → **Euro 2028 (UK & Ireland) as the flagship home-market beat** → Women's Euros 2029 → World Cup 2030. Each event: themed onboarding, competition hub, share cards, venue promos.

**Deliberately not in v1:** live-score depth (minute-by-minute commentary, lineups, xG — FotMob's turf), ticketing, fantasy/predictions, native apps (v1 is web only; iOS is a separate later track — [05](05-platform-architecture.md), Android later still), user-generated venue reviews (that's Favored's domain).

## 7. Kill criteria & revisit signals

Set these now so the layers get re-weighted by evidence, not attachment:

- **Reminder opt-in < ~25%** of activated users → the alert loop isn't the spine we think; revisit whether C-plus-SEO is the real business.
- **Venue-surface tap-through < ~10%** on match detail in the London pilot → B is ahead of its audience; park the venue layer, double down on A.
- **Venue "showing this" accuracy complaints** in pilot feedback → stop expanding venues until data freshness/coverage from Favored (see [04](04-data-and-licensing.md)) is fixed; wrong data is worse than no data.
- **Tournament spike converts < ~5%** to followed-team users → C traffic is tourists; treat tournaments as sponsorship revenue events, not acquisition.

---
*Next: [02 · Users & market](02-users-and-market.md)*
