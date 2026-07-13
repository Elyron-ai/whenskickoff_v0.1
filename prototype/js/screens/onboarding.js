/* 1a Onboarding — "Whose kickoff do you care about?" */
KO.screens.onboarding = {
  tab: null,
  render() {
    const chipColor = { football: "var(--green)", nfl: "var(--orange)", rugby: "var(--pink)", cricket: "var(--cyan)", f1: "var(--cyan)", nba: "", tennis: "" };
    const chips = Object.entries(KO.D.sports).map(([id, s]) => {
      const on = !!KO.state.onboardingSports[id];
      return on
        ? `<button class="sport-chip" data-sport="${id}" style="background:${chipColor[id] || "var(--ink)"}">${s.emoji} ${s.name} ✓</button>`
        : `<button class="sport-chip sport-chip--off" data-sport="${id}">${s.emoji} ${s.name}</button>`;
    }).join("");

    const followRow = (teamId) => {
      const t = KO.D.teams[teamId];
      const on = !!KO.state.follows[teamId];
      return `<div class="row" style="gap:12px;min-height:44px;cursor:pointer" data-follow="${teamId}">
        ${KO.crest(teamId, 26, true)}
        <div style="flex:1;font-size:15px;font-weight:600">${KO.esc(t.name)}</div>
        <div style="font-size:13px;font-weight:700;color:${on ? "var(--green-dark)" : "var(--faint)"}">${on ? "Following ✓" : "+ Follow"}</div>
      </div>`;
    };

    return `<div class="stack" style="padding:20px var(--pad-x) 26px;gap:18px">
      <div class="progress"><i class="done"></i><i class="done"></i><i></i></div>
      <div>
        <div style="font-size:var(--fs-h1);font-weight:800;letter-spacing:-.5px;line-height:1.1">Whose kickoff<br>do you care about?</div>
        <div style="font-size:15px;color:var(--muted);margin-top:8px">Pick your sports. We'll do the timezone maths.</div>
      </div>
      <div class="row" style="flex-wrap:wrap;gap:10px">${chips}</div>
      <div class="hr" style="padding-top:16px">
        <div class="section-label">Follow a few teams</div>
        <div class="stack" style="gap:10px;margin-top:12px">
          ${followRow("chelsea")}${followRow("chiefs")}${followRow("engrug")}
        </div>
      </div>
      <div class="row" style="background:var(--tint-green);border-radius:var(--r-card-sm);padding:14px 16px;gap:12px">
        <div style="width:34px;height:34px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;flex:none">📍</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:700">Allow location</div>
          <div style="font-size:12.5px;color:var(--muted)">For local TV channels &amp; pubs showing the game</div>
        </div>
        <button id="ob-allow" style="border:none;background:none;font-family:inherit;font-size:13px;font-weight:700;color:var(--green-dark);cursor:pointer;min-height:44px">Allow</button>
      </div>
      <button class="btn btn--primary" id="ob-go">Right, let's go →</button>
    </div>`;
  },
  mount(el) {
    el.querySelectorAll("[data-sport]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.dataset.sport;
        KO.state.onboardingSports[id] = !KO.state.onboardingSports[id];
        KO.save();
        el.innerHTML = KO.screens.onboarding.render();
        KO.screens.onboarding.mount(el);
      })
    );
    el.querySelectorAll("[data-follow]").forEach((r) =>
      r.addEventListener("click", () => {
        const id = r.dataset.follow;
        KO.state.follows[id] = !KO.state.follows[id];
        KO.save();
        el.innerHTML = KO.screens.onboarding.render();
        KO.screens.onboarding.mount(el);
      })
    );
    el.querySelector("#ob-allow").addEventListener("click", (e) => {
      e.target.textContent = "Allowed ✓";
    });
    el.querySelector("#ob-go").addEventListener("click", () => {
      KO.state.onboarded = true;
      KO.save();
      KO.nav("#/home");
    });
  }
};
