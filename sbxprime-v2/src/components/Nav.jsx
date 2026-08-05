import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/sbx-logo.svg";

const LINKS = [
 { to: "/invest", label: "Marketplace" },
 { to: "/how-it-works", label: "How It Works" },
 { to: "/technology", label: "Technology" },
 { to: "/trust", label: "Trust & Security" },
 { to: "/dashboard", label: "Dashboard" },
 { to: "/faq", label: "FAQ" },
];

export default function Nav() {
 const [open, setOpen] = useState(false);
 return (
 <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-4">
 <div className="mx-auto flex max-w-shell items-center justify-between gap-4 rounded-[22px] border border-hairline bg-white/55 px-4 py-2.5 shadow-[0_18px_44px_-26px_rgba(15,45,32,.4)] backdrop-blur-2xl backdrop-saturate-150 sm:px-6">
 <Link to="/" aria-label="SBX Prime home" onClick={() => setOpen(false)}>
 <img src={logo} alt="SBX Prime" className="h-9 w-auto" />
 </Link>

 <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
 {LINKS.map((l) => (
 <NavLink key={l.to} to={l.to}
 className={({ isActive }) =>
 `font-display text-[13px] font-bold tracking-wide transition-colors ${
 isActive ? "text-brand-dark" : "text-ink/70 hover:text-ink"
 }`
 }>
 {l.label}
 </NavLink>
 ))}
 </nav>

 <div className="hidden items-center gap-3 xl:flex">
 <Link to="/whitepaper" className="font-display text-[13px] font-bold text-ink/70 hover:text-ink">
 Whitepaper
 </Link>
 <Link to="/register" className="btn-primary !px-5 !py-2.5 text-[13px]">Pledge now</Link>
 </div>

 <button className="rounded-lg border border-hairline p-2 text-ink xl:hidden"
 aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
 </svg>
 </button>
 </div>

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
 );
}
