/* 1f Map view — who's showing what. */
KO.screens.map = {
  tab: "nearby",
  selected: "fullback",
  render() {
    const target = KO.D.matches.find((m) => m.id === "liv-mci");
    const pins = KO.D.venues.map((v) => {
      const showsTarget = v.showing.some((s) => s.matchId === target.id);
      const showsAnything = v.showing.length > 0;
      let cls, label;
      if (v.type === "restaurant" && showsAnything) { cls = "map-pin--food"; label = `🍽 ${v.rating}`; }
      else if (showsTarget) { cls = "map-pin--pub"; label = `🥂 ${v.rating}`; }
      else if (showsAnything) { cls = "map-pin--pub"; label = `🥂 ${v.rating}`; }
      else { cls = "map-pin--off"; label = "not showing"; }
      return `<button class="map-pin ${cls}" style="left:${v.mapPos.x}%;top:${v.mapPos.y}%" data-pin="${v.id}">${label}</button>`;
    }).join("");

    const v = KO.D.venues.find((x) => x.id === KO.screens.map.selected) || KO.D.venues[0];
    const s = v.showing[0];
    const note = s ? s.note.toLowerCase() : "quiet tonight";

    return `
    <div class="nav-header">
      <button class="back" data-back>←</button>
      <div class="pill pill--dark">Showing: ⚽ LIV v MCI · ${KO.fmtTime(target.kickoffUtc)}</div>
      <span style="font-size:18px">⚙</span>
    </div>
    <div class="map-canvas">
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(0,0,0,.3);font:11px ui-monospace,Menlo,monospace">map tiles — placeholder</div>
      ${pins}
      <div class="map-you" style="left:42%;top:44%"></div>
      <div class="map-card" data-nav="#/venue/${v.id}">
        <div class="photo photo--img" style="width:56px;height:56px;border-radius:12px;flex:none;background-image:${v.photo}"></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14.5px;font-weight:800">${KO.esc(v.name)} <span style="color:var(--pink)">${v.rating}</span></div>
          <div style="font-size:11.5px;color:var(--muted)">${v.distance} · ${KO.esc(note)} · powered by <b style="color:var(--pink)">Favored</b></div>
        </div>
        <span style="font-size:18px;color:rgba(0,0,0,.35)">›</span>
      </div>
    </div>`;
  },
  mount(el) {
    el.querySelectorAll("[data-pin]").forEach((p) =>
      p.addEventListener("click", () => {
        KO.screens.map.selected = p.dataset.pin;
        el.innerHTML = KO.screens.map.render();
        KO.screens.map.mount(el);
      })
    );
  }
};
