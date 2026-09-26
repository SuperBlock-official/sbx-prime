import { useInView, useCountUp } from "../lib/hooks";

/** The square-foot mark — SBX Prime's repeating brand motif. One filled cell in
 *  a 2×2 grid: a single square foot within a building. Reused site-wide as a
 *  section marker, a list bullet, and a corner accent. Colour via `text-*`. */
export function SqFtMark({ className = "h-5 w-5" }) {
 return (
 <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
 <rect x="3" y="3" width="18" height="18" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
 <path d="M12 3.5v17M3.5 12h17" stroke="currentColor" strokeWidth="1.1" opacity="0.45" />
 <rect x="5" y="5" width="6" height="6" rx="1.6" fill="currentColor" />
 </svg>
 );
}

/** Off-screen honeypot field. Real users never see or fill it; bots do, and the
 *  server silently drops any submission where it's non-empty. */
export function Honeypot({ value, onChange }) {
 return (
 <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}>
 <label>
 Company
 <input type="text" name="company" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
 </label>
 </div>
 );
}

/** Scroll-entrance wrapper. Content is ALWAYS visible without JS, the .fx classes only animate when <html class="js"> is present. */
export function Fx({ as: Tag = "div", delay = 0, scale = false, className = "", children, ...rest }) {
 const ref = useInView();
 return (
 <Tag ref={ref} className={`${scale ? "fx-scale" : "fx"} ${className}`}
 style={delay ? { "--fx-delay": `${delay}ms` } : undefined} {...rest}>
 {children}
 </Tag>
 );
}

// eslint-disable-next-line no-unused-vars
export function SectionHead({ eyebrow, title, lede, center = false }) {
 // Eyebrow kickers removed; the square-foot mark is the consistent motif instead.
 return (
 <Fx className={center ? "text-center" : ""}>
 <SqFtMark className={`h-6 w-6 text-brand ${center ? "mx-auto" : ""}`} />
 <h2 className="h-section mt-3">{title}</h2>
 {lede && <p className={`lede ${center ? "mx-auto" : ""}`}>{lede}</p>}
 </Fx>
 );
}

/** Number that counts up when scrolled into view. */
export function Counter({ value, prefix = "", suffix = "", decimals = 0, className = "" }) {
 const [ref, val] = useCountUp(value, { decimals });
 const fmt = decimals
 ? val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
 : Math.round(val).toLocaleString("en-US");
 return (
 <span ref={ref} className={`tnum ${className}`}>
 {prefix}{fmt}{suffix}
 </span>
 );
}

/** Return breakdown, the standing rule: yield PLUS appreciation, never yield alone. */
export function ReturnSplit({ yieldPa, appreciationPa, totalPa, compact = false }) {
 if (compact)
 return (
 <p className="text-xs text-ink/60">
 <span className="font-semibold text-brand-dark">{yieldPa} yield</span>
 {" + "}
 <span className="font-semibold text-ink">{appreciationPa} appreciation</span>
 {" ≈ "}
 <span className="font-semibold text-brand-dark">{totalPa} p.a.</span>
 </p>
 );
 return (
 <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
 <span className="font-display text-sm font-bold text-brand-dark">{yieldPa} rental yield p.a.</span>
 <span className="text-ink/50">+</span>
 <span className="font-display text-sm font-bold text-ink">{appreciationPa} capital appreciation p.a.</span>
 <span className="text-ink/50">≈</span>
 <span className="rounded-full bg-brand/12 px-3 py-0.5 font-display text-sm font-bold text-brand-dark">{totalPa} total p.a.</span>
 </div>
 );
}
