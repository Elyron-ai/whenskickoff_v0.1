/* 1c Match detail — kickoff hero, channels, where to watch out. */
KO.screens.match = {
  tab: null,
  render(id) {
    const m = KO.D.matches.find((x) => x.id === id) || KO.D.matches[1];
    const live = m.status.phase === "live";
    const remindOn = !!KO.state.bells[m.id];
    const showingVenues = KO.D.venues.filter((v) => v.showing.some((s) => s.matchId === m.id));

    const heroTeams = m.home
      ? `<div class="row" style="justify-content:space-between;align-items:center">
          <div style="flex:1">
            <div class="crest-circle">${KO.crest(m.home, 36)}</div>
            <div style="font-size:15px;font-weight:800;margin-top:6px;text-align:center">${KO.esc(KO.D.teams[m.home].name)}</div>
          </div>
          <div style="text-align:center;padding:0 6px">
            ${live
              ? `<div class="big-time">${m.status.score[0]} – ${m.status.score[1]}</div>
                 <div style="font-size:12px;font-weight:700;opacity:.85">LIVE · ${m.status.minute}′</div>`
              : `<div class="big-time">${KO.fmtTime(m.kickoffUtc)}</div>
                 <div style="font-size:12px;font-weight:700;opacity:.85">${KO.fmtDay(m.kickoffUtc)} · ${KO.esc(KO.activeTzLabel()).toUpperCase()}</div>
                 <div id="countdown" style="font-size:11.5px;opacity:.75;margin-top:2px">${KO.fmtCountdown(m.kickoffUtc)}</div>`}
          </div>
          <div style="flex:1">
            <div class="crest-circle">${KO.crest(m.away, 36)}</div>
            <div style="font-size:15px;font-weight:800;margin-top:6px;text-align:center">${KO.esc(KO.D.teams[m.away].name)}</div>
          </div>
        </div>`
      : `<div style="text-align:center">
          <div style="font-size:34px">🏆</div>
          <div style="font-size:19px;font-weight:900;margin-top:4px">${KO.esc(m.title)}</div>
          <div class="big-time" style="margin-top:8px">${KO.fmtTime(m.kickoffUtc)}</div>
          <div style="font-size:12px;font-weight:700;opacity:.85">${KO.fmtDay(m.kickoffUtc)} · ${KO.esc(KO.activeTzLabel()).toUpperCase()}</div>
          <div id="countdown" style="font-size:11.5px;opacity:.75;margin-top:2px">${KO.fmtCountdown(m.kickoffUtc)}</div>
          ${m.venueNote ? `<div style="font-size:11.5px;opacity:.75;margin-top:2px">${KO.esc(m.venueNote)}</div>` : ""}
        </div>`;

    return `
    <div class="nav-header">
      <button class="back" data-back>←</button>
      <span class="ctx" style="color:${KO.compTagColor(m.sport)}">${KO.D.sports[m.sport].emoji} ${KO.esc(m.comp).toUpperCase()}</span>
      <span style="font-size:18px">↑</span>
    </div>
    <div class="hero" style="margin:0 var(--pad-x)">
      ${heroTeams}
      ${live ? "" : `<button class="btn btn--white-pill" id="remind" style="margin-top:14px">${remindOn ? "✓ Reminder set · 15 min before" : "🔔 Remind me 15 min before"}</button>`}
    </div>
    <div class="stack" style="padding:20px var(--pad-x);gap:18px">
      <div>
        <div class="section-label">📺 On the box · United Kingdom</div>
        <div class="stack" style="gap:8px;margin-top:10px">${m.channels.map(KO.channelRow).join("")}</div>
      </div>
      <div>
        <div class="row" style="justify-content:space-between;align-items:baseline">
          <div class="section-label">🥂 Watching it out?</div>
          ${KO.favoredNote()}
        </div>
        ${showingVenues.length
          ? `<div class="scroll-x" style="margin-top:10px">${showingVenues.map((v) => KO.venueMini(v, m.id)).join("")}</div>
             <button class="btn btn--outline-green" style="margin-top:10px" data-nav="#/nearby">See all ${m.pubCount} pubs showing this →</button>`
          : `<div style="font-size:13.5px;color:var(--muted);margin-top:10px">${m.pubCount} pubs near you have this one on — <span style="color:var(--green-dark);font-weight:700;cursor:pointer" data-nav="#/nearby">browse nearby →</span></div>`}
      </div>
    </div>`;
  },
  mount(el, id) {
    const m = KO.D.matches.find((x) => x.id === id) || KO.D.matches[1];
    const cd = el.querySelector("#countdown");
    if (cd) KO.every(1000, () => { cd.textContent = KO.fmtCountdown(m.kickoffUtc); });
    const remind = el.querySelector("#remind");
    if (remind) remind.addEventListener("click", () => {
      KO.state.bells[m.id] = !KO.state.bells[m.id];
      KO.save();
      remind.textContent = KO.state.bells[m.id] ? "✓ Reminder set · 15 min before" : "🔔 Remind me 15 min before";
    });
  }
};
