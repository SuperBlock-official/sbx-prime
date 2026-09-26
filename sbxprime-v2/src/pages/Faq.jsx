import Seo from "../lib/Seo";
import { FAQ_CATEGORIES, FAQ_FLAT } from "../data/faqs";
import FaqAccordion from "../components/FaqAccordion";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead } from "../components/ui";
import PersonaFrame from "../components/PersonaFrame";
import investorA from "../assets/people/crypto.jpg";

const jsonLd = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: FAQ_FLAT.map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
};

export default function Faq() {
 return (
 <>
 <Seo
 title="FAQ | SBX Prime"
 description="Everything investors ask about SBX Prime: eligibility, the pledge process, ERC-3643 tokens, rental distributions, the secondary market, custody, and risk."
 path="/faq"
 jsonLd={jsonLd}
 />
 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.3} />
 <div className="shell relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
 <SectionHead
 title="Asked and answered."
 lede="If it isn't covered here, email hello@sbxprime.com, a human replies."
 />
 <Fx scale delay={120} className="hidden sm:block">
 <PersonaFrame src={investorA} alt="An SBX Prime investor" className="mx-auto max-w-[300px]" />
 </Fx>
 </div>
 </section>
 <section className="py-14">
 <div className="shell max-w-3xl space-y-12">
 {FAQ_CATEGORIES.map((cat, ci) => (
 <div key={cat.category}>
 <h2 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-dark">{cat.category}</h2>
 <FaqAccordion items={cat.items} defaultOpen={ci === 0 ? 0 : -1} />
 </div>
 ))}
 </div>
 </section>
 </>
 );
}
