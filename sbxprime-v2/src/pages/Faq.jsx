import Seo from "../lib/Seo";
import { FAQ_CATEGORIES, FAQ_FLAT } from "../data/faqs";
import FaqAccordion from "../components/FaqAccordion";
import NodeBackground from "../components/NodeBackground";
import { SectionHead } from "../components/ui";

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
 <div className="shell relative py-16">
 <SectionHead
 eyebrow="FAQ"
 title="Asked and answered."
 lede="If it isn't covered here, email hello@sbxprime.com, a human replies."
 center
 />
 </div>
 </section>
 <section className="py-14">
 <div className="shell max-w-3xl space-y-12">
 {FAQ_CATEGORIES.map((cat, ci) => (
 <div key={cat.category}>
 <h2 className="eyebrow mb-5">{cat.category}</h2>
 <FaqAccordion items={cat.items} defaultOpen={ci === 0 ? 0 : -1} />
 </div>
 ))}
 </div>
 </section>
 </>
 );
}
