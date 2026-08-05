import Seo from "../lib/Seo";
import PledgeModule from "../components/PledgeModule";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead } from "../components/ui";

export default function Register() {
 return (
 <>
 <Seo
 title="Pledge Your Allocation | SBX Prime"
 description="Reserve your allocation in the Central London launch. Pledge by USDC amount or square feet, no KYC, no wallet, no funds move until closing."
 path="/register"
 />
 <section className="relative overflow-hidden">
 <NodeBackground opacity={0.3} />
 <div className="shell relative grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-14">
 <div>
 <SectionHead
 eyebrow="Pledge"
 title="Reserve your square feet in ninety seconds."
 lede="A pledge holds your place in the upcoming Central London launch. No KYC today, no wallet, no payment, verification and settlement happen at closing."
 />
 <ul className="mt-8 space-y-4 text-sm text-ink/60">
 {[
 "Pledge by dollar amount or by square feet, your choice.",
 "See your estimated rent (6–7% p.a.) and appreciation (3–5% p.a.) instantly.",
 "Amend or withdraw any time before allocation closes.",
 "Early pledges get priority allocation if the launch oversubscribes.",
 ].map((t, i) => (
 <Fx as="li" key={t} delay={i * 80} className="flex gap-3">
 <span className="font-display font-bold text-brand">→</span>{t}
 </Fx>
 ))}
 </ul>
 </div>
 <Fx delay={120}><PledgeModule /></Fx>
 </div>
 </section>
 </>
 );
}
