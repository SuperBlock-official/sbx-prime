import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/sbx-logo.svg";
import { Icon } from "./icons";

const LINKS = [
 { to: "/invest", label: "Marketplace" },
 { to: "/how-it-works", label: "How It Works" },
 { to: "/technology", label: "Technology" },
 { to: "/trust", label: "Trust & Security" },
 { to: "/dashboard", label: "Dashboard" },
 { to: "/faq", label: "FAQ" },
];

/* Primary items surfaced on the mobile bottom dock (icon + short label). */
const DOCK = [
 { to: "/", label: "Home", icon: "home", end: true },
 { to: "/invest", label: "Market", icon: "grid" },
 { to: "/how-it-works", label: "How", icon: "node" },
 { to: "/dashboard", label: "Dashboard", icon: "chart" },
 { to: "/register", label: "Pledge", icon: "coins", cta: true },
];

export default function Nav() {
 const [open, setOpen] = useState(false);
 return (
 <>
 {/* ---------- top dock (desktop) + top bar (mobile) ---------- */}
 <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-4">
 <div className="mx-auto flex max-w-shell items-center justify-between gap-4 rounded-[22px] border border-white/70 bg-white/60 px-3 py-2.5 shadow-[0_20px_46px_-24px_rgba(15,45,32,.42)] backdrop-blur-2xl backdrop-saturate-150 sm:px-4">
 <Link to="/" aria-label="SBX Prime home" className="shrink-0 pl-1" onClick={() => setOpen(false)}>
 <img src={logo} alt="SBX Prime" className="h-9 w-auto" />
 </Link>

 <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
 {LINKS.map((l) => (
 <NavLink key={l.to} to={l.to}
 className={({ isActive }) =>
 `relative rounded-xl px-3.5 py-2 font-display text-[13px] font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${
 isActive ? "bg-brand/12 text-brand-dark" : "text-ink/70 hover:text-ink hover:bg-ink/[0.04]"
 }`
 }>
 {({ isActive }) => (
 <>
 {l.label}
 {isActive && (
 <span className="absolute -bottom-0.5 left-1/2 h-[2.5px] w-4 -translate-x-1/2 rounded-full bg-brand" />
 )}
 </>
 )}
 </NavLink>
 ))}
 </nav>

 <div className="hidden items-center gap-3 xl:flex">
 <Link to="/whitepaper" className="font-display text-[13px] font-bold text-ink/70 transition-colors hover:text-ink">
 Whitepaper
 </Link>
 <Link to="/register" className="btn-primary !px-5 !py-2.5 text-[13px]">Pledge now</Link>
 </div>

 <button className="rounded-xl border border-hairline bg-white/70 p-2 text-ink xl:hidden"
 aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
 </svg>
 </button>
 </div>

 {/* full menu (mobile, opened from the hamburger) */}
 {open && (
 <nav className="mx-auto mt-2 max-w-shell xl:hidden" aria-label="Mobile">
 <div className="flex flex-col gap-1 rounded-[22px] border border-hairline bg-white p-3 shadow-[0_16px_40px_-24px_rgba(15,45,32,.45)]">
 {[...LINKS, { to: "/whitepaper", label: "Whitepaper" }].map((l) => (
 <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
 className={({ isActive }) =>
 `rounded-lg px-3 py-2.5 font-display text-sm font-bold ${
 isActive ? "bg-brand/10 text-brand-dark" : "text-ink/75"
 }`
 }>
 {l.label}
 </NavLink>
 ))}
 <Link to="/register" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">Pledge now</Link>
 </div>
 </nav>
 )}
 </header>

 {/* ---------- bottom dock (mobile only) ---------- */}
 <nav
 aria-label="Quick navigation"
 className="fixed inset-x-0 bottom-0 z-50 xl:hidden"
 style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
 >
 <div className="mx-3 mb-3 flex items-stretch justify-around gap-1 rounded-[20px] border border-white/70 bg-white/80 p-1.5 shadow-[0_16px_40px_-16px_rgba(15,45,32,.5)] backdrop-blur-xl backdrop-saturate-150">
 {DOCK.map((d) => (
 <NavLink key={d.to} to={d.to} end={d.end}
 className={({ isActive }) =>
 `flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold transition-colors ${
 d.cta
 ? "bg-gradient-to-br from-brand-mint to-brand-teal text-[#06231a] shadow-[0_8px_16px_-8px_rgba(37,169,224,.7)]"
 : isActive
 ? "text-brand-dark"
 : "text-ink/55"
 }`
 }>
 {({ isActive }) => (
 <>
 <span className={`grid h-8 w-8 place-items-center rounded-xl ${!d.cta && isActive ? "bg-brand/12" : ""}`}>
 <Icon name={d.icon} className="h-[18px] w-[18px]" />
 </span>
 {d.label}
 </>
 )}
 </NavLink>
 ))}
 </div>
 </nav>
 </>
 );
}
