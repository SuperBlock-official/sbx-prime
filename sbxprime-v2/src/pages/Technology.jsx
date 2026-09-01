import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import PartnerStrip from "../components/PartnerStrip";
import Erc3643Table from "../components/Erc3643Table";
import PushNotification from "../components/PushNotification";
import { Fx, SectionHead, Counter } from "../components/ui";
import { TiltCard } from "../components/cards";
import dashboard from "../assets/mockups/web-dashboard.png";
import webAi from "../assets/mockups/web-ai.png";
import webDao from "../assets/mockups/web-dao.png";
import webSecondary from "../assets/mockups/web-secondary.png";
import appAi from "../assets/mockups/app-ai.png";
import appDao from "../assets/mockups/app-dao.png";
import superblock from "../assets/logos/superblock.png";

/* ---------------- inline icons ---------------- */
const I = {
 building: "M4 21V7l7-4 7 4v14M2 21h20M9 21v-4h6v4M8 10h1M12 10h1M8 13.5h1M12 13.5h1",
 spv: "M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6M9 11h.01M15 11h.01",
 token: "M12 3l7 4v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V7z M9.5 12l1.8 1.8 3.6-3.8",
 investors: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M16 11a3 3 0 10-1-5.8M21 20a6 6 0 00-5-5.9",
 app: "M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM10 18h4",
 shield: "M12 3l7.5 3v6c0 4.4-3.1 8.1-7.5 9.4C7.6 20.1 4.5 16.4 4.5 12V6z M9 12l2.2 2.2L15.4 10",
 contract: "M8 3h8l4 4v14a0 0 0 010 0H4V3zM14 3v4h4M8 12h8M8 16h5",
 cloud: "M7 18a4 4 0 010-8 5 5 0 019.6-1.3A3.5 3.5 0 0117 18z",
 ai: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
 vote: "M9 12l2 2 4-4M12 3a9 9 0 100 18 9 9 0 000-18z",
 swap: "M4 9h13l-3.5-3.5M20 15H7l3.5 3.5",
 chart: "M5 19V11M10 19V6M15 19v-4M20 19V8",
 coin: "M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5A2.5 2.5 0 0112 8c1.4 0 2.5.9 2.5 2M12 8V6.5M12 16v-1.5M9.5 14A2.5 2.5 0 0012 15.5",
 wallet: "M3 7h15a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11M17 12.5h.01",
};
function Icon({ d, className = "h-6 w-6" }) {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
 {d.split("M").filter(Boolean).map((seg, i) => <path key={i} d={"M" + seg} />)}
 </svg>
 );
}
const Connector = () => (
 <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
 <svg viewBox="0 0 60 24" className="h-6 w-14 rotate-90 text-brand/45 lg:rotate-0">
 <path d="M2 12h48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" />
 <path d="M46 6l7 6-7 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
 <circle cx="2" cy="12" r="2.5" fill="currentColor" />
 </svg>
 </div>
);

/* ---------------- tokenization flow ---------------- */
const FLOW = [
 [I.building, "The building", "A fully-let, Grade-A commercial asset, independently valued."],
 [I.spv, "One SPV", "Held in a single-asset, English-law special purpose vehicle."],
 [I.token, "18,036 tokens", "The SPV is minted as ERC-3643 security tokens, one per saleable ft²."],
 [I.investors, "Verified investors", "Tokens settle only to KYC'd, eligible wallets, globally."],
];

function TokenizationFlow() {
 return (
 <div className="flex flex-col items-stretch gap-1 lg:flex-row lg:items-center">
 {FLOW.map(([d, t, s], i) => (
 <div key={t} className="contents">
 <Fx scale delay={i * 90} className="flex-1">
 <div className="card-dark h-full p-5 text-center">
 <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand/12 text-brand-dark">
 <Icon d={d} />
 </span>
 <h3 className="mt-3 font-display text-base font-bold text-ink">{t}</h3>
 <p className="mt-1.5 text-xs leading-relaxed text-ink/55">{s}</p>
 </div>
 </Fx>
 {i < FLOW.length - 1 && <Connector />}
 </div>
 ))}
 </div>
 );
}

/* ---------------- architecture stack ---------------- */
const STACK = [
 [I.app, "Application", "iOS · Android · Web dashboard", "brand"],
 [I.ai, "AI & data", "Prime AI insights · Chainlink price & rent oracles", "teal"],
 [I.shield, "Compliance", "ERC-3643 identity · on-chain KYC/AML · transfer rules", "brand"],
 [I.contract, "Settlement", "Audited smart contracts · USDC escrow · monthly distributions", "teal"],
 [I.cloud, "Infrastructure", "Base · AWS · Azure redundancy", "brand"],
];

