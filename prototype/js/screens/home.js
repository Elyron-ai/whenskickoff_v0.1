/* 1b Home — today's kickoffs, your timezone. */
KO.screens.home = {
  tab: "home",
  render() {
    const f = KO.state.sportFilter;
    const live = KO.D.matches.filter((m) => m.status.phase === "live");
    const upcoming = KO.D.matches.filter((m) => m.status.phase === "upcoming" && m.id !== "wc-final");
    const visible = (list) => f === "all" ? list : list.filter((m) => m.sport === f);
    const count = live.length + upcoming.length;

    const filterChip = (id, label, cls) => {
      const active = f === id;
      return `<button class="pill ${active ? "pill--dark" : cls}" data-filter="${id}">${label}</button>`;
    };

    return `<div class="screen-pad">
      <div class="row" style="justify-content:space-between;gap:8px">
        ${KO.wordmark(21)}
        <div class="row" style="gap:7px;flex:none">
          <div class="tz-wrap">
            <button class="tz-pill" id="tz-pill" title="See kickoff times in another city — the expat view">${KO.activeTzFlag()} ${KO.esc(KO.activeTzLabel())} ▾</button>
            <div class="tz-menu" id="tz-menu" hidden>
              <button class="tz-item${KO.state.tzIndex === -1 ? " active" : ""}" data-tz-index="-1"><span class="flag">🌐</span>Your time${KO.state.tzIndex === -1 ? `<span class="check">✓</span>` : ""}</button>
              ${KO.D.tzCycle.map((c, i) =>
                `<button class="tz-item${KO.state.tzIndex === i ? " active" : ""}" data-tz-index="${i}"><span class="flag">${c.flag}</span>${c.label}${KO.state.tzIndex === i ? `<span class="check">✓</span>` : ""}</button>`
              ).join("")}
            </div>
          </div>
          <div style="width:32px;height:32px;border-radius:50%;background:var(--pink);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex:none">${KO.D.user.initials}</div>
        </div>
      </div>
      <div class="screen-sub">${KO.esc(KO.todayLine())} · ${count} kickoffs today</div>
      <div class="chip-row">
        ${filterChip("all", "All", "pill--outline")}
        ${filterChip("football", "⚽ Football", "pill--green")}
        ${filterChip("nfl", "🏈 NFL", "pill--orange")}
        ${filterChip("cricket", "🏏 Cricket", "pill--cyan")}
      </div>
    </div>
    <div class="stack" style="padding:18px var(--pad-x) 20px;gap:14px">
      ${visible(live).map(KO.liveCard).join("")}
      <div class="section-label">Up next</div>
      ${visible(upcoming).map(KO.matchRow).join("") || `<div style="font-size:13.5px;color:var(--muted);padding:8px 2px">Nothing in this sport today. Big day tomorrow though.</div>`}
    </div>`;
  },
  mount(el) {
    el.querySelectorAll("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        KO.state.sportFilter = b.dataset.filter;
        KO.save();
        el.innerHTML = KO.screens.home.render();
        KO.screens.home.mount(el);
      })
    );

    // Timezone dropdown: pill toggles the menu; first click anywhere after opening closes it.
    const pill = el.querySelector("#tz-pill");
    const menu = el.querySelector("#tz-menu");
    const close = () => { menu.hidden = true; document.removeEventListener("click", close); };
    pill.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.hidden) {
        menu.hidden = false;
        setTimeout(() => document.addEventListener("click", close), 0);
      } else {
        close();
      }
    });
    menu.querySelectorAll("[data-tz-index]").forEach((b) =>
      b.addEventListener("click", () => {
        KO.state.tzIndex = parseInt(b.dataset.tzIndex, 10);
        KO.save();
        el.innerHTML = KO.screens.home.render();
        KO.screens.home.mount(el);
      })
    );
  }
};
