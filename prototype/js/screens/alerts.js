/* 4c Notification centre (#/alerts) + 4d Notification settings (#/alerts/settings). */
KO.screens.alerts = {
  get tab() { return location.hash.indexOf("/settings") >= 0 ? null : "teams"; },

  render(param) {
    return param === "settings" ? KO.screens.alerts.renderSettings() : KO.screens.alerts.renderCentre();
  },

  /* ---- 4c centre ---- */
  renderCentre() {
    const n = KO.D.notifications;
    const row = (a) => `<div class="alert-row${a.unread ? " unread" : ""}"${a.matchId ? ` data-nav="#/match/${a.matchId}"` : ""}>
      ${KO.iconTile(a.icon, a.tint)}
      <div style="flex:1;min-width:0">
        <div style="font-size:14.5px;font-weight:700">${KO.esc(a.title)}</div>
        <div style="font-size:12px;color:var(--muted-2)">${KO.esc(a.meta)}</div>
      </div>
      ${a.unread ? `<span class="unread-dot"></span>` : ""}
    </div>`;
    const queuedRow = (a) => `<div class="alert-row queued">
      ${KO.iconTile(a.icon, a.tint)}
      <div style="flex:1;min-width:0">
        <div style="font-size:14.5px;font-weight:700">${KO.esc(a.title)}</div>
        <div style="font-size:12px;color:var(--muted-2)">${KO.esc(a.meta)}</div>
      </div>
      <span data-nav="#/alerts/settings" style="font-size:12.5px;font-weight:700;color:var(--green-dark);cursor:pointer">Edit</span>
    </div>`;

    return `<div class="screen-pad">
      <div class="app-header-row">
        <div class="row" style="gap:9px;min-width:0">${KO.logoBubble(28)}<div class="app-header__title">Alerts</div></div>
        <span data-nav="#/alerts/settings" style="font-size:13px;font-weight:700;color:var(--green-dark);cursor:pointer">⚙ Settings</span>
      </div>
    </div>
    <div class="stack" style="padding:16px var(--pad-x) 24px;gap:14px">
      <div class="section-label">Today</div>
      <div class="stack" style="gap:8px">${n.today.map(row).join("")}</div>
      <div class="section-label" style="margin-top:6px">Queued up</div>
      <div class="stack" style="gap:8px">${n.queued.map(queuedRow).join("")}</div>
    </div>`;
  },

  /* ---- 4d settings ---- */
  renderSettings() {
    const s = KO.state;
    const defChip = (opt) => `<button class="pill ${s.alertsDefault[opt] ? "pill--dark" : "pill--outline"}" data-default-alert="${opt}">${s.alertsDefault[opt] ? "✓ " : ""}${opt}</button>`;
    const reachRow = (key, emoji, tint, title, sub, i) => `<div class="set-row"${i ? "" : ' style="border-top:none"'}>
      ${KO.iconTile(emoji, tint)}
      <div class="label"><div class="t">${title}</div><div class="s">${sub}</div></div>
      ${KO.toggle(s.reach[key], ` data-reach="${key}"`)}
    </div>`;

    return `
    ${KO.detailHeader({ center: `<span style="font-size:15px;font-weight:800">Alert settings</span>` })}
    <div class="stack" style="padding:8px var(--pad-x) 24px;gap:20px">
      <div>
        <div class="section-label">Default alerts</div>
        <div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">
          ${defChip("15 min before")}${defChip("Kickoff")}${defChip("Full-time score")}
        </div>
      </div>
      <div>
        <div class="section-label">How we reach you</div>
        <div style="margin-top:4px">
          ${reachRow("push", "🔔", "green", "Push notifications", "On this device", 0)}
          ${reachRow("calendar", "📅", "cyan", "Add to calendar", "A .ics event per reminder — works everywhere", 1)}
          ${reachRow("email", "✉️", "pink", "Email", "A nudge to " + KO.esc(KO.D.user.email), 1)}
        </div>
      </div>
      <div>
        <div class="section-label">Quiet hours</div>
        <div class="card card--pad" style="margin-top:10px">
          <div class="row" style="gap:12px">
            ${KO.iconTile("🌙", "ink")}
            <div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:700">23:00 – 08:00</div><div style="font-size:12px;color:var(--muted-2)">Hold non-urgent alerts overnight</div></div>
            ${KO.toggle(s.quietHours, ' data-quiet="1"')}
          </div>
          <div class="late-note" style="margin-top:12px">🦉 <b>Night-owl exception.</b> Late kickoffs for your teams still buzz through. <span data-nightowl="1" style="color:var(--green-dark);font-weight:700;cursor:pointer">${s.nightOwlException ? "On" : "Off"}</span></div>
        </div>
      </div>
    </div>`;
  },

  mount(el, param) {
    if (param !== "settings") return;
    const rerender = () => { KO.save(); el.innerHTML = KO.screens.alerts.renderSettings(); KO.screens.alerts.mount(el, "settings"); };
    el.querySelectorAll("[data-default-alert]").forEach((b) =>
      b.addEventListener("click", () => { const k = b.dataset.defaultAlert; KO.state.alertsDefault[k] = !KO.state.alertsDefault[k]; rerender(); }));
    el.querySelectorAll("[data-reach]").forEach((t) =>
      t.addEventListener("click", () => { const k = t.dataset.reach; KO.state.reach[k] = !KO.state.reach[k]; rerender(); }));
    el.querySelectorAll("[data-quiet]").forEach((t) =>
      t.addEventListener("click", () => { KO.state.quietHours = !KO.state.quietHours; rerender(); }));
    el.querySelectorAll("[data-nightowl]").forEach((t) =>
      t.addEventListener("click", () => { KO.state.nightOwlException = !KO.state.nightOwlException; rerender(); }));
  }
};
