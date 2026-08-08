import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import PartnerStrip from "../components/PartnerStrip";
import PushNotification from "../components/PushNotification";
import { Fx, SectionHead } from "../components/ui";

const LAYERS = [
 {
 h: "Asset level",
 items: [
 ["Single-asset SPV", "Each property is ring-fenced in its own English-law SPV. Tokens are shares in that vehicle, your claim survives anything that happens to the platform."],
 ["Institutional management", "Buildings run under mandate with CBRE-calibre agents: leasing, insurance, service charge, planned maintenance."],
 ["Independent valuation", "RICS-standard valuations at acquisition and every 3 to 6 months thereafter, depending on the asset, published to token holders."],
 ["Segregated funds", "Subscriptions settle through client-money accounts / on-chain escrow with pre-defined release conditions."],
 ],
 },
 {
 h: "Platform level",
 items: [
 ["ERC-3643 tokens", "Identity-bound security tokens. Transfers settle only between verified investors, enforced by the contract."],
 ["Key recovery", "Lost keys don't mean lost property. The issuer can reissue tokens to your verified identity after checks."],
 ["Institutional infrastructure", "Deployed on Polygon with AWS and Azure redundancy; smart contracts independently audited before issuance."],
 ["On-chain register mirror", "The SPV shareholder register and the token ledger are reconciled continuously, one source of truth."],
 ],
 },
 {
 h: "Regulatory",
 items: [
 ["Compliance-first structure", "Every property is issued as a security to eligible investors only, structured with regulatory counsel across the jurisdictions we operate in."],
 ["Eligibility gating", "This launch is offered under Regulation S to investors outside the US, UK, and Europe. US, UK, and EEA/EU persons are excluded for this launch, enforced at KYC and on-chain."],
 ["Full KYC/AML", "Bank-grade identity, sanctions, and source-of-funds screening before any settlement."],
 ["Professional advisers", "Structuring and audit support from Big-Four-calibre firms across the jurisdictions we operate in."],
 ],
 },
];

/* What token holders vote on — the DAO's remit over each asset. */
const GOVERNANCE = [
 ["Disposal & exit", "When to sell an asset, at what reserve, and how proceeds are distributed."],
 ["Refinancing & leverage", "Whether to place, refinance, or repay debt against the building."],
 ["Major capital works", "Large refurbishments and capex above a set threshold, with budgets."],
 ["Managing agent", "Appointing, reviewing, or replacing the institutional managing agent."],
 ["Distribution policy", "How much net income is distributed versus reserved for the asset."],
 ["Revaluation cadence", "How often the independent RICS valuation is commissioned and published."],
];

/* How a governed decision moves from idea to on-chain execution. */
const GOV_FLOW = [
 ["Propose", "Any holder above the proposal threshold can raise an on-chain proposal with a full rationale and budget."],
 ["Vote", "One token equals one vote. Voting runs for a fixed window; quorum and majority thresholds are set per decision type."],
 ["Timelock", "Passed proposals enter a timelock so every holder can see what is about to execute before it does."],
 ["Execute", "The action executes on-chain and against the SPV, with the treasury and outcome recorded transparently."],
];

/* The full institutional lifecycle SBX Prime runs for every asset. */
const LIFECYCLE = [
 ["Source", "Off-market and on-market sourcing of institutional-grade assets in target cities.", "SBX"],
 ["Acquire & structure", "Due diligence, independent valuation, and transfer into a ring-fenced English-law SPV.", "SBX"],
 ["Tokenize", "The SPV is issued as ERC-3643 tokens: one token = one square foot = one share.", "SBX"],
 ["Operate & lease", "CBRE-calibre management: rent collection, service charge, leasing, reviews and maintenance.", "SBX"],
 ["Report & distribute", "Monthly USDC distributions and transparent reporting, on-chain and in-app.", "SBX"],
 ["Revalue", "Independent RICS valuation every 3 to 6 months, published to every holder.", "SBX"],
 ["Govern", "Holders vote on disposal, refinancing, major capex, and manager appointments.", "DAO"],
 ["Exit & return", "The asset is sold on a governed mandate and net proceeds are distributed pro-rata.", "DAO"],
];

