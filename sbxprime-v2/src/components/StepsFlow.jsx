import { useInView } from "../lib/hooks";
import { Fx } from "./ui";

export const STEPS = [
 {
 n: 1,
 title: "Discover",
 body: "Browse institutional-grade assets vetted by our team and partners. Every listing is standardised to 1 sq ft, so you can compare like for like.",
 },
 {
 n: 2,
 title: "Pledge",
 body: "Reserve your allocation by dollar amount or square feet, no KYC, no wallet, no funds move. Your place in the raise is held.",
 },
 {
 n: 3,
 title: "Verify",
 body: "Complete KYC/AML and investor-status verification before closing. Your wallet is credentialed on-chain under ERC-3643.",
 },
 {
 n: 4,
 title: "Own",
 body: "At closing, your subscription settles and tokens are issued: 1 token = 1 sq ft = 1 SPV share, recorded on-chain and in the register.",
 },
 {
 n: 5,
 title: "Earn & exit",
 body: "Rental income (6–7% p.a.) is distributed monthly in USDC, while the asset targets 3–5% p.a. capital appreciation. Sell any time on the secondary marketplace.",
 },
];

/** Five steps joined by an SVG line that draws itself on scroll. */
export default function StepsFlow() {
 const lineRef = useInView({ threshold: 0.25 });
 return (
 <div className="relative">
 {/* connecting line (desktop) */}
 <div ref={lineRef} className="drawline absolute inset-x-0 top-7 hidden lg:block" aria-hidden="true">
 <svg viewBox="0 0 1000 40" fill="none" className="w-full">
 <path
 className="draw"
 d="M20 20 C 150 -10, 260 50, 380 20 S 620 -10, 740 20 S 940 45, 985 18"
 stroke="#09C85A"
 strokeOpacity="0.55"
 strokeWidth="2"
 strokeDasharray="6 7"
 style={{ "--path-len": 1100 }}
 />
 </svg>
 </div>
 <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
 {STEPS.map((s, i) => (
 <Fx as="li" key={s.n} delay={i * 100} scale>
 <div className="group h-full">
 <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand/40 bg-brand/10 font-display text-lg font-extrabold text-brand">
 {s.n}
 </span>
 <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.body}</p>
 </div>
 </Fx>
 ))}
 </ol>
 </div>
 );
}
