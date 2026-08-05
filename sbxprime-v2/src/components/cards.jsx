import { Link } from "react-router-dom";
import { useTilt, useInView } from "../lib/hooks";
import { Fx, Counter, ReturnSplit } from "./ui";

/** 3D mouse-tracking tilt wrapper with brand specular sheen. */
export function TiltCard({ className = "", children, max = 12 }) {
 const { ref, onMouseMove, onMouseLeave } = useTilt(max);
 return (
 <div className="tilt-wrap">
 <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`tilt ${className}`}>
 <span className="sheen" aria-hidden="true" />
 {children}
 </div>
 </div>
 );
}

/** Raise progress bar that animates its width when scrolled into view. */
export function RaiseBar({ pct, className = "" }) {
 const ref = useInView({ threshold: 0.5 });
 return (
 <div ref={ref} className={`fx h-2 overflow-hidden rounded-full bg-ink/8 ${className}`}>
 <div
 className="h-full rounded-full bg-gradient-to-r from-brand to-brand-mint transition-[width] duration-[1400ms] ease-out"
 style={{ width: `${pct}%` }}
 ref={(el) => {
 if (!el) return;
 if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
 el.style.width = "0%";
 const io = new IntersectionObserver((es) => {
 if (es[0].isIntersecting) {
 el.style.width = `${pct}%`;
 io.disconnect();
 }
 }, { threshold: 0.4 });
 io.observe(el);
 }
 }}
 />
 </div>
 );
}

/** SVG skyline placeholder for pipeline cities.
 IMAGE NEEDED: licensed skyline photography, replace this SVG. */
export function Skyline({ seed = 5, className = "" }) {
 const bars = Array.from({ length: 14 }, (_, i) => ({ x: i * 26, h: 26 + ((seed * 37 + i * 53) % 58) }));
 return (
 <svg viewBox="0 0 360 130" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
 <defs>
 <linearGradient id={`sky${seed}`} x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#16291f" />
 <stop offset="100%" stopColor="#0f1f17" />
 </linearGradient>
 </defs>
 <rect width="360" height="130" fill={`url(#sky${seed})`} />
 {bars.map((b, i) => (
 <g key={i}>
 <rect x={b.x + 3} y={130 - b.h} width="20" height={b.h} fill="#1FB462" fillOpacity={i % 3 ? 0.2 : 0.34} />
 {Array.from({ length: Math.floor(b.h / 14) }, (_, w) => (
 <rect key={w} x={b.x + 7} y={130 - b.h + 6 + w * 12} width="4" height="4" fill="#35DFA9" fillOpacity="0.6" />
 ))}
 </g>
 ))}
 </svg>
 );
}

const STATUS_BADGE = {
 live: <span className="badge-live">Launching soon</span>,
 soon: <span className="badge-soon">Coming soon</span>,
 pipeline: <span className="badge-pipeline">Pipeline</span>,
};

/** Property / city card with tilt, sheen, animated progress, count-up numbers. */
export function CityCard({ city, raise, delay = 0, onRegister }) {
 const live = city.status === "live";
 const inner = (
 <TiltCard className={`card-dark overflow-hidden ${live ? "live-pulse !border-brand/45" : ""}`}>
 <div className="relative h-44 overflow-hidden">
 {city.image ? (
 <img src={city.image} alt={`${city.asset}, ${city.name}`} className="h-full w-full object-cover" loading="lazy" />
 ) : (
 <Skyline seed={city.slug.length + city.name.length} className="h-full w-full" />
 )}
 <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
 <div className="absolute left-4 top-4">{STATUS_BADGE[city.status]}</div>
 <p className="absolute bottom-3 left-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-white/90">
 {city.name} · {city.country}
 </p>
 </div>

 <div className="p-5">
 <h3 className="font-display text-lg font-bold text-ink">{city.asset}</h3>
 <div className="mt-3">
 <ReturnSplit compact yieldPa={city.yieldPa} appreciationPa={city.appreciationPa} totalPa={city.totalPa} />
 </div>

 {live && raise ? (
 <div className="mt-5">
 <div className="flex items-baseline justify-between text-xs text-ink/55">
 <span>
 <Counter value={Math.round((raise.raisedUsd / raise.targetUsd) * 100)} suffix="%" className="font-display text-sm font-bold text-brand-dark" />{" "}
 pledged
 </span>
 <span>${(raise.raisedUsd / 1e6).toFixed(1)}M of ${(raise.targetUsd / 1e6).toFixed(1)}M</span>
 </div>
 <RaiseBar pct={(raise.raisedUsd / raise.targetUsd) * 100} className="mt-2" />
 <div className="mt-5 flex items-center justify-between">
 <p className="text-xs text-ink/55">
 <Counter value={raise.tokensRemaining} className="font-display font-bold text-ink" /> sq ft remaining
 </p>
 <span className="btn-primary !px-4 !py-2 text-xs">View asset →</span>
 </div>
 </div>
 ) : (
 <>
 <p className="mt-5 text-xs leading-relaxed text-ink/55">{city.blurb.split(", ")[0].trim()}</p>
 <button
 onClick={(e) => {
 e.preventDefault();
 onRegister?.(city);
 }}
 className="btn-ghost mt-4 w-full !py-2.5 text-xs"
 >
 Register interest
 </button>
 </>
 )}
 </div>
 </TiltCard>
 );

 return (
 <Fx delay={delay} scale>
 {live ? (
 <Link to="/invest/london" className="block" aria-label="View the Central London asset">
 {inner}
 </Link>
 ) : (
 inner
 )}
 </Fx>
 );
}