export default function Trust() {
 return (
 <>
 <Seo
 title="Trust & Security | SBX Prime"
 description="Three layers of protection: ring-fenced SPVs and institutional management at asset level, ERC-3643 identity-bound tokens at platform level, and a compliance-first regulatory posture."
 path="/trust"
 />
 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.3} />
 <div className="shell relative py-12 lg:py-14">
 <SectionHead
 eyebrow="Trust & security"
 title="Engineered so you never have to trust us."
 lede="Your ownership doesn't depend on SBX Prime existing. It's structured in three independent layers, asset, platform, and regulatory."
 center
 />
 <Fx delay={160} className="mx-auto mt-8 max-w-sm">
 <PushNotification body="Annual RICS valuation published, Central London asset +4.2% YoY." time="1d" delay={600} />
 </Fx>
 </div>
 </section>

 <section className="py-12 lg:py-14">
 <div className="shell space-y-16">
 {LAYERS.map((layer, li) => (
 <div key={layer.h}>
 <Fx>
 <p className="eyebrow">{`0${li + 1}`}</p>
 <h2 className="mt-2 font-display text-2xl font-extrabold">{layer.h}</h2>
 </Fx>
 <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
 {layer.items.map(([t, b], i) => (
 <Fx key={t} delay={i * 90} scale>
 <div className="group card-dark gloss h-full p-5">
 <span className="icon-spin grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-teal/25 font-display text-sm font-extrabold text-brand">
 {"✓"}
 </span>
 <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{t}</h3>
 <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{b}</p>
 </div>
 </Fx>
 ))}
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* ---------- asset lifecycle ---------- */}
 <section className="border-t border-hairline bg-white py-12 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="Full lifecycle"
 title="We run each asset for its entire life."
 lede="From sourcing to sale, SBX Prime handles the full institutional lifecycle, and hands the biggest decisions to the people who own it. You hold the token; the building is never unmanaged."
 center
 />
 <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
 {LIFECYCLE.map(([t, b, who], i) => (
 <Fx key={t} delay={(i % 4) * 80} scale>
 <div className="card-dark h-full p-6">
 <div className="flex items-center justify-between">
 <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand/40 bg-brand/10 font-display font-extrabold text-brand-dark">
 {i + 1}
 </span>
 <span className={`rounded-full px-2.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.12em] ${who === "DAO" ? "bg-brand-teal/15 text-brand-teal" : "bg-brand/12 text-brand-dark"}`}>
 {who === "DAO" ? "You govern" : "SBX runs"}
 </span>
 </div>
 <h3 className="mt-4 font-display text-base font-bold text-ink">{t}</h3>
 <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{b}</p>
 </div>
 </Fx>
 ))}
 </div>
 </div>
 </section>

 {/* ---------- governance / DAO ---------- */}
 <section className="relative overflow-hidden border-t border-hairline py-12 lg:py-14">
 <NodeBackground opacity={0.2} />
 <div className="shell relative">
 <SectionHead
 eyebrow="Governance · DAO"
 title="A sovereign wealth fund, owned and governed by the people."
 lede="The world's biggest funds are owned by states and institutions. SBX Prime flips that: the people who own the square feet make the decisions that matter, on-chain and one token at a time."
 center
 />

 <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
 {/* what holders decide */}
 <div>
 <h3 className="font-display text-lg font-extrabold text-ink">What token holders decide</h3>
 <div className="mt-6 grid gap-4 sm:grid-cols-2">
 {GOVERNANCE.map(([t, b], i) => (
 <Fx key={t} delay={i * 70} scale className="card-dark p-5">
 <h4 className="font-display text-[15px] font-bold text-ink">{t}</h4>
 <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{b}</p>
 </Fx>
 ))}
 </div>
 </div>

 {/* how a decision is made */}
 <div>
 <h3 className="font-display text-lg font-extrabold text-ink">How a decision is made</h3>
 <ol className="mt-6 space-y-4">
 {GOV_FLOW.map(([t, b], i) => (
 <Fx as="li" key={t} delay={i * 80} className="flex gap-4 rounded-2xl border border-hairline bg-white/70 p-5 backdrop-blur">
 <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-mint font-display text-sm font-extrabold text-white">
 {i + 1}
 </span>
 <div>
 <h4 className="font-display text-[15px] font-bold text-ink">{t}</h4>
 <p className="mt-1 text-[13px] leading-relaxed text-ink/55">{b}</p>
 </div>
 </Fx>
 ))}
 </ol>
 <Fx delay={120} className="mt-5 flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand/[0.06] p-4">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="mt-0.5 shrink-0 text-brand-dark"><path d="M12 8v5M12 16h.01" /><circle cx="12" cy="12" r="9" /></svg>
 <p className="text-[13px] leading-relaxed text-ink/70">
 <b className="text-ink">Governance rolls out in phases.</b> At launch, holders vote on disposal and distribution decisions; the full on-chain remit widens as each asset and the token holder base mature.
 </p>
 </Fx>
 </div>
 </div>
 </div>
 </section>

 <section className="border-t border-hairline bg-white py-10">
 <div className="shell">
 <p className="mb-4 text-center font-display text-[10.5px] font-bold uppercase tracking-[0.28em] text-ink/40">
 Partners & credentials
 </p>
 <PartnerStrip />
 </div>
 </section>
 </>
 );
}
