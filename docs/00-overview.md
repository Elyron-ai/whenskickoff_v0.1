# WhensKickoff — Product Proposition Pack

*July 2026 · exploration for evolving whenskickoff.com beyond the World Cup*

## What this is

WhensKickoff ran through World Cup 2026 as a single-purpose site: *when is kickoff, in my timezone?* This pack explores turning it into a **multi-sport product — web first, iOS to follow** — answering two questions — **"When's kickoff?"** (my teams, my timezone, every sport I follow) and **"Where can I watch it?"** (the TV channel in my country, and pubs/bars/restaurants nearby showing it, powered by sister product **Favored**). A [clickable prototype](../prototype/) of the designed experience accompanies the docs.

## Recommendation — TL;DR

> **Build the fixtures-first utility as the spine (follow teams → today's kickoffs → reminders), ship the Favored venue layer inside it from v1 as the differentiator (London pilot), and run tournaments as repeating acquisition campaigns — not a separate product.** UK first, then expat hubs (NYC, Dubai, Singapore, Sydney). Ship **web only first** — one simple Next.js app (SEO-friendly match pages, one deployable) integrating the Favored API; **native iOS is a separate, later track** that reuses the same API. First revenue: streaming affiliates (v1) and Favored venue promotion/bookings (v1.5 pilot); premium tier once retention proves out. Next home-market flagship beat: **Euro 2028 (UK & Ireland)**.

Full reasoning in [01 · Proposition options](01-proposition-options.md).

## Decisions already made (don't re-litigate)

1. **Deliverable of this exploration:** doc pack + clickable web prototype (this repo).
2. **Market focus:** UK-first + expat hubs.
3. **Platform:** web only for v1 — one simple Next.js app; native iOS is a separate later track sharing the same API ([05](05-platform-architecture.md)).

## How to read this pack

| Doc | One line |
|---|---|
| [01 · Proposition options](01-proposition-options.md) | **The centerpiece** — three wedges (utility / venue marketplace / tournament companion), why they're layers, the recommended sequence, kill criteria |
| [02 · Users & market](02-users-and-market.md) | Personas & JTBD (displaced fan, night-owl, group organiser), sizing, UK competitor table, differentiation thesis, tone |
| [03 · Monetization](03-monetization.md) | Four revenue options with realistic values, fit matrix, sequencing, no-gambling-ads stance |
| [04 · Data & licensing](04-data-and-licensing.md) | Fixtures provider strategy (stitched per-sport), curated TV listings, the Favored API surface + the "showing this" problem, crest IP |
| [05 · Platform & architecture](05-platform-architecture.md) | Stack comparison, backend sketch, notification model, the timezone doctrine |
| [06 · Roadmap](06-roadmap.md) | Phases v0→v2 + tournament playbook, metrics, risk register |

## The prototype

Open [`prototype/index.html`](../prototype/index.html) in any browser (no build, no server). It's a phone-framed, clickable walkthrough of the eight designed screens with live-computed kickoff times — built to show partners, pubs and early users. Details in [`prototype/README.md`](../prototype/README.md).

## Open questions for the founder

1. **Favored commercial terms** — the Favored API (venues, ratings, editorial, booking, and per-fixture "showing this" declarations) is assumed as a provided dependency ([04 §4](04-data-and-licensing.md#favored)); what still needs a one-pager is the *business* side — referral split and venue-relationship ownership.
2. **Favored venue coverage per city** — how deep is Favored's data in London at pilot, and in NYC / Dubai / Singapore / Sydney for v2? Coverage depth paces the B-layer rollout, not API availability.
3. **Data budget** — comfortable with ~low hundreds £/month for stitched v1 providers, and the engineering cost of reconciliation?
4. **Brand stretch** — happy to keep "kickoff" across cricket/F1? (Recommendation: yes — [02 §4](02-users-and-market.md).)
5. **WC2026 audience** — the final is this Sunday; is there an email/notification capture on the live site today to carry that audience into v1?
