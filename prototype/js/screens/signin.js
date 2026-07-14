/* 4f Sign in — skippable, gates cross-device persistence. */
KO.screens.signin = {
  tab: null,
  render() {
    return `<div style="flex:1;display:flex;flex-direction:column;background:radial-gradient(circle at 50% 12%, rgba(3,189,109,.12), transparent 42%)">
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px var(--pad-x);text-align:center;gap:8px">
        <div style="width:76px;height:76px;border-radius:20px;background:var(--green);display:flex;align-items:center;justify-content:center;margin-bottom:8px">${KO.logoBubble(52, "#fff", "var(--green)")}</div>
        <div style="font-size:26px;font-weight:900;letter-spacing:-.5px;line-height:1.12">Never miss kickoff.<br>On any of your screens.</div>
        <div style="font-size:14px;color:var(--muted);max-width:280px">Sign in to keep your teams, reminders and timezone in sync across web and mobile.</div>
      </div>
      <div class="stack" style="padding:0 var(--pad-x) 8px;gap:10px">
        <button class="btn" id="si-apple" style="background:var(--ink);color:#fff"> Continue with Apple</button>
        <button class="btn btn--outline-green" id="si-google" style="padding:16px;font-size:16px;border-color:var(--border-input);color:var(--ink)">Continue with Google</button>
        <button class="btn btn--outline-green" id="si-email" style="padding:16px;font-size:16px;border-color:var(--border-input);color:var(--ink)">Continue with email</button>
        <button data-nav="#/home" style="align-self:center;border:none;background:none;font-family:inherit;cursor:pointer;font-size:14px;font-weight:800;color:var(--green-dark);padding:10px">Just browsing? Skip for now →</button>
      </div>
      <div style="padding:8px var(--pad-x) 24px;text-align:center;font-size:11px;color:var(--faint);line-height:1.5">
        By continuing you agree to our Terms &amp; Privacy Policy.<br>Venue data powered by <b style="color:var(--pink)">Favored</b>.
      </div>
    </div>`;
  },
  mount(el) {
    ["si-apple", "si-google", "si-email"].forEach((id) => {
      const b = el.querySelector("#" + id);
      if (b) b.addEventListener("click", () => { KO.state.signedIn = true; KO.save(); KO.nav("#/home"); });
    });
  }
};
