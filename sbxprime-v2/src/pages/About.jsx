import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import PartnerStrip from "../components/PartnerStrip";
import { Fx, SectionHead } from "../components/ui";
import mark from "../assets/images/sbx-mark-round.svg";
import peopleImg from "../assets/assets/people-office.jpg";
import aboutHero from "../assets/assets/about-hero-london.jpg";

export default function About() {
 return (
 <>
 <Seo
 title="About, SBX Prime by SUPERBLOCK"
 description="SBX Prime is built by SUPERBLOCK and founded by Umair Ahmad (ex-MSCI, ex-JLL) to give qualified investors direct, compliant ownership of trophy commercial real estate."
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

 <section className="py-12 lg:py-14">
 <div className="shell grid gap-10 lg:grid-cols-[1fr_1.2fr]">
 <Fx scale>
 <div className="card-dark gloss p-7">
 <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/30 to-brand-teal/30 font-display text-2xl font-extrabold text-brand">
 UA
 </div>
 <h2 className="mt-5 font-display text-2xl font-extrabold">Umair Ahmad</h2>
 <p className="font-display text-sm font-bold text-brand">Founder & CEO</p>
 <p className="mt-4 text-sm leading-relaxed text-ink/60">
 Umair spent his career on the institutional side of the table, real estate indices and risk
 analytics at <b className="text-ink">MSCI</b>, then capital markets and investor advisory at{" "}
 <b className="text-ink">JLL</b>. SBX Prime is the product he kept waiting for someone else to
 build: the underwriting standards of an institution, delivered at the ticket size of an individual.
 </p>
 <p className="mt-4 text-sm italic leading-relaxed text-ink/50">
 “Tokenization doesn't need more tokens. It needs better buildings, cleaner structures, and
 paperwork a regulator can love.”
 </p>
 </div>
 </Fx>

 <div className="space-y-6">
 <Fx delay={100}>
 <div className="card-dark p-7">
 <div className="flex items-center gap-4">
 <img src={mark} alt="" className="h-12 w-12" />
 <h2 className="font-display text-xl font-extrabold">Built by SUPERBLOCK</h2>
 </div>
 <p className="mt-4 text-sm leading-relaxed text-ink/60">
 SUPERBLOCK is the technology company behind SBX Prime: the tokenization engine, the ERC-3643
 identity layer, the on-chain register reconciliation, and the distribution rails that pay rent
 in USDC every month. The platform runs on Polygon with AWS and Azure infrastructure.
 </p>
 </div>
 </Fx>
 <div className="grid gap-5 sm:grid-cols-3">
 {[
 ["Ex-MSCI · Ex-JLL", "Founding team from index, risk, and capital-markets desks."],
 ["Compliance-first", "Securities issued to eligible investors only; eligibility enforced on-chain."],
 ["1 sq ft standard", "One comparable unit across every market we open."],
 ].map(([t, b], i) => (
 <Fx key={t} delay={i * 90} scale>
 <div className="group card-dark gloss h-full p-5">
 <span className="icon-spin grid h-9 w-9 place-items-center rounded-lg bg-brand/15 text-brand">◆</span>
 <p className="mt-3 font-display text-sm font-bold text-ink">{t}</p>
 <p className="mt-1.5 text-xs leading-relaxed text-ink/55">{b}</p>
 </div>
 </Fx>
 ))}
 </div>
 </div>
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
