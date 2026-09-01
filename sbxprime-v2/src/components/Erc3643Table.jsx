import { Fx } from "./ui";

const CAPS = [
 ["Identity bound to the token (on-chain KYC)", true, false],
 ["Transfers restricted to verified investors", true, false],
 ["Recognised compliant-token standard", true, false],
 ["Issuer can recover tokens if keys are lost", true, false],
 ["Regulator-visible cap table at all times", true, false],
 ["Anyone can hold or move it anonymously", false, true],
];

function Check() {
 return (
 <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/12 text-brand-dark">
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 12l5 5L20 6" />
 </svg>
 </span>
 );
}
function Cross() {
 return (
 <span className="grid h-5 w-5 place-items-center rounded-full bg-[#c0492f]/12 text-[#c0492f]">
 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
 <path d="M6 6l12 12M18 6L6 18" />
 </svg>
 </span>
 );
}

/** Editorial "versus" comparison, SBX Prime (ERC-3643) against plain ERC-20. */
export default function Erc3643Table() {
 return (
 <div className="grid gap-4 sm:grid-cols-2">
 {/* ERC-3643, highlighted brand card */}
 <Fx scale>
 <div className="relative h-full overflow-hidden rounded-2xl border border-brand/30 bg-white p-6 shadow-[0_24px_50px_-30px_rgba(31,180,98,0.5)]">
 <span className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-white">
 SBX Prime
 </span>
 <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark">Standard</p>
 <h3 className="mt-1 font-display text-2xl font-extrabold text-ink">ERC-3643</h3>
 <p className="mt-1 text-sm text-ink/60">Permissioned token</p>
 <ul className="mt-5 space-y-3">
 {CAPS.map(([cap, a]) => (
 <li key={cap} className="flex items-start gap-3">
 {a ? <Check /> : <Cross />}
 <span className={`text-sm leading-snug ${a ? "text-ink" : "text-ink/45 line-through decoration-ink/20"}`}>{cap}</span>
 </li>
 ))}
 </ul>
 </div>
 </Fx>

 {/* ERC-20, muted card */}
 <Fx scale delay={90}>
 <div className="h-full rounded-2xl border border-hairline bg-mist p-6">
 <span className="inline-block rounded-full bg-ink/8 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-ink/50">
 Typical crypto
 </span>
 <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Standard</p>
 <h3 className="mt-1 font-display text-2xl font-extrabold text-ink/70">ERC-20</h3>
 <p className="mt-1 text-sm text-ink/50">Plain fungible token</p>
 <ul className="mt-5 space-y-3">
 {CAPS.map(([cap, b]) => (
 <li key={cap} className="flex items-start gap-3">
 {b ? <Check /> : <Cross />}
 <span className={`text-sm leading-snug ${b ? "text-ink/70" : "text-ink/40"}`}>{cap}</span>
 </li>
 ))}
 </ul>
 </div>
 </Fx>
 </div>
 );
}
