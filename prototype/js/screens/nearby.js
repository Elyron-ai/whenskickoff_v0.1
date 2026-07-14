/* 1d Nearby tab — pubs & food with the game on, powered by Favored. */
KO.screens.nearby = {
  tab: "nearby",
  render() {
    const f = KO.state.nearbyFilter;
    let venues = KO.D.venues;
    if (f === "games") venues = venues.filter((v) => v.showing.length > 0);
    if (f === "food") venues = venues.filter((v) => v.type === "restaurant" || /kitchen|burger|food|roast|bbq/i.test(v.desc + v.amenities.join(" ")));
    if (f === "screen") venues = venues.filter((v) => v.amenities.some((a) => /screen/i.test(a)) && v.showing.length > 0);

    const chip = (id, label) =>
      `<button class="pill ${f === id ? "pill--dark" : "pill--outline"}" data-nfilter="${id}">${label}</button>`;

    return `<div class="screen-pad">
      ${KO.appHeader({ title: "Nearby" })}
      <div class="screen-sub">${KO.esc(KO.D.user.locationLabel)} · pubs, bars &amp; grub with the game on</div>
      <div style="margin-top:3px">${KO.favoredNote()}</div>
      <div class="chip-row">
        ${chip("games", "Showing today's games")}${chip("food", "Food")}${chip("screen", "Big screen")}
      </div>
    </div>
    <div class="stack grow" style="padding:18px var(--pad-x) 20px;gap:14px">
      ${venues.map(KO.venueCard).join("") || `<div style="font-size:13.5px;color:var(--muted)">Nothing matches — loosen a filter?</div>`}
      <button class="float-pill" data-nav="#/map">🗺 Map view</button>
    </div>`;
  },
  mount(el) {
    el.querySelectorAll("[data-nfilter]").forEach((b) =>
      b.addEventListener("click", () => {
        KO.state.nearbyFilter = KO.state.nearbyFilter === b.dataset.nfilter ? "" : b.dataset.nfilter;
        KO.save();
        el.innerHTML = KO.screens.nearby.render();
        KO.screens.nearby.mount(el);
      })
    );
  }
};
