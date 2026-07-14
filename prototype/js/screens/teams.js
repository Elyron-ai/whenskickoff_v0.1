/* 1h My Teams — follows, reminders & alerts. */
KO.screens.teams = {
  tab: "teams",
  render() {
    KO.state.timing = KO.state.timing || {};

    const card = (follow, i) => {
      const t = KO.D.teams[follow.teamId];
      const on = !!KO.state.follows[follow.teamId];
      const s = KO.D.sports[t.sport];
      const timing = KO.state.timing[follow.teamId] || follow.timing;

      const timingChips = i === 0 ? `
        <div class="row" style="gap:8px;margin-top:12px;font-size:11.5px;font-weight:700;flex-wrap:wrap">
          ${["15 min before", "Kickoff", "Full-time score"].map((opt) =>
            `<button data-timing="${follow.teamId}|${opt}" style="border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-tag);padding:5px 9px;font-size:11.5px;font-weight:700;${opt === timing ? "background:var(--ink);color:#fff" : "background:var(--tint-gray);color:var(--muted)"}">${opt}</button>`
          ).join("")}
        </div>` : "";

      const nudge = follow.teamId === "chiefs" ? `
        <div class="late-note" style="margin-top:12px">🦉 <b>Late one tonight.</b> Kickoff ${KO.fmtTime(KO.D.matches.find((m) => m.id === "kc-buf").kickoffUtc)} your time — ${KO.D.venues.filter((v) => v.lateLicence).length} pubs near you have a late licence. <span style="color:var(--green-dark);font-weight:700;cursor:pointer" data-nav="#/nearby">See them →</span></div>` : "";

      const hasPage = !!KO.D.teamDetail[follow.teamId];
      return `<div class="card card--pad">
        <div class="row" style="gap:12px">
          <div class="row" style="gap:12px;flex:1;min-width:0${hasPage ? ";cursor:pointer" : ""}"${hasPage ? ` data-nav="#/team/${follow.teamId}"` : ""}>
            ${KO.crest(follow.teamId, 30, true)}
            <div style="min-width:0">
              <div style="font-size:16px;font-weight:800">${KO.esc(t.name)}</div>
              <div style="font-size:12px;color:var(--muted-2)">${s.emoji} ${t.sport === "f1" ? "" : KO.esc(s.name) + " · "}next: ${KO.esc(follow.next)}</div>
            </div>
          </div>
          <button data-alerts="${follow.teamId}" style="border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-pill);padding:5px 11px;font-size:11.5px;font-weight:800;flex:none;${on ? "background:var(--tint-green);color:var(--green-dark)" : "background:var(--tint-gray);color:rgba(0,0,0,.45)"}">${on ? "🔔 ON" : "🔕 OFF"}</button>
        </div>
        ${timingChips}${nudge}
      </div>`;
    };

    return `<div class="screen-pad">
      ${KO.appHeader({ title: "My Teams", right: `<button class="icon-btn" data-nav="#/alerts" aria-label="Alerts" style="font-size:19px">🔔</button>` })}
      <div class="screen-sub">Your lot. We'll nudge you before every kickoff.</div>
    </div>
    <div class="stack" style="padding:18px var(--pad-x) 24px;gap:14px">
      ${KO.D.user.follows.map(card).join("")}
      <button class="dashed-row" data-nav="#/search">+ Follow another team or competition</button>
    </div>`;
  },
  mount(el) {
    el.querySelectorAll("[data-alerts]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.dataset.alerts;
        KO.state.follows[id] = !KO.state.follows[id];
        KO.save();
        el.innerHTML = KO.screens.teams.render();
        KO.screens.teams.mount(el);
      })
    );
    el.querySelectorAll("[data-timing]").forEach((b) =>
      b.addEventListener("click", () => {
        const [teamId, opt] = b.dataset.timing.split("|");
        KO.state.timing = KO.state.timing || {};
        KO.state.timing[teamId] = opt;
        KO.save();
        el.innerHTML = KO.screens.teams.render();
        KO.screens.teams.mount(el);
      })
    );
  }
};
