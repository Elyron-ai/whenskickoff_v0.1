/* 4a Team page — a followed team's fixtures, form and next match. */
KO.screens.team = {
  tab: null,
  render(id) {
    id = id && KO.D.teamDetail[id] ? id : "chelsea";
    const t = KO.D.teams[id];
    const d = KO.D.teamDetail[id];
    const following = !!KO.state.follows[id];
    const opp = (o) => KO.D.teams[o].nick || KO.D.teams[o].name;
    const vs = (f) => `${f.home ? "vs" : "@"} ${KO.esc(opp(f.oppId))}`;
    const remindKey = "team-next-" + id;

    const nextHero = `<div class="hero" style="margin:0 var(--pad-x)">
      <div style="font-size:12px;font-weight:800;letter-spacing:.08em;color:rgba(255,255,255,.9)">NEXT UP</div>
      <div class="row" style="gap:10px;margin-top:8px">
        <div style="width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;padding:6px;flex:none">${KO.crest(d.next.oppId, 26)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:16px;font-weight:800">${KO.esc(t.nick || t.name)} ${vs(d.next)}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.8)">📺 ${KO.esc(d.next.channel)} · 🥂 ${d.next.pubCount} pubs nearby</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:22px;font-weight:900;letter-spacing:-.5px">${KO.fmtTime(d.next.kickoffUtc)}</div>
          <div style="font-size:11px;font-weight:700;opacity:.85">${KO.fmtDay(d.next.kickoffUtc)}</div>
        </div>
      </div>
      <div class="row" style="gap:8px;margin-top:14px">
        <button style="flex:1;background:rgba(255,255,255,.15);color:#fff;border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-pill);padding:10px;font-size:13px;font-weight:800" data-bell="${remindKey}" data-on-text="✓ Reminder on" data-off-text="🔔 Remind me">${KO.state.bells[remindKey] ? "✓ Reminder on" : "🔔 Remind me"}</button>
        <button style="flex:1;background:#fff;color:var(--green-dark);border:none;font-family:inherit;cursor:pointer;border-radius:var(--r-pill);padding:10px;font-size:13px;font-weight:800" data-nav="#/nearby">🥂 Where to watch</button>
      </div>
    </div>`;

    const fixtureRow = (f, i) => `<div class="row" style="gap:12px;padding:12px 0;${i ? "border-top:1px solid var(--hairline)" : ""}">
      <div style="min-width:52px;text-align:center">
        <div style="font-size:15px;font-weight:900">${KO.fmtTime(f.kickoffUtc)}</div>
        <div style="font-size:10.5px;font-weight:700;color:var(--muted-2)">${KO.fmtDay(f.kickoffUtc).slice(0, 3)}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14.5px;font-weight:700">${KO.esc(vs(f))}</div>
        <div style="font-size:12px;color:var(--muted-2)">📺 ${KO.esc(f.channel)}</div>
      </div>
      <button class="bell${KO.state.bells["tf-" + id + "-" + i] ? " on" : ""}" data-bell="tf-${id}-${i}" aria-label="Reminder">🔔</button>
    </div>`;

    const resultTile = (r) => `<div class="result-tile">
      ${KO.formLetter(r.outcome)}
      <div style="font-size:13px;font-weight:800;margin-top:5px">${r.score[0]}–${r.score[1]}</div>
      <div style="font-size:10.5px;color:var(--muted-2);margin-top:1px">${r.home ? "v" : "@"} ${KO.esc(KO.D.teams[r.oppId].short)}</div>
    </div>`;

    return `
    ${KO.detailHeader({
      center: `<span class="ctx" style="color:${KO.compTagColor(t.sport)}">${d.compChip.label}</span>`,
      right: `<button class="icon-btn" aria-label="Share">↑</button>`
    })}
    <div style="margin:0 var(--pad-x)">
      <div style="background:linear-gradient(120deg,rgba(10,60,235,.1),rgba(5,195,240,.08));border-radius:var(--r-card-lg);padding:18px">
        <div class="row" style="gap:14px">
          <div style="width:64px;height:64px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;padding:10px;flex:none;box-shadow:0 4px 14px rgba(10,60,235,.18)">${KO.crest(id, 40)}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:24px;font-weight:900;letter-spacing:-.4px">${KO.esc(t.name)}</div>
            <div style="font-size:12.5px;color:var(--muted);margin-top:2px">${KO.esc(d.position)}</div>
            <div class="row" style="gap:4px;margin-top:8px">${d.form.map(KO.formLetter).join("")}</div>
          </div>
        </div>
        <button class="pill ${following ? "pill--green" : "pill--dark"}" data-toggle-follow="${id}" style="margin-top:14px;width:100%">${following ? "Following ✓" : "+ Follow"}</button>
      </div>
    </div>
    ${nextHero}
    <div class="stack" style="padding:20px var(--pad-x) 24px;gap:18px">
      <div>
        <div class="section-label">Fixtures</div>
        <div style="margin-top:6px">${d.fixtures.map(fixtureRow).join("")}</div>
      </div>
      <div>
        <div class="section-label">Recent results</div>
        <div class="row" style="gap:8px;margin-top:10px">${d.results.map(resultTile).join("")}</div>
      </div>
      <div class="row" style="gap:12px;border:1px solid var(--hairline);border-radius:var(--r-card-sm);padding:12px 14px">
        ${KO.iconTile("🔔", "green")}
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:700">Alerts on for ${KO.esc(t.nick || t.name)}</div>
          <div style="font-size:12px;color:var(--muted-2)">15 min before · full-time score</div>
        </div>
        <span data-nav="#/alerts/settings" style="font-size:13px;font-weight:700;color:var(--green-dark);cursor:pointer">Change</span>
      </div>
    </div>`;
  },
  mount(el, id) {
    el.querySelectorAll("[data-toggle-follow]").forEach((b) =>
      b.addEventListener("click", () => {
        const tid = b.dataset.toggleFollow;
        KO.state.follows[tid] = !KO.state.follows[tid];
        KO.save();
        el.innerHTML = KO.screens.team.render(id);
        KO.screens.team.mount(el, id);
      })
    );
  }
};
