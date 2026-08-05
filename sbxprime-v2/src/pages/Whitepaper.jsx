import { useState } from "react";
import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead } from "../components/ui";
import { registerInterest } from "../lib/api";

const CHAPTERS = [
 "The access problem in institutional real estate",
 "1 token = 1 sq ft = 1 SPV share, the structure",
 "ERC-3643 and on-chain compliance",
 "Underwriting standards & the London launch asset",
 "Rental distribution mechanics (USDC, monthly)",
 "Secondary market & liquidity design",
 "Risk factors and investor protections",
];

export default function Whitepaper() {
 const [email, setEmail] = useState("");
 const [state, setState] = useState("idle");
 const ok = /\S+@\S+\.\S+/.test(email);

 const submit = async (e) => {
 e.preventDefault();
 if (!ok || state === "sending") return;
 setState("sending");
 await registerInterest({ email, cities: [], indicativeAmount: "whitepaper-download" });
 setState("done");
 };

 return (
 <>
 <Seo
 title="Whitepaper | SBX Prime"
 description="The SBX Prime whitepaper: structure, token standard, underwriting, distribution mechanics, liquidity design, and risk factors. Free download for qualified investors."
 path="/whitepaper"
 />
 <section className="relative overflow-hidden">
 <NodeBackground opacity={0.3} />
 <div className="shell relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
 <div>
 <SectionHead
 eyebrow="Whitepaper"
 title="The full structure, in writing."
 lede="Forty pages covering the legal architecture, the token standard, the underwriting, and the risks, written for investors and their advisers, not for hype."
 />
 <ul className="mt-8 space-y-3">
 {CHAPTERS.map((c, i) => (
 <Fx as="li" key={c} delay={i * 60} className="flex items-center gap-3 text-sm text-ink/65">
 <span className="font-display text-xs font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
 {c}
 </Fx>
 ))}
 </ul>
 </div>

 <Fx scale delay={120}>
 <div className="card-dark p-7">
 {state === "done" ? (
 <div className="text-center">
 <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/15 font-display text-xl text-brand">✓</span>
 <h3 className="mt-3 font-display text-lg font-bold">Check your inbox</h3>
 <p className="mt-2 text-sm text-ink/60">
 The whitepaper is on its way to <b className="text-ink">{email}</b>.
 </p>
 </div>
 ) : (
 <form onSubmit={submit}>
 <h3 className="font-display text-lg font-bold">Download the whitepaper</h3>
 <p className="mt-1.5 text-xs text-ink/55">
 Gated only by email, we'll also tell you when new assets open.
 </p>
 <input
 className="field mt-5" type="email" placeholder="Work email" value={email}
 onChange={(e) => setEmail(e.target.value)} aria-label="Email" required
 />
 <button type="submit" disabled={!ok || state === "sending"} className="btn-primary mt-4 w-full disabled:opacity-40">
 {state === "sending" ? "Sending…" : "Email me the PDF"}
 </button>
 <p className="mt-3 text-center text-[11px] text-ink/40">No spam. Unsubscribe anytime.</p>
 </form>
 )}
 </div>
 </Fx>
 </div>
 </section>
 </>
 );
}
