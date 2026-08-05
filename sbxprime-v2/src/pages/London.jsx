import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { RAISE } from "../lib/api";
import PledgeModule from "../components/PledgeModule";
import PushNotification from "../components/PushNotification";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead, ReturnSplit, Counter } from "../components/ui";
import { TiltCard } from "../components/cards";
import { PhoneFloat } from "../components/mockups";
import londonImg from "../assets/images/london-office.png";
import officeImg from "../assets/images/office-interior.jpg";

const FACTS = [
 ["Asset", "Grosvenor Gardens"],
 ["Size", "18,036 sq ft · Grade II listed"],
 ["Tenancy", "Part-let · reversionary upside"],
 ["Lease", "125-yr leasehold · to 2126"],
 ["Structure", "Single-asset English-law SPV"],
 ["Token standard", "ERC-3643 · 1 token = 1 sq ft = 1 share"],
 ["Location", "Victoria & Belgravia, SW1"],
 ["Distributions", "Monthly · USDC · pro-rata"],
];

export default function London() {
 const pct = Math.round((RAISE.raisedUsd / RAISE.targetUsd) * 100);
 return (
 <>
 <Seo
 title="Grosvenor Gardens, Victoria SW1 — Launching Soon | SBX Prime"
 description="Own the Central London launch asset on Grosvenor Gardens from one square foot (£582). 6–7% target rental yield plus 3–5% capital appreciation potential (Savills/JLL). Pledge now, no KYC until closing."
 path="/invest/london"
 />

 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.25} />
 <div className="shell relative grid gap-12 py-14 lg:grid-cols-[1.25fr_1fr] lg:py-14">
 {/* ---------- asset detail ---------- */}
 <div>
 <Fx>
 <span className="badge-live">Launching soon · {pct}% pledged</span>
 <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
 <span className="text-brand">Grosvenor Gardens</span>
 </h1>
 <p className="lede">
 The launch asset of SBX Prime: a Grade II listed period building in Victoria & Belgravia,
 tokenized square foot by square foot under an English-law SPV.
 </p>
 <div className="mt-5"><ReturnSplit yieldPa="6–7%" appreciationPa="3–5%" totalPa="9–11%" /></div>
 <p className="mt-1.5 text-[11px] text-ink/40">Appreciation per Savills / JLL Central London forecasts. Capital at risk.</p>
 <Link to="/invest/grosvenor-gardens/prospectus" className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/[0.06] px-5 py-2 font-display text-sm font-bold text-brand-dark transition hover:bg-brand/12">
 View full prospectus
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
 </Link>
 </Fx>

 <Fx delay={130} scale className="relative mt-8">
 <TiltCard max={7} className="overflow-hidden rounded-3xl border border-hairline">
 <img src={londonImg} alt="Interior of the Central London Grade-A office" className="h-[300px] w-full object-cover sm:h-[360px]" />
 </TiltCard>
 <div className="absolute -bottom-6 right-4 w-[min(85%,320px)]">
 <PushNotification body="You've been paid 1,050 USDC rental income for January 2025" time="now" delay={800} />
 </div>
 </Fx>

 <div className="mt-14 grid gap-x-10 gap-y-4 sm:grid-cols-2">
 {FACTS.map(([k, v], i) => (
 <Fx key={k} delay={i * 50} className="flex items-baseline justify-between gap-6 border-b border-ink/10 pb-3">
 <span className="text-xs uppercase tracking-wider text-ink/45">{k}</span>
 <span className="text-right font-display text-sm font-bold text-ink">{v}</span>
 </Fx>
 ))}
 </div>

 <Fx delay={120} className="mt-12">
 <SectionHead
 eyebrow="The numbers"
 title="Underwritten like an institution buys."
 lede="Token price is simply asset value divided by saleable area, no premium for the wrapper."
 />
 <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
 {[
 ["Asset value", 10.5, "£", "M", 1],
 ["Price / sq ft", 582, "£", "", 0],
 ["Rental yield", 6.5, "", "% p.a.", 1],
 ["Appreciation", 4, "≈", "% p.a.", 0],
 ].map(([k, v, pre, suf, dec], i) => (
 <div key={k} className="card-dark gloss p-4">
 <p className="text-[10px] uppercase tracking-[0.16em] text-ink/45">{k}</p>
 <p className="mt-1 font-display text-2xl font-extrabold text-brand">
 <Counter value={v} prefix={pre} suffix={suf} decimals={dec} />
 </p>
 </div>
 ))}
 </div>
 </Fx>

 <div className="relative mt-12">
 <Fx scale>
 <img src={officeImg} alt="Office floor detail" className="h-64 w-full rounded-3xl border border-hairline object-cover sm:h-72" />
 </Fx>
 {/* the asset, live in the app */}
 <Fx delay={120} scale className="pointer-events-none absolute -bottom-8 right-2 hidden w-[188px] sm:block">
 <PhoneFloat variant="london" className="float-slow w-full drop-shadow-[0_30px_50px_rgba(15,45,32,0.35)]" />
 </Fx>
 </div>
 </div>

 {/* ---------- sticky pledge module ---------- */}
 <div className="lg:sticky lg:top-24 lg:self-start">
 <Fx delay={100}>
 <PledgeModule />
 </Fx>
 </div>
 </div>
 </section>
 </>
 );
}
