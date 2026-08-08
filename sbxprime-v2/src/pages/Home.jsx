import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { useTyped } from "../lib/hooks";
import { RAISE } from "../lib/api";
import { CITIES, LONDON } from "../data/cities";
import { FAQ_CATEGORIES } from "../data/faqs";
import NodeBackground from "../components/NodeBackground";
import PartnerStrip from "../components/PartnerStrip";
import PushNotification from "../components/PushNotification";
import TokenCard from "../components/TokenCard";
import StepsFlow from "../components/StepsFlow";
import Erc3643Table from "../components/Erc3643Table";
import FaqAccordion from "../components/FaqAccordion";
import InterestModal from "../components/InterestModal";
import { DualPhoneHero, DashboardMockup, AppShowcase } from "../components/mockups";
import { CityCard } from "../components/cards";
import { Fx, SectionHead, Counter, ReturnSplit } from "../components/ui";
import londonImg from "../assets/images/london-office.png";

const TYPED_CITIES = ["London.", "Dubai.", "Singapore.", "New York.", "Riyadh.", "Tokyo."];

export default function Home() {
 const [modal, setModal] = useState(null);
 const typed = useTyped(TYPED_CITIES);
 const pct = Math.round((RAISE.raisedUsd / RAISE.targetUsd) * 100);

 return (
 <>
 <Seo
 title="Tokenized Real Estate London | SBX Prime by SUPERBLOCK"
 description="Own institutional-grade London commercial real estate from one square foot. ERC-3643 security tokens, 6–7% rental yield plus 3–5% capital appreciation potential (Savills/JLL). For qualified investors."
 path="/"
 />

 {/* ============ HERO ============ */}
 <section className="relative overflow-hidden">
 <NodeBackground opacity={0.4} />
 <div className="shell relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
 <div>
 <Fx>
 <span className="badge-live">Launching soon in Central London</span>
 <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] sm:text-5xl lg:text-[3.4rem]">
 Tokenized real estate in{" "}
 <span className="text-brand">
 {typed}
 <span className="typed-caret" aria-hidden="true" />
 </span>
 </h1>
 <p className="lede">
 SBX Prime turns trophy commercial buildings into ERC-3643 security tokens.
 One token = one square foot = one SPV share, with rent paid monthly in USDC
 and institutional custody of title.
 </p>
 <div className="mt-6">
 <ReturnSplit yieldPa="6–7%" appreciationPa="3–5%" totalPa="9–11%" />
 <p className="mt-1.5 text-[11px] text-ink/40">
 London appreciation per Savills / JLL forecasts. Capital at risk.
 </p>
 </div>
 <div className="mt-8 flex flex-wrap gap-3">
 <Link to="/invest/london" className="btn-primary">View the London asset</Link>
 <Link to="/how-it-works" className="btn-ghost">How it works</Link>
 </div>
 </Fx>

 {/* launching soon ticker, progress + inline stats */}
 <Fx delay={150}>
 <div className="card-dark mt-10 p-5">
 <div className="flex items-baseline justify-between">
 <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50">
 Central London · launching soon
 </p>
 <p className="font-display text-sm font-bold text-brand-dark"><Counter value={pct} suffix="% pledged" /></p>
 </div>
 <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/8">
 <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-mint" style={{ width: `${pct}%` }} />
 </div>
 <div className="mt-4 grid grid-cols-3 gap-3">
 {[
 ["Pledged", <>$<Counter value={RAISE.raisedUsd / 1e6} decimals={1} />M</>],
 ["Investors", <Counter value={RAISE.investors} />],
 ["Sq ft left", <Counter value={RAISE.tokensRemaining} />],
 ].map(([label, node], i) => (
 <div key={i}>
 <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/45">{label}</p>
 <p className="mt-0.5 font-display text-lg font-extrabold text-ink">{node}</p>
 </div>
 ))}
 </div>
 </div>
 </Fx>
 </div>

 <Fx delay={200} scale className="pt-8 lg:pt-0">
 <DualPhoneHero />
 </Fx>
 </div>

 {/* stats strip, KPI cards in the app's dashboard language */}
 <div className="border-t border-hairline bg-white">
 <div className="shell grid grid-cols-2 gap-4 py-10 lg:grid-cols-4">
 {[
 { label: "Launch asset", value: <Counter value={18036} suffix=" ft²" />, sub: "Victoria & Belgravia" },
 { label: "Per token", value: <><span className="align-top text-lg">$</span><Counter value={740} /></>, sub: "One saleable square foot" },
 { label: "Total return", value: "9–11%", sub: "Yield + appreciation p.a.", grad: true },
 { label: "Per token", value: "1 share", sub: "Register-backed SPV" },
 ].map((s, i) => (
 <Fx key={i} delay={i * 90} scale>
 <div className={`kpi-card ${s.grad ? "kpi-card--grad" : ""} h-full`}>
 <p className="kpi-label">{s.label}</p>
 <p className="kpi-value">{s.value}</p>
 <p className="kpi-sub">{s.sub}</p>
 </div>
 </Fx>
 ))}
 </div>
 </div>
 </section>

 {/* ============ TRUST BAR ============ */}
 <section className="border-y border-hairline bg-white py-8">
 <div className="shell">
 <p className="mb-3 text-center font-display text-[10.5px] font-bold uppercase tracking-[0.28em] text-ink/40">
 Working with institutional partners
 </p>
 <PartnerStrip />
 </div>
 </section>

 {/* ============ WHY LONDON ============ */}
 <section className="relative overflow-hidden py-14 lg:py-14">
 <div className="shell grid items-center gap-10 lg:grid-cols-2">
 <div>
 <SectionHead
 eyebrow="Why London first"
 title="The world's most liquid trophy market."
 lede="London commercial property has cleared more cross-border capital than any city on earth for a decade. Our launch asset sits in the middle of it."
 />
 <ul className="mt-8 space-y-4">
 {[
 ["Grade II listed, income-producing", "18,036 sq ft on Grosvenor Gardens in Victoria & Belgravia, part-let today with reversionary upside as vacant floors are let to market rent."],
 ["Two-part returns", "6–7% p.a. rental yield paid monthly, plus 3–5% p.a. capital appreciation potential (Savills/JLL forecasts)."],
 ["English-law SPV", "The building is held in a single-asset SPV; each token is a registered share, not synthetic exposure."],
 ].map(([t, b], i) => (
 <Fx as="li" key={t} delay={i * 90} className="flex gap-4">
 <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/15 font-display text-sm font-bold text-brand">✓</span>
 <div>
 <p className="font-display text-[15px] font-bold text-ink">{t}</p>
 <p className="mt-1 text-sm leading-relaxed text-ink/55">{b}</p>
 </div>
 </Fx>
 ))}
 </ul>
 <Fx delay={280}>
 <Link to="/invest/london" className="btn-primary mt-8">Explore the asset →</Link>
 </Fx>
 </div>
 <Fx scale delay={120} className="relative">
 <img
 src={londonImg}
 alt="The Grosvenor Gardens launch asset in Victoria & Belgravia"
 className="w-full rounded-3xl border border-hairline object-cover shadow-[0_45px_90px_-40px_rgba(9,200,90,.4)]"
 />
 <div className="absolute -bottom-6 left-1/2 w-[min(88%,330px)] -translate-x-1/2">
 <PushNotification body="Grosvenor Gardens, August rent collected. Distribution scheduled for the 1st." time="2m" delay={900} />
 </div>
 </Fx>
 </div>
 </section>

 {/* ============ HOW IT WORKS ============ */}
 <section className="border-y border-hairline bg-white py-14 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="How it works"
 title="From discovery to income in five steps."
 lede="Institutional process, consumer-grade experience. Pledge first, verification only happens when the raise closes."
 center
 />
 <div className="mt-10">
 <StepsFlow />
 </div>
 <Fx className="mt-9 text-center">
 <Link to="/how-it-works" className="btn-ghost">See the full journey</Link>
 </Fx>
 </div>
 </section>

 {/* ============ PIPELINE ============ */}
 <section className="py-14 lg:py-14">
 <div className="shell">
 <div className="flex flex-wrap items-end justify-between gap-4">
 <SectionHead
 eyebrow="The pipeline"
 title="London is launching. The world is next."
 lede="Register interest in a market and you shape which asset we tokenize next, early registrants get first allocation."
 />
 <Fx><Link to="/invest" className="btn-ghost shrink-0">All markets →</Link></Fx>
 </div>
 <div className="mt-9 grid gap-6 md:grid-cols-3">
 {CITIES.slice(0, 3).map((c, i) => (
 <CityCard key={c.slug} city={c} raise={RAISE} delay={i * 110} onRegister={(city) => setModal(city.slug)} />
 ))}
 </div>
 </div>
 </section>

 {/* ============ TOKEN CARD + ERC3643 ============ */}
 <section className="relative overflow-hidden border-y border-hairline bg-white py-14 lg:py-14">
 <NodeBackground opacity={0.22} />
 <div className="shell relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
 <div>
 <SectionHead
 eyebrow="The token"
 title="A security token that regulators can live with."
 lede="ERC-3643 binds identity to the token itself. Transfers only settle between verified investors, compliance is enforced by the contract, not by promises."
 />
 <div className="mt-8"><TokenCard /></div>
 </div>
 <div>
 <Erc3643Table />
 <Fx delay={150}>
 <div className="mt-6"><PushNotification body="Transfer approved, counterparty KYC verified on-chain (ERC-3643)." time="1m" delay={500} /></div>
 </Fx>
 </div>
 </div>
 </section>

 {/* ============ MOBILE APP SHOWCASE ============ */}
 <section className="border-y border-hairline bg-white py-14 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="In your pocket"
 title="The whole portfolio, one square foot at a time."
 lede="Browse, invest, collect rent, resell, and ask the AI, the SBX Prime app puts an institutional back office on your phone."
 center
 />
 <Fx delay={120} className="mt-10"><AppShowcase /></Fx>
 </div>
 </section>

 {/* ============ DASHBOARD / SOCIAL PROOF ============ */}
 <section className="py-14 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="Your command centre"
 title="Institutional reporting, not a crypto casino."
 lede="Track value and rent, vote on asset decisions, and resell on the secondary marketplace, from one dashboard."
 center
 />
 <Fx scale delay={120} className="mx-auto mt-9 max-w-5xl">
 <DashboardMockup />
 </Fx>
 <div className="mx-auto mt-9 grid max-w-4xl gap-5 sm:grid-cols-3">
 {[
 ["“Finally a structure I could explain to my compliance officer in one sentence.”", "Family office principal, Dubai"],
 ["“The 1 sq ft standard makes cross-market comparison trivial. That's the unlock.”", "Private banker, Singapore"],
 ["“Monthly USDC rent, on time, with a statement. That's all I wanted.”", "Early pledge investor, London raise"],
 ].map(([quote, who], i) => (
 <Fx key={who} delay={i * 100} scale>
 <figure className="card-dark gloss h-full p-5">
 <blockquote className="text-sm leading-relaxed text-ink/70">{quote}</blockquote>
 <figcaption className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-brand">{who}</figcaption>
 </figure>
 </Fx>
 ))}
 </div>
 </div>
 </section>

 {/* ============ FAQ ============ */}
 <section className="border-t border-hairline bg-white py-14">
 <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr]">
 <SectionHead
 eyebrow="Questions"
 title="Answered like a bank would."
 lede="The essentials, the full FAQ covers eligibility, tax, custody, and the pledge process in detail."
 />
 <div>
 <FaqAccordion items={FAQ_CATEGORIES[0].items.slice(0, 4)} />
 <Fx className="mt-6"><Link to="/faq" className="btn-ghost">Read the full FAQ</Link></Fx>
 </div>
 </div>
 </section>

 {/* ============ FINAL CTA ============ */}
 <section className="relative overflow-hidden py-16 lg:py-20">
 <NodeBackground opacity={0.3} />
 <div className="shell relative text-center">
 <Fx>
 <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
 Own a piece of <span className="text-brand">{LONDON.asset}</span>, from one square foot.
 </h2>
 <p className="lede mx-auto">
 {pct}% pledged · {RAISE.tokensRemaining.toLocaleString()} sq ft remaining · pledge now, verify at closing.
 </p>
 <div className="mt-8 flex flex-wrap justify-center gap-3">
 <Link to="/register" className="btn-primary">Pledge your allocation</Link>
 <Link to="/whitepaper" className="btn-ghost">Download the whitepaper</Link>
 </div>
 </Fx>
 </div>
 </section>

 <InterestModal open={!!modal} initialCity={modal} onClose={() => setModal(null)} />
 </>
 );
}
