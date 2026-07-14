# 03 · Monetization

## 1. Options catalogue

### R1 — Venue promotion & booking referrals (via Favored)
- **Mechanics:** venues pay for placement ("featured" in Nearby/map for a fixture), big-match promotion slots, and/or per-booking referral fees on **Book table**. Commercially this likely runs *through Favored* (venues are Favored's customers) with a revenue share to WhensKickoff for demand generation.
- **Realistic value:** venue marketing budgets for match days are real (Fanzo's whole business); £50–300/venue/month for promotion, £1–3 per covered seat on bookings are plausible anchors. At pilot scale (50–100 London venues) this is thousands/month — proof, not profit.
- **Prerequisites:** the Favored API's "showing this" data kept fresh (a consumption rule — [04 §4](04-data-and-licensing.md#favored)); Favored commercial terms agreed; enough fan traffic to matter to a landlord.

### R2 — Streaming & broadcast affiliates
- **Mechanics:** channel rows on Match detail ("Open ↗") deep-link to NOW, DAZN, Discovery+, Prime, etc. with affiliate/partner tags; earn on trial starts and sign-ups.
- **Realistic value:** £10–30 CPA per streaming sign-up is a normal range; conversion concentrated on big matches and "wrong-subscription" moments (exactly our match-detail traffic). Low ceiling but ~zero marginal cost.
- **Prerequisites:** affiliate programme access (NOW/DAZN have them; Sky is harder), honest labeling, and country-aware channel data so links are valid.

### R3 — Premium tier ("KO Pro" placeholder)
- **Mechanics:** subscription (~£1.99–2.99/mo or ~£15–20/yr) for power features: calendar sync (subscribe to your teams as an iCal feed), unlimited followed teams/alerts, multi-timezone sets ("my time + Singapore time" for calling home), custom alert offsets, no sponsorship placements.
- **Realistic value:** utility-app conversion of 2–5% of MAU is a fair planning range; meaningful only after retention proves out.
- **Prerequisites:** the free alert loop must already be sticky; App Store takes 15–30% of iOS revenue (web checkout can route around it for the web app).

### R4 — Sponsorship
- **Mechanics:** tournament-mode takeovers ("Euro 2028 hub, with <brewery>"), sponsored late-night nudges, branded share cards. Sold seasonally around the C-layer calendar.
- **Caution:** UK gambling-advertising rules and platform policies make bookmaker money the obvious-but-toxic option for a fan-trust brand — **prefer brewery, broadcaster, and food-delivery brands**; decide a "no gambling ads" stance early and say it out loud (it's also a differentiator vs. the score apps).

**Explicit stance: no display ads in v1.** Banner ads would undercut the quality positioning that justifies the Favored tie-in, for trivial revenue at launch scale.

## 2. Fit matrix — revenue option × proposition layer × phase

| | A · Utility | B · Venue layer | C · Tournament mode | Earliest sensible phase |
|---|---|---|---|---|
| R1 venue promotion/bookings | — | **core** | strong (big-match promos) | v1.5 London pilot |
| R2 streaming affiliates | **core** | — | strong (casuals lack subs) | v1 |
| R3 premium | **core** | supporting | weak (tourists don't subscribe) | v2 |
| R4 sponsorship | weak | supporting | **core** | first big tournament post-launch |

## 3. Sequencing recommendation

1. **v1 (UK launch):** free. R2 affiliate links live on channel rows from day one — they're just smarter deep-links and set the pattern that channel data must be country-aware.
2. **v1.5 (London venue pilot):** R1 switched on through Favored — featured placement + booking referrals with a handful of design-partner venues. Goal is *proof of the B2B motion*, not revenue.
3. **v2 (retention proven):** R3 premium, launched web-first (avoids App Store cut, tests price), then iOS.
4. **Tournament beats:** R4 sponsorship sold per event once there's an audience number to sell against (Euro 2028 is the flagship — home tournament, UK/Ireland).

## 4. Risks

- **Favored commercial terms need agreeing** — the API is a given, but who owns the venue relationship, who bills, and what's the split on referrals? Needs a one-page agreement before the pilot (see open questions in [00 · Overview](00-overview.md)).
- **Affiliate attribution leakage** — app-to-app deep links often lose tags (Sky/Now apps especially); measure with promo codes where links fail.
- **App Store commission** compresses R3 margins on iOS; mitigate with web subscription checkout.
- **Sponsorship vs. trust** — one bad gambling-adjacent placement can poison the "mate who knows" tone; the no-gambling stance should be policy, not preference.

---
*Previous: [02 · Users & market](02-users-and-market.md) · Next: [04 · Data & licensing](04-data-and-licensing.md)*