function ArchitectureStack() {
 return (
 <div className="space-y-3">
 {STACK.map(([d, t, s, tone], i) => (
 <Fx key={t} delay={i * 70}>
 <div className={`flex items-center gap-4 rounded-2xl border p-4 ${
 tone === "teal" ? "border-brand-teal/25 bg-brand-teal/5" : "border-brand/20 bg-brand/5"
 }`}>
 <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
 tone === "teal" ? "bg-brand-teal/15 text-[#1b7cb5]" : "bg-brand/12 text-brand-dark"
 }`}>
 <Icon d={d} className="h-5 w-5" />
 </span>
 <div className="min-w-0">
 <p className="font-display text-sm font-bold text-ink">{t}</p>
 <p className="mt-0.5 text-xs text-ink/55">{s}</p>
 </div>
 <span className="ml-auto hidden font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/35 sm:block">
 Layer {STACK.length - i}
 </span>
 </div>
 </Fx>
 ))}
 </div>
 );
}

/* ---------------- rent distribution flow ---------------- */
const RENT = [
 [I.building, "Tenant pays rent", "Quarterly, into the SPV"],
 [I.contract, "Smart contract", "Splits net rent pro-rata"],
 [I.coin, "USDC", "Streamed monthly"],
 [I.wallet, "Your wallet", "Auto-credited"],
];
function RentFlow() {
 return (
 <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center">
 {RENT.map(([d, t, s], i) => (
 <div key={t} className="contents">
 <Fx scale delay={i * 80} className="flex-1">
 <div className="rounded-2xl border border-hairline bg-white p-4 text-center">
 <span className="mx-auto grid h-10 w-10 place-items-center rounded-lg bg-brand/12 text-brand-dark">
 <Icon d={d} className="h-5 w-5" />
 </span>
 <p className="mt-2 font-display text-[13px] font-bold text-ink">{t}</p>
 <p className="text-[11px] text-ink/55">{s}</p>
 </div>
 </Fx>
 {i < RENT.length - 1 && <Connector />}
 </div>
 ))}
 </div>
 );
}

/* ---------------- capability feature ---------------- */
function Capability({ icon, title, body, points, img, alt, reverse }) {
 return (
 <div className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "" : ""}`}>
 <Fx className={reverse ? "lg:order-2" : ""}>
 <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/12 text-brand-dark">
 <Icon d={icon} className="h-5 w-5" />
 </span>
 <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">{title}</h3>
 <p className="mt-3 text-sm leading-relaxed text-ink/65">{body}</p>
 <ul className="mt-5 space-y-2.5">
 {points.map((p) => (
 <li key={p} className="flex items-start gap-3 text-sm text-ink/70">
 <span className="mt-0.5 text-brand-dark">✓</span>{p}
 </li>
 ))}
 </ul>
 </Fx>
 <Fx scale delay={120} className={reverse ? "lg:order-1" : ""}>
 <img src={img} alt={alt} className="w-full" loading="lazy" />
 </Fx>
 </div>
 );
}

export default function Technology() {
 return (
 <>
 <Seo
 title="Technology, Powered by SUPERBLOCK | SBX Prime"
 description="How SBX Prime tokenizes trophy real estate: single-asset SPVs, ERC-3643 identity-bound security tokens, audited smart contracts, USDC rent distribution, on-chain governance, and AI insights, on Base."
 path="/technology"
 />

 {/* hero */}
 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.4} />
 <div className="shell relative grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-14">
 <div>
 <Fx>
 <span className="eyebrow">Technology</span>
 <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
 Powered by <span className="text-brand">SUPERBLOCK</span>.
 </h1>
 <p className="lede">
 Every square foot you own is enforced by code: an English-law SPV, an ERC-3643
 identity-bound token, and audited smart contracts that pay your rent in USDC, running
 on institutional-grade infrastructure.
 </p>
 <div className="mt-7 flex flex-wrap items-center gap-6">
 <img src={superblock} alt="SUPERBLOCK" className="h-7 w-auto opacity-80" />
 <div className="flex gap-6">
 {[["99.98%", "Uptime target"], ["<3s", "Settlement"], ["100%", "On-chain register"]].map(([v, l]) => (
 <div key={l}>
 <p className="font-display text-lg font-extrabold text-ink">{v}</p>
 <p className="text-[11px] text-ink/50">{l}</p>
 </div>
 ))}
 </div>
 </div>
 </Fx>
 </div>
 <Fx scale delay={150} className="relative">
 <TiltCard max={6}><img src={dashboard} alt="SBX Prime dashboard" className="w-full" /></TiltCard>
 <div className="absolute -bottom-5 left-2 w-[min(80%,300px)]">
 <PushNotification body="Transfer approved, counterparty KYC verified on-chain (ERC-3643)." time="1m" delay={700} />
 </div>
 </Fx>
 </div>
 </section>

 {/* tokenization flow */}
 <section className="py-14 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="The model"
 title="1 token = 1 sq ft = 1 SPV share."
 lede="Tokenization here isn't a wrapper on a wrapper. It's a direct chain of ownership from the building to your wallet."
 center
 />
 <div className="mt-10"><TokenizationFlow /></div>
 </div>
 </section>

 {/* architecture stack */}
 <section className="border-y border-hairline bg-white py-14 lg:py-14">
 <div className="shell grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
 <SectionHead
 eyebrow="Architecture"
 title="Five layers, one source of truth."
 lede="From the phone in your hand down to the chain, each layer does one job, and the SPV register and token ledger reconcile continuously."
 />
 <ArchitectureStack />
 </div>
 </section>

 {/* ERC-3643 */}
 <section className="py-14 lg:py-14">
 <div className="shell grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
 <div>
 <SectionHead
 eyebrow="The token standard"
 title="A security regulators can live with."
 lede="ERC-3643 binds identity to the token itself. Compliance is enforced by the contract on every transfer, not bolted on afterwards."
 />
 <Fx delay={140} className="mt-7">
 <PushNotification body="You've been paid 1,050 USDC rental income for January 2025" time="now" delay={500} />
 </Fx>
 </div>
 <Erc3643Table />
 </div>
 </section>

 {/* capabilities with mockups */}
 <section className="border-t border-hairline bg-white py-14 lg:py-14">
 <div className="shell space-y-20">
 <SectionHead
 eyebrow="What Superblock powers"
 title="More than a token, a full platform."
 center
 />
 <Capability
 icon={I.ai}
 title="AI-driven insights"
 body="Prime AI is grounded in your holdings and the live listings, it reads your portfolio and the market to answer plainly, without giving advice."
 points={["Real-time valuations and rent projections", "Portfolio-aware, cites your own numbers", "Available in-app and on the web"]}
 img={webAi}
 alt="SBX Prime, Prime AI on the web"
 />
 <Capability
 reverse
 icon={I.vote}
 title="On-chain governance (DAO)"
 body="Material asset decisions, capex, tenant renewals, disposals, go to token-holder votes, weighted by the square feet you own. Transparent and recorded on-chain."
 points={["Vote weight = square feet held", "Proposals for capex, leasing and exits", "Every vote auditable on-chain"]}
 img={webDao}
 alt="SBX Prime, DAO governance on the web"
 />
 <Capability
 icon={I.swap}
 title="A compliant secondary market"
 body="After the raise, list your square feet and accept offers priced per ft². Because tokens are ERC-3643, transfers settle only between verified investors, liquidity without the compliance risk."
 points={["List and sell any time", "Offers priced per square foot", "Transfers restricted to verified wallets"]}
 img={webSecondary}
 alt="SBX Prime, secondary market on the web"
 />
 </div>
 </section>

 {/* mobile mockups band */}
 <section className="py-14 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="In the app"
 title="Governance and AI, in your pocket."
 lede="The same on-chain machinery, delivered as a consumer-grade app."
 center
 />
 <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
 {[[appAi, "Prime AI"], [appDao, "DAO voting"]].map(([img, label], i) => (
 <Fx key={label} scale delay={i * 120}>
 <figure className="text-center">
 <img src={img} alt={`SBX Prime app, ${label}`} className="w-[250px]" loading="lazy" />
 <figcaption className="-mt-1 font-display text-sm font-bold text-ink">{label}</figcaption>
 </figure>
 </Fx>
 ))}
 </div>
 </div>
 </section>

 {/* rent distribution flow */}
 <section className="border-y border-hairline bg-white py-14 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="Rent, automated"
 title="How the money reaches you."
 lede="No invoices, no waiting. A smart contract splits net rent by ownership and streams it to your wallet in USDC, every month."
 center
 />
 <div className="mx-auto mt-9 max-w-4xl"><RentFlow /></div>
 </div>
 </section>

 {/* infrastructure partners */}
 <section className="py-14">
 <div className="shell">
 <p className="mb-4 text-center font-display text-[10.5px] font-bold uppercase tracking-[0.28em] text-ink/40">
 Built on institutional infrastructure
 </p>
 <PartnerStrip />
 </div>
 </section>

 {/* CTA */}
 <section className="border-t border-hairline bg-white py-14 text-center">
 <div className="shell">
 <Fx>
 <h2 className="h-section mx-auto max-w-2xl">The technology is ready. The asset launches soon.</h2>
 <p className="lede mx-auto">
 <Counter value={18036} /> sq ft of Central London, tokenized under ERC-3643.
 </p>
 <div className="mt-8 flex flex-wrap justify-center gap-3">
 <Link to="/invest/london" className="btn-primary">View the London asset</Link>
 <Link to="/whitepaper" className="btn-ghost">Read the whitepaper</Link>
 </div>
 </Fx>
 </div>
 </section>
 </>
 );
}
