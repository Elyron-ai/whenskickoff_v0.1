/* 1e Venue detail — fixtures on + Favored review. */
KO.screens.venue = {
  tab: null,
  render(id) {
    const v = KO.D.venues.find((x) => x.id === id) || KO.D.venues[0];

    const showingRows = v.showing.map((s) => {
      const m = KO.D.matches.find((x) => x.id === s.matchId);
      if (!m) return "";
      const name = (id) => KO.D.teams[id].nick || KO.D.teams[id].name;
      const title = m.title || `${name(m.home)} ${m.joiner || "vs"} ${name(m.away)}`;
      return `<div class="showing-row" data-nav="#/match/${m.id}" style="cursor:pointer">
        <div class="t">${KO.fmtTime(m.kickoffUtc)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:700">${KO.D.sports[m.sport].emoji} ${KO.esc(title)}</div>
          <div style="font-size:11.5px;color:var(--muted-2)">${KO.esc(s.note)}</div>
        </div>
        <span class="${KO.tagClass(s.tagTint)}" style="font-size:11px;font-weight:800">${KO.esc(s.tag)}</span>
      </div>`;
    }).join("");

    return `
    <div class="nav-header">
      <button class="back" data-back>←</button>
      <span style="font-size:18px">♡ &nbsp; ↑</span>
    </div>
    <div style="margin:0 var(--pad-x)">
      <div class="photo photo--img" style="height:160px;border-radius:var(--r-card-lg);background-image:${v.photo};position:relative">
        <span class="rating-badge" style="left:auto;right:12px;top:12px;font-size:14px;padding:6px 12px">${v.rating}</span>
      </div>
    </div>
    <div class="stack" style="padding:16px var(--pad-x) 22px;gap:16px">
      <div>
        <div style="font-size:24px;font-weight:900;letter-spacing:-.4px">${KO.esc(v.name)}</div>
        <div style="font-size:13px;color:var(--muted);margin-top:3px">${v.type === "restaurant" ? "Restaurant" : "Sports pub"} · ${v.price} · ${KO.esc(v.area)} · ${v.distance}</div>
        <div style="margin-top:6px">${KO.favoredNote("Review &amp; rating powered by")}</div>
      </div>
      <div class="row" style="gap:8px">
        <button style="flex:1;border:1.5px solid rgba(0,0,0,.12);background:none;border-radius:var(--r-tile);padding:9px;font-size:12.5px;font-weight:700;font-family:inherit;cursor:pointer">📞 Call</button>
        <button style="flex:1;border:1.5px solid rgba(0,0,0,.12);background:none;border-radius:var(--r-tile);padding:9px;font-size:12.5px;font-weight:700;font-family:inherit;cursor:pointer">🧭 Directions</button>
        ${v.bookable ? `<a href="https://favored.ai" target="_blank" rel="noopener" style="flex:1;background:var(--green);color:#fff;border-radius:var(--r-tile);padding:9px;font-size:12.5px;font-weight:700;text-align:center">🍽 Book table</a>` : ""}
      </div>
      <div class="favored-quote"><b>Favored says:</b> “${KO.esc(v.favoredSays)}”</div>
      <div>
        <div class="section-label">📺 On the screens today</div>
        <div class="stack" style="gap:8px;margin-top:10px">
          ${showingRows || `<div style="font-size:13px;color:var(--muted)">No games declared today — lovely pub, wrong night.</div>`}
        </div>
      </div>
      <div class="row" style="gap:14px;font-size:12.5px;color:rgba(0,0,0,.6);flex-wrap:wrap">
        ${v.amenities.map((a) => `<span>✔ ${KO.esc(a)}</span>`).join("")}
      </div>
    </div>`;
  }
};
