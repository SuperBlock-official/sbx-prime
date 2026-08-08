import { useInView, useCountUp } from "../lib/hooks";

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

export function SectionHead({ eyebrow, title, lede, center = false }) {
 return (
 <Fx className={center ? "text-center" : ""}>
 {eyebrow && <p className="eyebrow">{eyebrow}</p>}
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
