/* 4e Profile & settings. */
KO.screens.profile = {
  tab: null,
  render() {
    const u = KO.D.user;
    const followCount = Object.values(KO.state.follows).filter(Boolean).length;
    const units = KO.state.units;
    const theme = KO.state.theme;

    const linkRow = (emoji, tint, title, value, nav) => `<div class="set-row" ${nav ? `data-nav="${nav}" style="cursor:pointer"` : ""}>
      ${KO.iconTile(emoji, tint)}
      <div class="label"><div class="t">${title}</div>${value ? `<div class="s">${value}</div>` : ""}</div>
      <span class="chev">›</span>
    </div>`;

    return `
    ${KO.detailHeader({ center: `<span style="font-size:15px;font-weight:800">Profile</span>` })}
    <div class="stack" style="padding:8px var(--pad-x) 24px;gap:20px">
      <div class="row" style="gap:14px">
        <div style="width:58px;height:58px;border-radius:50%;background:var(--pink);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;flex:none">${KO.esc(u.initials)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:19px;font-weight:900">${KO.esc(u.name)}</div>
          <div style="font-size:12.5px;color:var(--muted-2)">${KO.esc(u.email)} · ${followCount} following</div>
        </div>
        <span style="font-size:13px;font-weight:700;color:var(--green-dark);cursor:pointer">Edit</span>
      </div>

      <div>
        <div class="section-label">Time &amp; place</div>
        <div style="margin-top:4px">
          ${linkRow("🌍", "blue", "Home timezone", u.homeTz)}
          ${linkRow("📺", "cyan", "TV listings country", u.country)}
          <div class="set-row">
            ${KO.iconTile("📏", "orange")}
            <div class="label"><div class="t">Distances</div></div>
            <div class="seg">
              <button class="${units === "mi" ? "on" : ""}" data-units="mi">mi</button>
              <button class="${units === "km" ? "on" : ""}" data-units="km">km</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="section-label">App</div>
        <div style="margin-top:4px">
          ${linkRow("🔔", "green", "Notifications", "Alerts, quiet hours, how we reach you", "#/alerts/settings")}
          <div class="set-row">
            ${KO.iconTile("🎨", "pink")}
            <div class="label"><div class="t">Theme</div></div>
            <div class="seg">
              <button class="${theme === "system" ? "on" : ""}" data-theme="system">Auto</button>
              <button class="${theme === "light" ? "on" : ""}" data-theme="light">Light</button>
              <button class="${theme === "dark" ? "on" : ""}" data-theme="dark">Dark</button>
            </div>
          </div>
          <div class="set-row">
            ${KO.iconTile("⭐", "greenSolid")}
            <div class="label"><div class="t">KO Pro</div><div class="s">Calendar sync · unlimited alerts · dual-timezone</div></div>
            <button class="pill pill--green" style="padding:6px 14px">Upgrade</button>
          </div>
        </div>
      </div>

      ${KO.state.signedIn
        ? `<button id="signout" style="align-self:center;border:none;background:none;font-family:inherit;cursor:pointer;font-size:14px;font-weight:700;color:var(--muted)">Sign out</button>`
        : `<button data-nav="#/signin" style="align-self:center;border:none;background:none;font-family:inherit;cursor:pointer;font-size:14px;font-weight:800;color:var(--green-dark)">Sign in to sync across devices →</button>`}
    </div>`;
  },
  mount(el) {
    const rerender = () => { KO.save(); el.innerHTML = KO.screens.profile.render(); KO.screens.profile.mount(el); };
    el.querySelectorAll("[data-units]").forEach((b) => b.addEventListener("click", () => { KO.state.units = b.dataset.units; rerender(); }));
    el.querySelectorAll("[data-theme]").forEach((b) => b.addEventListener("click", () => { KO.state.theme = b.dataset.theme; rerender(); }));
    const so = el.querySelector("#signout");
    if (so) so.addEventListener("click", () => { KO.state.signedIn = false; KO.save(); KO.nav("#/signin"); });
  }
};
