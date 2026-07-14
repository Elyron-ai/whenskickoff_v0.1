/* App spine: state (localStorage), hash router, tab bar, event delegation. */
(function () {
  /* ---------- state ---------- */
  const KEY = "ko_proto_state";
  const defaults = {
    onboarded: false,
    tzIndex: -1, // -1 = viewer's own timezone; >=0 indexes KO_DATA.tzCycle
    bells: { "liv-mci": true, "kc-buf": true },
    follows: { chelsea: true, chiefs: true, f1: false },
    sportFilter: "all",
    nearbyFilter: "games",
    onboardingSports: { football: true, nfl: true, rugby: true, f1: true },
    signedIn: false,
    units: "mi",
    theme: "system",
    alertsDefault: { "15 min before": true, "Kickoff": false, "Full-time score": true },
    reach: { push: true, calendar: true, email: false },
    quietHours: true,
    nightOwlException: true
  };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { /* fresh start */ }
  KO.state = Object.assign({}, defaults, saved,
    { bells: Object.assign({}, defaults.bells, saved.bells || {}),
      follows: Object.assign({}, defaults.follows, saved.follows || {}),
      onboardingSports: Object.assign({}, defaults.onboardingSports, saved.onboardingSports || {}),
      alertsDefault: Object.assign({}, defaults.alertsDefault, saved.alertsDefault || {}),
      reach: Object.assign({}, defaults.reach, saved.reach || {}) });
  KO.save = function () { try { localStorage.setItem(KEY, JSON.stringify(KO.state)); } catch (e) { /* private mode */ } };

  /* ---------- router ---------- */
  const screenEl = document.getElementById("screen");
  const tabbarEl = document.getElementById("tabbar");
  const TABS = [
    { id: "home", label: "Today", ico: "⏱", hash: "#/home" },
    { id: "nearby", label: "Nearby", ico: "🥂", hash: "#/nearby" },
    { id: "search", label: "Search", ico: "🔍", hash: "#/search" },
    { id: "teams", label: "My Teams", ico: "⭐", hash: "#/teams" }
  ];

  KO.nav = function (hash) { location.hash = hash; };

  function parseHash() {
    const h = location.hash.replace(/^#\/?/, "");
    if (!h) return { name: KO.state.onboarded ? "home" : "onboarding", param: null };
    const [name, param] = h.split("/");
    return { name, param: param || null };
  }

  let timers = [];
  KO.every = function (ms, fn) { timers.push(setInterval(fn, ms)); };

  function render() {
    timers.forEach(clearInterval);
    timers = [];
    const { name, param } = parseHash();
    const screen = KO.screens[name] || KO.screens[KO.state.onboarded ? "home" : "onboarding"];
    screenEl.innerHTML = screen.render(param);
    screenEl.scrollTop = 0;
    if (screen.tab) {
      tabbarEl.hidden = false;
      tabbarEl.innerHTML = TABS.map((t) =>
        `<button class="tab${t.id === screen.tab ? " active" : ""}" data-nav="${t.hash}"><span class="ico">${t.ico}</span>${t.label}</button>`
      ).join("");
    } else {
      tabbarEl.hidden = true;
      tabbarEl.innerHTML = "";
    }
    if (screen.mount) screen.mount(screenEl, param);
  }

  /* ---------- delegation ---------- */
  document.addEventListener("click", (e) => {
    const bell = e.target.closest("[data-bell]");
    if (bell) {
      e.stopPropagation();
      e.preventDefault();
      const id = bell.dataset.bell;
      KO.state.bells[id] = !KO.state.bells[id];
      KO.save();
      bell.classList.toggle("on", KO.state.bells[id]);
      if (bell.dataset.onText) bell.textContent = KO.state.bells[id] ? bell.dataset.onText : bell.dataset.offText;
      return;
    }
    const back = e.target.closest("[data-back]");
    if (back) {
      if (history.length > 1) history.back(); else KO.nav("#/home");
      return;
    }
    const nav = e.target.closest("[data-nav]");
    if (nav) KO.nav(nav.dataset.nav);
  });

  /* ---------- status bar clock ---------- */
  const clock = document.getElementById("clock");
  function tickClock() {
    clock.textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  }
  tickClock();
  setInterval(tickClock, 30_000);

  window.addEventListener("hashchange", render);
  render();
})();
