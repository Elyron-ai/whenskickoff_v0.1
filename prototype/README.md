# WhensKickoff — clickable prototype

A **zero-build, mid-fi clickable prototype** of the designed app screens (14 in all). Its job is to make the proposition tangible for partners, pubs and early users — it is *not* production code (the production stack recommendation is in [docs/05](../docs/05-platform-architecture.md)).

## Run it

Open **`index.html`** in any browser. No server, no build, no dependencies.

To share on a network / test on a phone:

```sh
python3 -m http.server 8000   # from this directory → http://localhost:8000
```

It also deploys unchanged to GitHub Pages (but read the crest note below first).

## What it demonstrates

- **14 screens** with working navigation:
  - *Core (1a–1h):* Onboarding · Home · Match detail · Nearby · Venue detail · Map · Search · My Teams.
  - *Backlog (4a–4f):* Team page (`#/team/:id`) · Competition hub / tournament mode (`#/competition/:id`) · Notification centre (`#/alerts`) · Notification settings (`#/alerts/settings`) · Profile & settings (`#/profile`) · Sign in (`#/signin`).
  - Wired through: team crests/names → team page, competition rows → hub, avatar → profile, My Teams 🔔 → alerts, alerts ⚙ → settings; tab bar, back buttons, card taps, deep links (e.g. `#/venue/fullback`).
- **Timezone-native rendering**: kickoff times are stored as UTC instants, computed relative to load time (the demo never looks stale), and rendered in *your* timezone via `Intl.DateTimeFormat` — plus a city dropdown on Home (🌐 pill, country flag per city) that re-renders the whole app in 🇬🇧 London / 🇺🇸 NYC / 🇦🇪 Dubai / 🇸🇬 Singapore / 🇦🇺 Sydney time (the expat-hub pitch in one tap).
- Live countdown on match detail; bell reminders and follow toggles that persist (localStorage); Favored-powered venue surfaces with "powered by Favored" attribution throughout.

## Structure

```
index.html          shell: phone frame, status bar, tab bar, script wiring
css/tokens.css      design tokens (the seed for the real design system)
css/base.css        reset, phone chrome, tab bar
css/components.css  cards, pills, chips, badges, rows, heroes, map bits
js/data.js          mock data (window.KO_DATA) — teams, matches, channels, venues
js/components.js    shared render helpers (KO namespace)
js/app.js           state (localStorage), hash router, event delegation
js/screens/*.js     one file per screen
assets/logo*.svg    the "KO?" bubble mark (in-app + dark-surface variants)
```

## Caveats

- **Club crests are hotlinked from Wikipedia/Wikimedia for prototype purposes only.** Production requires licensed assets ([docs/04](../docs/04-data-and-licensing.md)). If crests fail to load (offline, blocked), colored monogram circles render instead — which is also the licensing-fallback aesthetic. **Don't publish this prototype to a public URL with the crests in place.**
- Fixture content is illustrative (an NFL game in July is off-season — kept from the designs).
- Venue data is invented in Favored's voice; real data comes from the Favored API.
- Emoji stand in for a proper icon set (SF Symbols in production), per the mid-fi design spec.

## Reset demo state

Bells/follows/onboarding persist in localStorage. To reset: DevTools console → `localStorage.removeItem('ko_proto_state'); location.reload()` — or open a private window.
