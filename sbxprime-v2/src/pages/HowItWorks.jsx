import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import StepsFlow from "../components/StepsFlow";
import Erc3643Table from "../components/Erc3643Table";
import PushNotification from "../components/PushNotification";
import NodeBackground from "../components/NodeBackground";
import { PhoneFan, WebShowcase } from "../components/mockups";
import { Fx, SectionHead } from "../components/ui";

export default function HowItWorks() {
 return (
 <>
 <Seo
 title="How It Works, The Investor Journey | SBX Prime"
 description="Discover, pledge, verify, own, earn. How SBX Prime turns trophy commercial real estate into ERC-3643 security tokens with monthly USDC rent and a compliant secondary market."
 path="/how-it-works"
 />
 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.3} />
 <div className="shell relative py-12 lg:py-16">
 <SectionHead
 eyebrow="How it works"
 title="Five steps from browsing to a rent payment."
 lede="The full investor journey, built so that nothing irreversible happens until you've verified and the raise has closed."
 center
 />

 {/* explainer video (same as the original site) */}
 <Fx scale delay={120} className="mx-auto mt-12 max-w-3xl">
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

 <div className="mt-16"><StepsFlow /></div>
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
 <Fx scale delay={140} className="mt-12"><PhoneFan /></Fx>
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

 <section className="py-14">
 <div className="shell grid items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
 <div>
 <SectionHead
 eyebrow="Under the hood"
 title="Why the token standard matters."
 lede="ERC-3643 makes compliance a property of the asset itself. That's what lets a security trade globally without becoming a regulatory accident."
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
