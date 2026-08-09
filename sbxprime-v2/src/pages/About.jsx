import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import PartnerStrip from "../components/PartnerStrip";
import { Fx, SectionHead } from "../components/ui";
import { Icon } from "../components/icons";
import mark from "../assets/images/sbx-mark-round.svg";
import peopleImg from "../assets/assets/people-office.jpg";
import aboutHero from "../assets/assets/about-hero-london.jpg";

export default function About() {
 return (
 <>
 <Seo
 title="About, SBX Prime by SUPERBLOCK"
 description="SBX Prime is built by SUPERBLOCK and a team of specialists across finance, real estate, technology, transformation, accounting and audit, working with the world's best builders, to give investors direct, compliant ownership of trophy commercial real estate."
 path="/about"
 />
 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.3} />
 <div className="shell relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-16">
 <SectionHead
 eyebrow="About"
 title="Institutional real estate, without the institution-sized ticket."
 lede="SBX Prime exists because the best buildings in the world were only ever available in $50M pieces. We cut them into square feet, without cutting the legal substance."
 />
 <Fx scale delay={120} className="relative">
 <img
 src={aboutHero}
 alt="Prime Central London period architecture and skyline at golden hour"
 className="h-[280px] w-full rounded-3xl border border-hairline object-cover shadow-[0_45px_90px_-40px_rgba(15,45,32,.4)] sm:h-[360px]"
 />
 <div className="absolute bottom-4 left-4 rounded-xl border border-white/50 bg-white/80 px-3 py-1.5 backdrop-blur-md">
 <p className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">Central London</p>
 </div>
 </Fx>
 </div>
 </section>

 {/* ---------- vision & mission ---------- */}
 <section className="border-b border-hairline bg-white py-12 lg:py-14">
 <div className="shell">
 <Fx className="mx-auto max-w-4xl text-center">
 <p className="eyebrow mx-auto">Vision</p>
 <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl">
 A sovereign wealth fund, <span className="text-brand">owned and governed by the people</span>.
 </h2>
 <p className="lede mx-auto">
 The world's largest pools of real assets belong to states and institutions. We think the same
 quality of investing, the best buildings, underwritten properly and held for the long term,
 should belong to individuals, and be governed by the people who own it.
 </p>
 </Fx>
 <div className="mx-auto mt-9 grid max-w-4xl gap-6 sm:grid-cols-2">
 <Fx scale className="card-dark p-7">
 <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand-dark">Mission</p>
 <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
 Give qualified investors direct, compliant, and governed ownership of the world's trophy
 real estate, one square foot at a time, with the underwriting standards of an institution.
 </p>
 </Fx>
 <Fx scale delay={100} className="card-dark p-7">
 <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand-dark">How we get there</p>
 <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
 One standard unit (1 token = 1 sq ft = 1 SPV share), ring-fenced legal structure, monthly
 USDC income, and on-chain governance that hands the biggest decisions back to token holders.
 </p>
 </Fx>
 </div>
 </div>
 </section>

 {/* ---------- team & partners ---------- */}
 <section className="py-12 lg:py-14">
 <div className="shell">
 <SectionHead
 eyebrow="The team"
 title="A team effort, not a solo act."
 lede="SBX Prime isn't one person. It's a team of specialists and partners brought together across every discipline a serious real-estate platform needs, working with some of the world's best builders."
 />
 <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
 {[
 ["chart", "Finance & capital markets", "Underwriting, structuring, and investor advisory from institutional-grade desks."],
 ["building", "Real estate", "Sourcing, RICS valuation, and asset management of prime commercial buildings."],
 ["node", "Technology & blockchain", "The tokenization engine, ERC-3643 identity, and on-chain settlement."],
 ["refresh", "Transformation", "Turning a traditional asset class into a digital, accessible product."],
 ["doc", "Accounting & audit", "Ring-fenced SPV accounts and independent audits by established firms."],
 ["layers", "The world's best builders", "Working with world-class developers, agents, and construction partners."],
 ].map(([ic, t, b], i) => (
 <Fx key={t} delay={(i % 3) * 80} scale className="card-dark h-full p-6">
 <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-teal/25 text-brand-dark">
 <Icon name={ic} className="h-5 w-5" />
 </span>
 <h3 className="mt-4 font-display text-base font-bold text-ink">{t}</h3>
 <p className="mt-2 text-sm leading-relaxed text-ink/60">{b}</p>
 </Fx>
 ))}
 </div>

 {/* built by SUPERBLOCK */}
 <Fx delay={120} className="mt-6">
 <div className="card-dark flex flex-col gap-4 p-7 sm:flex-row sm:items-center">
 <div className="flex shrink-0 items-center gap-4">
 <img src={mark} alt="" className="h-12 w-12" />
 <h3 className="font-display text-xl font-extrabold">Built by SUPERBLOCK</h3>
 </div>
 <p className="text-sm leading-relaxed text-ink/60 sm:border-l sm:border-hairline sm:pl-6">
 SUPERBLOCK is the technology company behind SBX Prime: the tokenization engine, the ERC-3643
 identity layer, on-chain register reconciliation, and the distribution rails that pay rent in
 USDC every month, on Polygon with AWS and Azure infrastructure.
 </p>
 </div>
 </Fx>
 </div>
 </section>

 {/* people band */}
 <section className="border-t border-hairline py-12 lg:py-14">
 <div className="shell">
 <Fx scale className="relative overflow-hidden rounded-[28px] border border-hairline">
 <img
 src={peopleImg}
 alt="The SBX Prime community, investors and the team behind the platform"
 className="h-[280px] w-full object-cover object-center sm:h-[420px]"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
 <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
 <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mint">Who this is for</p>
 <h2 className="mt-2 max-w-2xl font-display text-2xl font-extrabold text-white sm:text-3xl">
 For the people who've been priced out of the world's best buildings.
 </h2>
 <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
 Owning prime real estate used to mean writing an eight-figure cheque. We built SBX Prime so it can
 start at a single square foot, for a global community, not just institutions.
 </p>
 </div>
 </Fx>
 </div>
 </section>

 <section className="border-t border-hairline bg-white py-10">
 <div className="shell"><PartnerStrip /></div>
 </section>
 </>
 );
}
