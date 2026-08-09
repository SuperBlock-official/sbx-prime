/* ------------------------------------------------------------------
   SBX Prime icon set — one consistent hand-drawn line style on a 24px
   grid (1.7 stroke, round caps/joins). Use anywhere:
     import { Icon } from "../components/icons";
     <Icon name="building" className="h-6 w-6" />
   ------------------------------------------------------------------ */
const PATHS = {
  // property & assets
  building: ["M4 21V8.5l8-4.5 8 4.5V21", "M3 21h18", "M9.5 21v-5h5v5", "M8 10.5h.01", "M12 10.5h.01", "M16 10.5h.01", "M8 14h.01", "M12 14h.01", "M16 14h.01"],
  layers: ["M12 3l9 5-9 5-9-5z", "M3 12l9 5 9-5", "M3 16l9 5 9-5"],
  pin: ["M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z", "M12 12.4a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"],
  // money & markets
  token: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M12 7.2v9.6", "M14.6 9.4A2.6 2.6 0 0012 8.2c-1.5 0-2.6.9-2.6 2s1.1 2 2.6 2 2.6.9 2.6 2-1.1 2-2.6 2a2.6 2.6 0 01-2.5-1.2"],
  chart: ["M4 4v16h16", "M8 15l3-3 3 2 4-5"],
  percent: ["M6.5 17.5L17.5 6.5", "M7.75 9a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z", "M16.25 18.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"],
  swap: ["M5 8.5h13l-3.5-3.5", "M19 15.5H6l3.5 3.5"],
  wallet: ["M4 7h13a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11", "M17 12.5h.01"],
  // trust & compliance
  shield: ["M12 3l7 3v6c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9V6z", "M9 12l2 2 4-4"],
  lock: ["M5.5 11h13v9h-13z", "M8 11V7.5a4 4 0 018 0V11", "M12 14.5v2"],
  key: ["M14.5 7.5a3.8 3.8 0 11-3.6 3.8L5 17.7", "M8 14.5l2 2", "M14.6 7.4h.01"],
  scale: ["M12 4.5v15.5", "M7 20h10", "M4.5 8h15", "M4.5 8l-2.3 4.6a2.8 2.8 0 005 0z", "M19.5 8l-2.3 4.6a2.8 2.8 0 005 0z"],
  vote: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M8.5 12l2.4 2.4L16 9.5"],
  doc: ["M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z", "M14 3v5h5", "M9 13h6", "M9 16.5h4"],
  // people & world
  users: ["M9 11.2a3.1 3.1 0 100-6.2 3.1 3.1 0 000 6.2z", "M3.2 20a6 6 0 0111.6 0", "M16.2 5a3.1 3.1 0 010 6", "M17.5 20a6 6 0 00-3.2-5.3"],
  globe: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M3.6 9h16.8", "M3.6 15h16.8", "M12 3c2.4 2.4 3.7 5.6 3.7 9s-1.3 6.6-3.7 9c-2.4-2.4-3.7-5.6-3.7-9S9.6 5.4 12 3z"],
  // platform & tech
  spark: ["M12 3l1.7 5L18.7 9.7l-5 1.7L12 16.4l-1.7-5L5.3 9.7l5-1.7z", "M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"],
  refresh: ["M4 5.5v5h5", "M20 18.5v-5h-5", "M19 9.5A7.5 7.5 0 006 6.3L4 8.5", "M5 14.5a7.5 7.5 0 0013 3.2l2-2.2"],
  node: ["M12 4.2a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z", "M5 20.2a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z", "M19 20.2a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z", "M12 4.2l-5.2 11.4", "M12 4.2l5.2 11.4", "M6.6 18h10.8"],
  clock: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M12 7.5V12l3 2"],
  bell: ["M6 9.5a6 6 0 1112 0c0 4.5 1.8 5.5 1.8 5.5H4.2S6 14 6 9.5z", "M10 19.5a2 2 0 004 0"],
  check: ["M4 12.5l5 5L20 6.5"],
};

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.7 }) {
  const d = PATHS[name] || PATHS.spark;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {d.map((seg, i) => <path key={i} d={seg} />)}
    </svg>
  );
}

export const ICON_NAMES = Object.keys(PATHS);
