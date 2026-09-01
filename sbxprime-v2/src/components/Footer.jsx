import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/sbx-footer-logo.png";
import superblock from "../assets/logos/superblock.png";
import ctaDefault from "../assets/assets/about-hero-london.jpg";
import ctaHow from "../assets/assets/howitworks-hero.jpg";
import ctaTrust from "../assets/assets/dover-hero.jpg";
import ctaAbout from "../assets/assets/people-office.jpg";
import ctaTech from "../assets/images/office-interior.jpg";
import ctaInvest from "../assets/assets/grosvenor-hero.jpg";

const FOOTER_NAV = [
 ["Marketplace", "/invest"],
 ["How it works", "/how-it-works"],
 ["Technology", "/technology"],
 ["Trust & Security", "/trust"],
 ["FAQ", "/faq"],
 ["About", "/about"],
];

/* CTA imagery varies by page — a different Central London face for each area. */
const CTA_IMG = [
 ["/how-it-works", ctaHow],
 ["/technology", ctaTech],
 ["/trust", ctaTrust],
 ["/about", ctaAbout],
 ["/invest", ctaInvest],
];
function ctaImageFor(path) {
 const m = CTA_IMG.find(([p]) => path === p || path.startsWith(p + "/"));
 return m ? m[1] : ctaDefault;
}

export default function Footer() {
 const { pathname } = useLocation();
 const ctaImg = ctaImageFor(pathname);
 return (
 <footer className="px-3 pb-3 pt-8 sm:px-4 sm:pb-4">
 <div className="mx-auto max-w-shell overflow-hidden rounded-[36px] border border-hairline bg-white shadow-[0_24px_60px_-40px_rgba(15,45,32,.4)]">
 <div className="p-7 sm:p-10 lg:p-12">
 {/* CTA band, mint→cyan gradient card with page-specific imagery */}
 <div className="grid overflow-hidden rounded-[26px] bg-gradient-to-br from-brand-mint via-[#2ecbc4] to-brand-teal lg:grid-cols-[1.15fr_1fr]">
 <div className="px-6 py-9 sm:px-10 lg:py-12">
 <h2 className="max-w-xl font-display text-2xl font-extrabold leading-tight text-[#06231a] sm:text-3xl">
 Institutional real estate, now yours, one square foot at a time.
 </h2>
 <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#06231a]/75">
 Pledge into the Central London launch: 6–7% rental yield plus 3–5% capital appreciation potential.
 </p>
 <Link to="/register" className="btn-dark mt-6">Pledge your allocation</Link>
 </div>
 <div className="relative min-h-[220px] lg:min-h-0">
 <img src={ctaImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-r from-brand-mint/40 to-transparent lg:from-brand-mint/25" />
 </div>
 </div>

 {/* columns */}
 <div className="mt-9 grid gap-10 md:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
 <div>
 <img src={logo} alt="SBX Prime" className="h-16 w-auto" />
 <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/55">
 Institutional-grade tokenized real estate, one token, one square foot, one SPV share.
 </p>
 </div>
 <div>
 <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Contact</p>
 <ul className="mt-4 space-y-2 text-sm text-ink/70">
 <li><a href="mailto:hello@sbxprime.com" className="hover:text-brand-dark">hello@sbxprime.com</a></li>
 <li><a href="tel:+447777700923" className="hover:text-brand-dark">+44 77777 00923</a></li>
 </ul>
 </div>
 <div>
 <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Find Us</p>
 <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
 85 Great Portland Street, First Floor, London W1W 7LT, United Kingdom
 </p>
 </div>
 <div>
 <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Powered by</p>
 <img src={superblock} alt="SUPERBLOCK" className="mt-4 h-7 w-auto" />
 </div>
 </div>

 {/* footer nav + copyright */}
 <div className="mt-11 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 sm:flex-row">
 <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
 {[...FOOTER_NAV, ["Privacy", "/privacy"], ["Terms", "/terms"]].map(([label, to]) => (
 <Link key={label} to={to} className="font-display text-[13px] font-bold text-ink/65 transition-colors hover:text-brand-dark">
 {label}
 </Link>
 ))}
 </nav>
 <p className="text-xs text-ink/45">© {new Date().getFullYear()} SBX Prime by SUPERBLOCK. All rights reserved.</p>
 </div>

 {/* legal */}
 <p className="mt-8 text-[11px] leading-relaxed text-ink/40">
 Tokens are issued through an offshore structure and are not offered as securities. This launch is offered only to eligible persons outside the US, UK, and
 Europe, and is not available to persons in the United States, the United Kingdom, or Europe. Rental yields are indicative
 and not guaranteed; capital appreciation figures are third-party market forecasts (Savills, JLL), capital is at risk and property values can fall as well as rise. Nothing on this site is investment,
 legal, or tax advice.
 </p>
 </div>
 </div>
 </footer>
 );
}
