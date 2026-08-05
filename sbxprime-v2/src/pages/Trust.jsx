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
 ["Eligibility gating", "Qualified, professional, and accredited investors only. No US persons, no UK/EEA retail, enforced at KYC and on-chain."],
 ["Full KYC/AML", "Bank-grade identity, sanctions, and source-of-funds screening before any settlement."],
 ["Professional advisers", "Structuring and audit support from Big-Four-calibre firms across the jurisdictions we operate in."],
 ],
 },
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
 <div className="shell relative py-12 lg:py-16">
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

 <section className="py-12 lg:py-16">
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
