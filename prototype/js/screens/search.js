/* 1g Search — teams, comps, global kickoffs. */
KO.screens.search = {
  tab: "search",
  query: "world cup final",
  scope: "all",
  results() {
    const q = KO.screens.search.query.trim().toLowerCase();
    const scope = KO.screens.search.scope;
    const final = KO.D.matches.find((m) => m.id === "wc-final");

    const matchesHero = q && "world cup final 2026 fifa".split(" ").some((w) => q.includes(w)) && (scope === "all" || scope === "matches");
    const hero = matchesHero ? `
      <div class="hero" style="padding:16px 18px">
        <div style="font-size:12px;font-weight:800;letter-spacing:.08em;color:rgba(255,255,255,.9)">🏆 FIFA WORLD CUP · FINAL</div>
        <div style="font-size:19px;font-weight:900;margin-top:6px">${KO.fmtDayLong(final.kickoffUtc)} · ${KO.fmtTime(final.kickoffUtc)} your time</div>
        <div style="font-size:12.5px;color:rgba(255,255,255,.7);margin-top:4px">${KO.esc(final.venueNote)} · 20:00 UTC kickoff ➝ ${KO.fmtTime(final.kickoffUtc)} ${KO.esc(KO.activeTzLabel())}</div>
        <div class="row" style="gap:8px;margin-top:12px">
          <button style="flex:1;background:rgba(255,255,255,.15);color:#fff;border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-pill);padding:9px;font-size:12.5px;font-weight:800" data-bell="wc-final" data-on-text="✓ Reminder on" data-off-text="🔔 Remind me">${KO.state.bells["wc-final"] ? "✓ Reminder on" : "🔔 Remind me"}</button>
          <button style="flex:1;background:#fff;color:var(--green-dark);border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-pill);padding:9px;font-size:12.5px;font-weight:800" data-nav="#/nearby">🥂 Where to watch</button>
        </div>
      </div>` : "";

    const comps = (scope === "all" || scope === "competitions")
      ? KO.D.competitions.filter((c) => !q || c.name.toLowerCase().includes(q) || q.split(" ").some((w) => w.length > 2 && c.name.toLowerCase().includes(w)))
      : [];
    const compRows = comps.map((c) => `
      <div class="row" style="gap:12px;min-height:44px;cursor:pointer" data-nav="#/competition/${c.id}">
        <div style="width:38px;height:38px;border-radius:11px;background:${c.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;flex:none">${c.emoji}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:15px;font-weight:700">${KO.esc(c.name)}</div>
          <div style="font-size:12px;color:var(--muted-2)">${KO.esc(c.meta)}</div>
        </div>
        <span style="color:rgba(0,0,0,.3)">›</span>
      </div>`).join("");

    const teams = (scope === "all" || scope === "teams")
      ? Object.entries(KO.D.teams).filter(([, t]) => q && t.name.toLowerCase().includes(q)).slice(0, 3)
      : [];
    const teamRows = teams.map(([id, t]) => `
      <div class="row" style="gap:12px;min-height:44px${KO.D.teamDetail[id] ? ";cursor:pointer" : ""}"${KO.D.teamDetail[id] ? ` data-nav="#/team/${id}"` : ""}>
        ${KO.crest(id, 26, true)}
        <div style="flex:1;font-size:15px;font-weight:700">${KO.esc(t.name)}</div>
        <span style="font-size:13px;font-weight:700;color:${KO.state.follows[id] ? "var(--green-dark)" : "var(--faint)"}">${KO.state.follows[id] ? "Following ✓" : "+ Follow"}</span>
      </div>`).join("");

    return `${hero}
      ${teamRows ? `<div class="section-label">Teams</div>${teamRows}` : ""}
      ${compRows ? `<div class="section-label">Competitions</div>${compRows}` : ""}
      ${!hero && !compRows && !teamRows ? `<div style="font-size:13.5px;color:var(--muted)">No luck — try a team, competition or “world cup final”.</div>` : ""}
      <div class="section-label">Popular right now</div>
      <div class="row" style="flex-wrap:wrap;gap:8px">
        ${["England fixtures", "F1 British GP", "The Ashes", "NBA Finals"].map((p) => `<button class="pill pill--outline" data-suggest="${p}">${p}</button>`).join("")}
      </div>`;
  },
  render() {
    const scope = KO.screens.search.scope;
    const chip = (id, label) => `<button class="pill ${scope === id ? "pill--dark" : "pill--outline"}" data-scope="${id}">${label}</button>`;
    return `<div class="screen-pad">
      ${KO.appHeader({ title: "Search" })}
      <div class="search-input" style="margin-top:14px">
        <span>🔍</span>
        <input id="q" type="text" value="${KO.esc(KO.screens.search.query)}" placeholder="Team, match or competition" aria-label="Search">
        <span id="q-clear" style="color:rgba(0,0,0,.35);cursor:pointer">✕</span>
      </div>
      <div class="chip-row" style="margin-top:12px">
        ${chip("all", "All")}${chip("matches", "Matches")}${chip("teams", "Teams")}${chip("competitions", "Competitions")}
      </div>
    </div>
    <div id="search-results" class="stack" style="padding:18px var(--pad-x) 24px;gap:14px">${KO.screens.search.results()}</div>`;
  },
  mount(el) {
    const self = KO.screens.search;
    const input = el.querySelector("#q");
    const results = el.querySelector("#search-results");
    const rebind = () => {
      results.querySelectorAll("[data-suggest]").forEach((b) =>
        b.addEventListener("click", () => {
          self.query = b.dataset.suggest;
          input.value = self.query;
          update();
        })
      );
    };
    const update = () => { results.innerHTML = self.results(); rebind(); };
    input.addEventListener("input", () => { self.query = input.value; update(); });
    el.querySelector("#q-clear").addEventListener("click", () => {
      input.value = "";
      self.query = "";
      update();
      input.focus();
    });
    el.querySelectorAll("[data-scope]").forEach((b) =>
      b.addEventListener("click", () => {
        self.scope = b.dataset.scope;
        el.innerHTML = self.render();
        self.mount(el);
      })
    );
    rebind();
  }
};
