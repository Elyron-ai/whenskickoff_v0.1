/* 4b Competition hub — tournament mode. */
KO.screens.competition = {
  tab: null,
  activeTab: "Fixtures",
  render(id) {
    id = id && KO.D.competitionDetail[id] ? id : "wc2026";
    const d = KO.D.competitionDetail[id];
    const final = KO.D.matches.find((m) => m.id === d.finalMatchId);
    const flagCircle = (f) => `<div style="width:44px;height:44px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 2px 8px rgba(0,0,0,.12)">${f}</div>`;

    const header = `<div style="background:var(--ink);color:#fff;padding:14px var(--pad-x) 20px">
      <div class="row" style="justify-content:space-between;align-items:center">
        <button class="icon-btn" data-back aria-label="Back" style="color:#fff">←</button>
        <button class="icon-btn" aria-label="Share" style="color:#fff">↑</button>
      </div>
      <div style="font-size:12px;font-weight:800;letter-spacing:.1em;color:var(--cyan);margin-top:6px">${d.modeLabel}</div>
      <div style="font-size:26px;font-weight:900;letter-spacing:-.5px;margin-top:2px">${KO.esc(d.name)}</div>
      <div style="font-size:12.5px;color:rgba(255,255,255,.65);margin-top:2px">${KO.esc(d.meta)}</div>
      <div class="scroll-x" style="margin-top:14px;gap:8px">
        ${d.tabs.map((t) => `<button class="pill" data-ctab="${t}" style="${t === KO.screens.competition.activeTab ? "background:var(--green);color:#fff" : "background:rgba(255,255,255,.14);color:#fff"}">${t}</button>`).join("")}
      </div>
    </div>`;

    const finalHero = `<div class="hero" style="margin:0 var(--pad-x)">
      <div style="font-size:12px;font-weight:800;letter-spacing:.08em;color:rgba(255,255,255,.9)">🏆 THE FINAL</div>
      <div class="row" style="justify-content:space-between;align-items:center;margin-top:12px">
        ${flagCircle("🏴󠁧󠁢󠁥󠁮󠁧󠁿")}
        <div style="text-align:center">
          <div style="font-size:30px;font-weight:900;letter-spacing:-1px">${KO.fmtTime(final.kickoffUtc)}</div>
          <div style="font-size:11.5px;font-weight:700;opacity:.85">${KO.fmtDay(final.kickoffUtc)} · ${KO.esc(KO.activeTzLabel()).toUpperCase()}</div>
        </div>
        ${flagCircle("🇫🇷")}
      </div>
      <div class="row" style="gap:8px;margin-top:14px">
        <button style="flex:1;background:rgba(255,255,255,.15);color:#fff;border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-pill);padding:10px;font-size:13px;font-weight:800" data-bell="wc-final" data-on-text="✓ Reminder on" data-off-text="🔔 Remind me">${KO.state.bells["wc-final"] ? "✓ Reminder on" : "🔔 Remind me"}</button>
        <button style="flex:1;background:#fff;color:var(--green-dark);border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-pill);padding:10px;font-size:13px;font-weight:800" data-nav="#/nearby">🥂 Where to watch</button>
      </div>
    </div>`;

    const fixtureRow = (f, i) => `<div class="row" style="gap:12px;padding:12px 0;${i ? "border-top:1px solid var(--hairline)" : ""}">
      <div style="min-width:52px;text-align:center">
        <div style="font-size:15px;font-weight:900">${KO.fmtTime(f.kickoffUtc)}</div>
        <div style="font-size:10.5px;font-weight:700;color:var(--muted-2)">${KO.fmtDay(f.kickoffUtc).slice(0, 3)}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14.5px;font-weight:700">${f.a} ${KO.esc(f.title)} ${f.b}</div>
        <div style="font-size:12px;color:var(--muted-2)">📺 ${KO.esc(f.channel)}</div>
      </div>
    </div>`;

    const body = KO.screens.competition.activeTab === "Fixtures"
      ? `${finalHero}
        <div class="stack" style="padding:20px var(--pad-x) 4px;gap:0">
          <div class="section-label" style="margin-bottom:4px">Semi-finals</div>
          ${d.fixtures.map(fixtureRow).join("")}
        </div>
        <div style="margin:14px var(--pad-x) 24px;background:var(--tint-cyan);border-radius:var(--r-card-sm);padding:14px 16px" class="row">
          ${KO.iconTile("📅", "cyan")}
          <div style="flex:1;min-width:0;margin-left:12px">
            <div style="font-size:14px;font-weight:800">Add all to calendar</div>
            <div style="font-size:12px;color:var(--muted-2)">Every match in your timezone — one tap</div>
          </div>
          <span style="font-size:13px;font-weight:800;color:var(--cyan-dark)">Add</span>
        </div>`
      : `<div style="padding:40px var(--pad-x);text-align:center;color:var(--muted)">
          <div style="font-size:34px">${KO.screens.competition.activeTab === "Groups" ? "🗂" : KO.screens.competition.activeTab === "Knockouts" ? "🏆" : "⭐"}</div>
          <div style="font-size:14px;margin-top:8px">${KO.esc(KO.screens.competition.activeTab)} view — coming to the prototype</div>
        </div>`;

    return header + body;
  },
  mount(el, id) {
    el.querySelectorAll("[data-ctab]").forEach((b) =>
      b.addEventListener("click", () => {
        KO.screens.competition.activeTab = b.dataset.ctab;
        el.innerHTML = KO.screens.competition.render(id);
        KO.screens.competition.mount(el, id);
      })
    );
  }
};
