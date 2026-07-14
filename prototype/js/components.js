/* Shared render helpers. Everything returns HTML strings; screens compose them.
   KO is the single global namespace for the prototype. */
window.KO = {
  screens: {},
  state: null, // populated by app.js

  D: window.KO_DATA,

  esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  },

  /* ---------- time & timezone ---------- */
  activeTz() {
    const i = KO.state ? KO.state.tzIndex : -1;
    return i >= 0 ? KO.D.tzCycle[i].tz : undefined; // undefined = viewer's own zone
  },
  activeTzLabel() {
    const i = KO.state ? KO.state.tzIndex : -1;
    return i >= 0 ? KO.D.tzCycle[i].label : "Your time";
  },
  activeTzFlag() {
    const i = KO.state ? KO.state.tzIndex : -1;
    return i >= 0 ? KO.D.tzCycle[i].flag : "🌐";
  },
  fmtTime(utcMs) {
    return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: KO.activeTz() }).format(new Date(utcMs));
  },
  dayKey(utcMs) {
    return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: KO.activeTz() }).format(new Date(utcMs));
  },
  fmtDay(utcMs) {
    const key = KO.dayKey(utcMs);
    if (key === KO.dayKey(Date.now())) return "TODAY";
    if (key === KO.dayKey(Date.now() + 864e5)) return "TOMORROW";
    return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: KO.activeTz() }).format(new Date(utcMs)).toUpperCase();
  },
  fmtDayLong(utcMs) {
    return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: KO.activeTz() }).format(new Date(utcMs));
  },
  fmtCountdown(utcMs) {
    const d = utcMs - Date.now();
    if (d <= 0) return "Kicking off…";
    const h = Math.floor(d / 36e5), m = Math.ceil((d % 36e5) / 6e4);
    return "Kicks off in " + (h ? h + "h " : "") + m + "m";
  },
  todayLine() {
    const today = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: KO.activeTz() }).format(new Date());
    return today + " · " + (KO.state.tzIndex >= 0 ? KO.D.tzCycle[KO.state.tzIndex].label : KO.D.user.locationLabel);
  },

  /* ---------- brand ---------- */
  logoBubble(size, fill, text) {
    fill = fill || "var(--green)"; text = text || "#fff";
    return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" aria-label="KO?">
      <rect x="4" y="6" width="40" height="28" rx="10" fill="${fill}"></rect>
      <polygon points="14,32 14,44 26,32" fill="${fill}"></polygon>
      <text x="24" y="26" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="900" fill="${text}">KO?</text>
    </svg>`;
  },
  wordmark(size) {
    size = size || 26;
    return `<div class="row" style="gap:8px;min-width:0">${KO.logoBubble(Math.round(size * 1.15))}
      <div style="font-size:${size}px;font-weight:900;letter-spacing:-.5px;white-space:nowrap">when's<span style="color:var(--green)">kickoff</span></div>
    </div>`;
  },
  avatar() {
    return `<div class="avatar" title="You">${KO.esc(KO.D.user.initials)}</div>`;
  },
  /* Consistent header for the four top-level tab screens: KO? mark + title
     on the left (Home uses the full wordmark), optional control + avatar right. */
  appHeader(opts) {
    opts = opts || {};
    const brand = opts.wordmark
      ? KO.wordmark(21)
      : `<div class="row" style="gap:9px;min-width:0">${KO.logoBubble(28)}<div class="app-header__title">${KO.esc(opts.title)}</div></div>`;
    return `<div class="app-header-row">
      ${brand}
      <div class="app-header__right">${opts.right || ""}${KO.avatar()}</div>
    </div>`;
  },
  /* Consistent header for detail screens: back button, centred brand/context, right actions. */
  detailHeader(opts) {
    opts = opts || {};
    return `<div class="detail-header">
      <button class="icon-btn" data-back aria-label="Back">←</button>
      <div class="detail-header__center">${opts.center || ""}</div>
      <div class="detail-header__right">${opts.right || `<span class="icon-btn" aria-hidden="true"></span>`}</div>
    </div>`;
  },

  /* ---------- crests ---------- */
  crestFail(img) {
    const short = img.dataset.short, color = img.dataset.color, size = img.dataset.size;
    const mono = document.createElement("span");
    mono.className = "mono";
    mono.style.background = color;
    mono.style.fontSize = Math.round(size * 0.32) + "px";
    mono.textContent = short;
    img.parentNode.replaceChild(mono, img);
  },
  crest(teamId, size, ring) {
    const t = KO.D.teams[teamId];
    if (!t) return "";
    const box = ring ? `width:${size + 10}px;height:${size + 10}px` : `width:${size}px;height:${size}px`;
    return `<span class="crest${ring ? " crest--ring" : ""}" style="${box};flex:none">
      <img src="${t.crest}" alt="${KO.esc(t.name)}" data-short="${KO.esc(t.short)}" data-color="${t.color}" data-size="${size}"
           onerror="KO.crestFail(this)">
    </span>`;
  },

  /* ---------- tags & meta ---------- */
  sportTint(sportId) { return KO.D.sports[sportId] ? KO.D.sports[sportId].tint : "gray"; },
  tagClass(tint) { return "tag tag--" + (tint || "gray"); },
  compTagColor(sportId) {
    return { green: "var(--green-dark)", orange: "var(--orange-dark)", cyan: "var(--cyan-dark)", pink: "#b04a7d", gray: "var(--muted)" }[KO.sportTint(sportId)];
  },
  pubsMeta(m) {
    if (m.lateNight) return "one for the night owls 🦉";
    return "🥂 " + m.pubCount + " pubs nearby";
  },

  /* ---------- match pieces ---------- */
  matchTitle(m, crestSize) {
    crestSize = crestSize || 18;
    if (m.title) return `<span>${KO.esc(m.title)}</span>`;
    const h = KO.D.teams[m.home], a = KO.D.teams[m.away];
    const joiner = m.joiner || "v";
    const short = (t) => t.nick || (t.name.length > 12 ? t.short : t.name);
    return `${KO.crest(m.home, crestSize)}<span style="white-space:nowrap">${KO.esc(short(h))} ${joiner} ${KO.esc(short(a))}</span>${KO.crest(m.away, crestSize)}`;
  },
  bellBtn(m) {
    const on = !!KO.state.bells[m.id];
    return `<button class="bell${on ? " on" : ""}" data-bell="${m.id}" aria-label="Toggle reminder">🔔</button>`;
  },
  matchRow(m) {
    return `<div class="match-row" data-nav="#/match/${m.id}">
      <div class="when">
        <div class="t">${KO.fmtTime(m.kickoffUtc)}</div>
        <div class="s" style="color:${KO.compTagColor(m.sport)}">${m.compShort}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div class="fixture">${KO.matchTitle(m)}</div>
        <div class="meta">📺 ${KO.esc(m.channels[0].name)} · ${KO.pubsMeta(m)}</div>
      </div>
      ${KO.bellBtn(m)}
    </div>`;
  },
  liveCard(m) {
    const h = KO.D.teams[m.home], a = KO.D.teams[m.away];
    return `<div class="live-card" data-nav="#/match/${m.id}">
      <div class="status"><i class="dot"></i><span>LIVE NOW · ${m.status.minute}′</span></div>
      <div class="teams">
        <div class="team">${KO.crest(m.home, 26)}<span>${KO.esc(h.name)}</span></div>
        <div class="score">${m.status.score[0]} – ${m.status.score[1]}</div>
        <div class="team"><span>${KO.esc(a.name)}</span>${KO.crest(m.away, 26)}</div>
      </div>
      <div class="foot"><span>📺 ${KO.esc(m.channels[0].name)}</span><span>🥂 ${m.pubCount} pubs near you</span></div>
    </div>`;
  },
  channelRow(c) {
    return `<div class="channel-row">
      <div class="logo" style="background:${c.color}">${KO.esc(c.short)}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14.5px;font-weight:700">${KO.esc(c.name)}</div>
        <div style="font-size:12px;color:var(--muted-2)">${KO.esc(c.meta)}</div>
      </div>
      <span class="open">Open ↗</span>
    </div>`;
  },

  /* ---------- venue pieces ---------- */
  favoredNote(prefix) {
    return `<span class="favored-note">${prefix || "powered by"} <b>Favored</b></span>`;
  },
  venuePhoto(v, height, cls) {
    return `<div class="photo photo--img ${cls || ""}" style="height:${height}px;background-image:${v.photo};position:relative">
      <span class="rating-badge">${v.rating}</span>
    </div>`;
  },
  fixtureTagsFor(v) {
    return v.showing.map((s) => {
      const m = KO.D.matches.find((x) => x.id === s.matchId);
      if (!m) return "";
      const sp = KO.D.sports[m.sport];
      const label = m.title
        ? sp.emoji + " " + m.title
        : sp.emoji + " " + KO.D.teams[m.home].short + " " + (m.joiner || "v") + " " + KO.D.teams[m.away].short + " " + KO.fmtTime(m.kickoffUtc);
      return `<span class="${KO.tagClass(KO.sportTint(m.sport))}">${label}</span>`;
    }).join("");
  },
  venueCard(v) {
    const tags = KO.fixtureTagsFor(v) + (v.bookable && v.type === "restaurant" ? `<span class="tag tag--gray">Bookable</span>` : "");
    return `<div class="card venue-card" data-nav="#/venue/${v.id}">
      ${KO.venuePhoto(v, 120)}
      <div style="padding:12px 16px 14px">
        <div class="row" style="justify-content:space-between;align-items:baseline">
          <div style="font-size:17px;font-weight:800">${KO.esc(v.name)}</div>
          <div style="font-size:12.5px;color:var(--muted-2)">${v.distance}</div>
        </div>
        <div style="font-size:12.5px;color:var(--muted);margin-top:2px">${KO.esc(v.desc)}</div>
        <div class="row" style="gap:6px;margin-top:9px;flex-wrap:wrap">${tags || `<span class="tag tag--gray">No games on today</span>`}</div>
      </div>
    </div>`;
  },
  venueMini(v, matchId) {
    const s = v.showing.find((x) => x.matchId === matchId);
    const extra = s && /sound on/i.test(s.note) ? "sound on 🔊" : v.amenities[0].toLowerCase();
    return `<div class="venue-mini" data-nav="#/venue/${v.id}">
      ${KO.venuePhoto(v, 72)}
      <div style="padding:10px 12px">
        <div style="font-size:13.5px;font-weight:800">${KO.esc(v.name)}</div>
        <div style="font-size:11.5px;color:var(--muted-2);margin-top:2px">${v.distance} · ${KO.esc(extra)} · <span style="color:var(--green-dark);font-weight:700">showing this</span></div>
      </div>
    </div>`;
  }
};
