/* WhensKickoff prototype mock data.
   NOTE: club crests are hotlinked from Wikipedia/Wikimedia for PROTOTYPE USE ONLY —
   production requires licensed assets (see docs/04-data-and-licensing.md).
   Kickoff times are computed relative to load time so the demo never looks stale;
   fixtures are illustrative (an NFL game in July is off-season, kept from the designs). */
(function () {
  const now = Date.now();
  const min = 60 * 1000;
  const wiki = (f) => "https://en.wikipedia.org/wiki/Special:FilePath/" + f;
  const commons = (f) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + f;

  // Tomorrow at 01:20 local — the night-owl NFL slot from the designs.
  const lateNight = new Date(now);
  lateNight.setHours(25, 20, 0, 0);

  // Next Sunday 20:00 UTC — the World Cup Final slot (19 July 2026 at build time).
  const finalDate = new Date(now);
  finalDate.setUTCDate(finalDate.getUTCDate() + ((7 - finalDate.getUTCDay()) % 7 || 7));
  finalDate.setUTCHours(20, 0, 0, 0);

  const SPORTS = {
    football: { name: "Football", emoji: "⚽", tint: "green" },
    nfl:      { name: "NFL",      emoji: "🏈", tint: "orange" },
    cricket:  { name: "Cricket",  emoji: "🏏", tint: "cyan" },
    rugby:    { name: "Rugby",    emoji: "🏉", tint: "pink" },
    f1:       { name: "F1",       emoji: "🏎", tint: "cyan" },
    nba:      { name: "NBA",      emoji: "🏀", tint: "gray" },
    tennis:   { name: "Tennis",   emoji: "🎾", tint: "gray" }
  };

  const TEAMS = {
    chelsea:  { name: "Chelsea",            short: "CHE", sport: "football", color: "#034694", crest: wiki("Chelsea_FC.svg") },
    arsenal:  { name: "Arsenal",            short: "ARS", sport: "football", color: "#ef0107", crest: wiki("Arsenal_FC.svg") },
    liverpool:{ name: "Liverpool",          short: "LIV", sport: "football", color: "#c8102e", crest: wiki("Liverpool_FC.svg") },
    mancity:  { name: "Man City",           short: "MCI", sport: "football", color: "#6cabdd", crest: wiki("Manchester_City_FC_badge.svg") },
    spurs:    { name: "Spurs",              short: "TOT", sport: "football", color: "#132257", crest: wiki("Tottenham_Hotspur.svg") },
    chiefs:   { name: "Kansas City Chiefs", nick: "Chiefs", short: "KC",  sport: "nfl", color: "#e31837", crest: wiki("Kansas_City_Chiefs_logo.svg") },
    bills:    { name: "Buffalo Bills",      nick: "Bills",  short: "BUF", sport: "nfl", color: "#00338d", crest: wiki("Buffalo_Bills_logo.svg") },
    engcri:   { name: "England",            short: "ENG", sport: "cricket",  color: "#012169", crest: wiki("England_cricket_team_logo.svg") },
    indcri:   { name: "India",              short: "IND", sport: "cricket",  color: "#0a3ceb", crest: commons("Board_of_Control_for_Cricket_in_India_Logo_(2024).svg") },
    engrug:   { name: "England Rugby",      short: "ENG", sport: "rugby",    color: "#b2002d", crest: commons("England_rugby_textlogo.svg") },
    f1:       { name: "Formula 1 · all races", short: "F1", sport: "f1",     color: "#e10600", crest: commons("F1.svg") }
  };

  const MATCHES = [
    {
      id: "che-ars", sport: "football", comp: "Premier League", compShort: "⚽ EPL",
      home: "chelsea", away: "arsenal",
      kickoffUtc: now - 64 * min,
      status: { phase: "live", minute: 64, score: [2, 1] },
      channels: [{ id: "sky-main", name: "Sky Sports Main Event", short: "SKY", color: "var(--blue)", meta: "Live now · Sky ch. 401" }],
      pubCount: 14
    },
    {
      id: "liv-mci", sport: "football", comp: "Premier League · MW 1", compShort: "⚽ EPL",
      home: "liverpool", away: "mancity",
      kickoffUtc: now + (3 * 60 + 12) * min,
      status: { phase: "upcoming" },
      channels: [
        { id: "tnt1", name: "TNT Sports 1", short: "TNT", color: "var(--blue)", meta: "Coverage from one hour before · Sky ch. 410" },
        { id: "dplus", name: "Discovery+", short: "D+", color: "var(--cyan)", meta: "Streaming · subscription required" }
      ],
      pubCount: 9
    },
    {
      id: "eng-ind", sport: "cricket", comp: "T20 Series", compShort: "🏏 T20",
      home: "engcri", away: "indcri", joiner: "vs",
      kickoffUtc: now + (3 * 60 + 42) * min,
      status: { phase: "upcoming" },
      channels: [{ id: "sky-cri", name: "Sky Sports Cricket", short: "SKY", color: "var(--blue)", meta: "Coverage from 30 min before · Sky ch. 404" }],
      pubCount: 3
    },
    {
      id: "kc-buf", sport: "nfl", comp: "NFL", compShort: "🏈 NFL",
      home: "chiefs", away: "bills", joiner: "@",
      kickoffUtc: lateNight.getTime(),
      status: { phase: "upcoming" },
      channels: [{ id: "sky-nfl", name: "Sky Sports NFL", short: "SKY", color: "var(--blue)", meta: "one for the night owls 🦉" }],
      pubCount: 2, lateNight: true
    },
    {
      id: "wc-final", sport: "football", comp: "FIFA World Cup · Final", compShort: "🏆 WC",
      home: null, away: null, title: "World Cup Final",
      kickoffUtc: finalDate.getTime(),
      status: { phase: "upcoming" },
      venueNote: "MetLife Stadium, New Jersey",
      channels: [
        { id: "bbc1", name: "BBC One", short: "BBC", color: "var(--ink)", meta: "Free to air" },
        { id: "itv1", name: "ITV1", short: "ITV", color: "var(--cyan)", meta: "Free to air" }
      ],
      pubCount: 23
    }
  ];

  const VENUES = [
    {
      id: "fullback", name: "The Faltering Fullback", type: "pub", rating: 8.7,
      desc: "Sports pub · Thai kitchen · 6 screens · beer garden",
      area: "Finsbury Park", price: "££", distance: "0.3 mi",
      photo: "linear-gradient(135deg,#2f5d3a,#173521)",
      favoredSays: "A proper football pub with a Thai kitchen that outcooks half of Soho. Get there an hour early for derbies, order the pad kra pao, and don't even think about asking them to change the channel.",
      amenities: ["6 screens", "Beer garden", "Food till 22:00", "Dogs ok"],
      lateLicence: true, bookable: true,
      showing: [
        { matchId: "liv-mci", note: "Main bar + garden · sound on", tag: "ALL 6 SCREENS", tagTint: "green" },
        { matchId: "kc-buf", note: "Back room · late licence 🌙", tag: "BACK ROOM", tagTint: "orange" }
      ],
      mapPos: { x: 18, y: 16 }
    },
    {
      id: "longarm", name: "Long Arm Pub & Brewery", type: "pub", rating: 8.1,
      desc: "Brewpub · burgers · sound on for the big one 🔊",
      area: "Shoreditch", price: "££", distance: "0.5 mi",
      photo: "linear-gradient(135deg,#8a5a2b,#4c2e12)",
      favoredSays: "Brews its own on-site and takes the football almost as seriously as the beer. The long tables fill fast — bring the whole group chat.",
      amenities: ["4 screens", "Own brewery", "Food till 21:30"],
      lateLicence: false, bookable: true,
      showing: [
        { matchId: "liv-mci", note: "Whole pub · sound on", tag: "SOUND ON", tagTint: "green" },
        { matchId: "eng-ind", note: "Taproom corner screen", tag: "TAPROOM", tagTint: "cyan" }
      ],
      mapPos: { x: 56, y: 34 }
    },
    {
      id: "smokd", name: "Smok'd — BBQ & Screens", type: "restaurant", rating: 8.9,
      desc: "Restaurant · book a booth with its own telly",
      area: "Shoreditch", price: "££", distance: "0.7 mi",
      photo: "linear-gradient(135deg,#b3541e,#5c1f07)",
      favoredSays: "Booths with private screens and brisket that would start arguments in Texas. Book ahead on game nights — walk-ins haven't a prayer.",
      amenities: ["Booth screens", "Bookable", "Late kitchen"],
      lateLicence: true, bookable: true,
      showing: [
        { matchId: "kc-buf", note: "Every booth · NFL all night", tag: "NFL ALL NIGHT", tagTint: "orange" }
      ],
      mapPos: { x: 70, y: 50 }
    },
    {
      id: "greenman", name: "The Green Man", type: "pub", rating: 7.4,
      desc: "Local · big single screen · cash-friendly",
      area: "Hoxton", price: "£", distance: "0.9 mi",
      photo: "linear-gradient(135deg,#3f6d52,#1c3527)",
      favoredSays: "No frills, one enormous screen, and a landlord who has opinions about VAR. The right kind of local.",
      amenities: ["1 big screen", "Garden"],
      lateLicence: false, bookable: false,
      showing: [
        { matchId: "liv-mci", note: "Main bar", tag: "BIG SCREEN", tagTint: "green" }
      ],
      mapPos: { x: 30, y: 58 }
    },
    {
      id: "royaloak", name: "The Royal Oak", type: "pub", rating: 7.9,
      desc: "Gastro pub · quiet — no screens tonight",
      area: "Haggerston", price: "££", distance: "0.6 mi",
      photo: "linear-gradient(135deg,#6b6f76,#3a3d44)",
      favoredSays: "Lovely roast, zero interest in the football. Know what you're walking into.",
      amenities: ["Sunday roast", "Garden"],
      lateLicence: false, bookable: true,
      showing: [],
      mapPos: { x: 55, y: 72 }
    }
  ];

  const COMPETITIONS = [
    { id: "wc2026", name: "FIFA World Cup 2026", meta: "104 matches · USA / Canada / Mexico", emoji: "🏆", color: "var(--green)" },
    { id: "epl", name: "Premier League", meta: "380 matches · England", emoji: "⚽", color: "var(--green)" },
    { id: "rwc2023", name: "Rugby World Cup Final 2023", meta: "Past · results & replays", emoji: "🏉", color: "var(--pink)" },
    { id: "ashes", name: "The Ashes 2027", meta: "England hosts · 5 Tests", emoji: "🏏", color: "var(--cyan)" }
  ];

  window.KO_DATA = {
    sports: SPORTS,
    teams: TEAMS,
    matches: MATCHES,
    venues: VENUES,
    competitions: COMPETITIONS,
    user: {
      initials: "JT",
      locationLabel: "Shoreditch, London",
      follows: [
        { teamId: "chelsea", alerts: true, timing: "15 min before", next: "Sat 15:00 vs Spurs" },
        { teamId: "chiefs", alerts: true, timing: "15 min before", next: "tonight 01:20 @ Bills" },
        { teamId: "f1", alerts: false, timing: "Kickoff", next: "British GP · Sun 15:00" }
      ]
    },
    // Expat-hub timezone cycle for the header globe pill.
    tzCycle: [
      { label: "London", tz: "Europe/London" },
      { label: "NYC", tz: "America/New_York" },
      { label: "Dubai", tz: "Asia/Dubai" },
      { label: "Singapore", tz: "Asia/Singapore" },
      { label: "Sydney", tz: "Australia/Sydney" }
    ]
  };
})();
