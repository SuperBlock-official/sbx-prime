import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import StepsFlow from "../components/StepsFlow";
import Erc3643Table from "../components/Erc3643Table";
import PushNotification from "../components/PushNotification";
import NodeBackground from "../components/NodeBackground";
import { PhoneFan, WebShowcase } from "../components/mockups";
import { Fx, SectionHead } from "../components/ui";
import { Icon } from "../components/icons";
import SpotlightGrid from "../components/SpotlightGrid";

export default function HowItWorks() {
 return (
 <>
 <Seo
 title="How It Works, The Investor Journey | SBX Prime"
 description="Discover, pledge, verify, own, earn. How SBX Prime turns trophy commercial real estate into ERC-3643 tokens with monthly USDC rent and a compliant secondary market."
 path="/how-it-works"
 />
 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.3} />
 <div className="shell relative py-12 lg:py-14">
 <SectionHead
 eyebrow="How it works"
 title="Five steps from browsing to a rent payment."
 lede="The full investor journey, built so that nothing irreversible happens until you've verified and the raise has closed."
 center
 />

 {/* explainer video (same as the original site) */}
 <Fx scale delay={120} className="mx-auto mt-10 max-w-3xl">
 <div className="shot overflow-hidden bg-ink" style={{ aspectRatio: "16 / 9" }}>
 <iframe
 className="h-full w-full"
 src="https://www.youtube-nocookie.com/embed/YUW7xZBEw_Y?rel=0"
 title="How SBX Prime works"
 loading="lazy"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowFullScreen
 />
 </div>
 </Fx>

 <div className="mt-10"><StepsFlow /></div>
 </div>
 </section>

 <section className="py-14">
 <div className="shell">
 <SectionHead
 eyebrow="The app"
 title="Discover → Verify → Invest."
 lede="The same three moments, on your phone. Browse standardised listings, complete verification once, and build a portfolio square foot by square foot."
 center
 />
 <Fx scale delay={140} className="mt-9"><PhoneFan /></Fx>
 </div>
 </section>

 <section className="border-y border-hairline bg-white py-14">
 <div className="shell">
 <SectionHead
 eyebrow="On the web"
 title="A full institutional back office."
 lede="Everything the app does, with the depth a professional investor expects, reporting, rent statements, and a compliant secondary market."
 />
 <Fx scale delay={140} className="mt-10"><WebShowcase /></Fx>
 </div>
 </section>

 {/* ---------- management & reporting ---------- */}
 <section className="py-12 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="Institutional-grade"
 title="Managed and reported like a fund."
 lede="Owning a square foot should feel like owning a unit in an institutional fund, not a DIY landlord problem. We run the building and report on it to the standard a professional investor expects."
 center
 />
 <SpotlightGrid className="mt-10 grid gap-6 lg:grid-cols-2">
 <Fx scale className="card-dark p-7">
 <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-teal/25 text-brand-dark">
 <Icon name="building" className="h-5 w-5" />
 </span>
 <h3 className="mt-4 font-display text-lg font-extrabold text-ink">How we manage the building</h3>
 <ul className="mt-4 space-y-3">
 {[
 ["Rent collection & arrears", "Monthly collection, chasing and reconciliation, so income arrives predictably."],
 ["Leasing & rent reviews", "New lettings, renewals and upward-only reviews handled to grow income."],
 ["Service charge & maintenance", "Planned and reactive maintenance, budgets managed with the agent."],
 ["Insurance & compliance", "Buildings insurance, health-and-safety and regulatory compliance kept current."],
 ["Capital works", "Refurbishment and capex planned to protect and grow the asset's value."],
 ].map(([t, b]) => (
 <li key={t} className="flex gap-3">
 <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-dark"><Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
 <span><b className="font-display text-sm font-bold text-ink">{t}.</b> <span className="text-[13px] leading-relaxed text-ink/55">{b}</span></span>
 </li>
 ))}
 </ul>
 </Fx>

 <Fx scale delay={100} className="card-dark p-7">
 <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-teal/25 text-brand-dark">
 <Icon name="chart" className="h-5 w-5" />
 </span>
 <h3 className="mt-4 font-display text-lg font-extrabold text-ink">What you receive</h3>
 <ul className="mt-4 space-y-3">
 {[
 ["Monthly rent statement", "Your pro-rata USDC distribution with a clear income breakdown."],
 ["Quarterly asset report", "Occupancy, leasing activity, arrears and outlook for each building you own."],
 ["Independent valuation", "RICS-standard revaluation every 3 to 6 months, published to holders."],
 ["Annual audited accounts", "The SPV's audited financial statements, once a year."],
 ["On-chain distribution ledger", "Every payment recorded on-chain, reconcilable against the token register."],
 ["Tax reporting pack", "Year-end summaries to make your own reporting straightforward."],
 ].map(([t, b]) => (
 <li key={t} className="flex gap-3">
 <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-dark"><Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
 <span><b className="font-display text-sm font-bold text-ink">{t}.</b> <span className="text-[13px] leading-relaxed text-ink/55">{b}</span></span>
 </li>
 ))}
 </ul>
 </Fx>
 </SpotlightGrid>
 </div>
 </section>

 <section className="border-t border-hairline bg-white py-14">
 <div className="shell grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
 <div>
 <SectionHead
 eyebrow="Under the hood"
 title="Why the token standard matters."
 lede="ERC-3643 makes compliance a property of the asset itself. That's what lets a token trade globally without becoming a regulatory accident."
 />
 <Fx delay={150} className="mt-7">
 <PushNotification body="Transfer approved, counterparty KYC verified on-chain (ERC-3643)." time="1m" delay={500} />
 </Fx>
 </div>
 <Erc3643Table />
 </div>
 </section>

 <section className="border-t border-hairline bg-white py-14 text-center">
 <div className="shell">
 <Fx>
 <h2 className="h-section mx-auto max-w-2xl">Ready to hold your first square foot?</h2>
 <div className="mt-8 flex flex-wrap justify-center gap-3">
 <Link to="/invest/london" className="btn-primary">View the London asset</Link>
 <Link to="/faq" className="btn-ghost">Read the FAQ</Link>
 </div>
 </Fx>
 </div>
 </section>
 </>
 );
}
