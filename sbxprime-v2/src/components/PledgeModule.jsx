import { useMemo, useState } from "react";
import { RAISE, submitPledge } from "../lib/api";
import { Counter } from "./ui";

const fmtUsd = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const COUNTRIES = [
 "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Singapore", "Hong Kong SAR",
 "Switzerland", "United Kingdom (professional)", "Australia", "Canada", "Japan",
 "South Africa", "India", "Pakistan", "Nigeria", "Brazil", "Mexico", "Other",
];

/** Circular raise-progress ring. */
function Ring({ pct }) {
 const r = 30, c = 2 * Math.PI * r;
 return (
 <svg viewBox="0 0 72 72" className="h-16 w-16 -rotate-90">
 <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(15,45,32,.1)" strokeWidth="7" />
 <circle cx="36" cy="36" r={r} fill="none" stroke="#1FB462" strokeWidth="7" strokeLinecap="round"
 strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
 </svg>
 );
}

/** The primary conversion module: pledge by $ or by sq ft. No KYC, no wallet.
    `pool` lets a page override the offering (e.g. the London pledge pool). */
export default function PledgeModule({ compact = false, pool }) {
 const cfg = pool || {
 price: RAISE.tokenPriceUsd,
 raisedUsd: RAISE.raisedUsd,
 targetUsd: RAISE.targetUsd,
 investors: RAISE.investors,
 totalTokens: RAISE.totalTokens,
 tokensRemaining: RAISE.tokensRemaining,
 unit: "investor",
 };
 const [tab, setTab] = useState("usd");
 const [usd, setUsd] = useState(25_000);
 const [sqft, setSqft] = useState(24);
 const [form, setForm] = useState({ name: "", email: "", country: "" });
 const [certified, setCertified] = useState(false);
 const [state, setState] = useState("idle");

 const price = cfg.price;
 const cur = cfg.cur || "$";
 // pledges settle in USDC (USD-pegged); convert from GBP when the asset is priced in £
 const usdcFx = cur === "£" ? 1.27 : 1;
 const calc = useMemo(() => {
 const ft = tab === "usd" ? Math.max(1, Math.floor((usd || 0) / price)) : Math.max(1, Math.floor(sqft || 0));
 const amount = ft * price;
 return { ft, amount, usdc: Math.round(amount * usdcFx), rentLow: amount * 0.06, rentHigh: amount * 0.07, apprLow: amount * 0.03, apprHigh: amount * 0.05 };
 }, [tab, usd, sqft, price, usdcFx]);

 const pct = (cfg.raisedUsd / cfg.targetUsd) * 100;
 const investorNo = cfg.investors + 1;
 const canSubmit = form.name && /\S+@\S+\.\S+/.test(form.email) && form.country && certified && state !== "sending";

 const onSubmit = async (e) => {
 e.preventDefault();
 if (!canSubmit) return;
 setState("sending");
 try {
 await submitPledge({ ...form, usdcAmount: calc.amount, sqft: calc.ft, investorNumber: investorNo, eligibilitySelfCertified: true });
 setState("done");
 } catch {
 setState("error");
 }
 };

 if (state === "done")
 return (
 <div className="card-dark p-7 text-center">
 <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/12 font-display text-2xl text-brand-dark">✓</span>
 <h3 className="mt-4 font-display text-xl font-bold text-ink">Pledge received</h3>
 <p className="mt-2 text-sm leading-relaxed text-ink/65">
 You've reserved <b className="text-brand-dark">{calc.ft.toLocaleString()} sq ft</b> (~{cur}{fmtUsd(calc.amount)}, settled in USDC)
 as investor <b className="text-ink">#{investorNo}</b>. We've emailed next steps, verification opens
 before closing, and no funds move until then.
 </p>
 </div>
 );

 return (
 <form onSubmit={onSubmit} className="card-dark overflow-hidden">
 {/* launching soon header */}
 <div className="flex items-center gap-4 border-b border-hairline bg-mist px-6 py-4">
 <Ring pct={pct} />
 <div className="min-w-0 flex-1">
 <div className="flex flex-wrap items-baseline justify-between gap-2">
 <p className="font-display text-sm font-bold text-ink">
 <Counter value={Math.round(pct)} suffix="%" className="text-brand-dark" /> pledged
 </p>
 <p className="text-xs text-ink/55">
 <Counter value={cfg.tokensRemaining} /> of {cfg.totalTokens.toLocaleString()} sq ft remaining
 </p>
 </div>
 <p className="mt-1 text-xs text-ink/55">
 {cur}{(cfg.raisedUsd / 1e6).toFixed(1)}M pledged of {cur}{(cfg.targetUsd / 1e6).toFixed(1)}M ·
 you would be <span className="font-bold text-brand-dark"> investor #{investorNo}</span>
 </p>
 </div>
 </div>

 <div className={compact ? "p-5" : "p-6"}>
 {/* tabs */}
 <div className="grid grid-cols-2 rounded-xl bg-ink/5 p-1" role="tablist" aria-label="Pledge mode">
 {[["usd", `Pledge by ${cur} amount`], ["sqft", "Pledge by sq ft"]].map(([k, label]) => (
 <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
 className={`rounded-lg px-3 py-2.5 font-display text-[12.5px] font-bold transition-colors ${
 tab === k ? "bg-brand text-white shadow-sm" : "text-ink/55 hover:text-ink"
 }`}>
 {label}
 </button>
 ))}
 </div>

 {/* input */}
 <div className="mt-4">
 {tab === "usd" ? (
 <label className="block">
 <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">Amount</span>
 <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 focus-within:border-brand">
 <span className="font-display font-bold text-brand-dark">{cur}</span>
 <input type="number" min={price} step="500" value={usd} onChange={(e) => setUsd(+e.target.value)}
 className="w-full bg-transparent py-3 font-display text-lg font-bold text-ink outline-none" aria-label="Pledge amount" />
 <span className="text-xs text-ink/45">→ USDC</span>
 </div>
 </label>
 ) : (
 <label className="block">
 <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">Square feet</span>
 <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 focus-within:border-brand">
 <input type="number" min="1" max={cfg.tokensRemaining} value={sqft} onChange={(e) => setSqft(+e.target.value)}
 className="w-full bg-transparent py-3 font-display text-lg font-bold text-ink outline-none" aria-label="Pledge size in square feet" />
 <span className="text-xs text-ink/45">sq ft × {cur}{price.toLocaleString()}</span>
 </div>
 </label>
 )}
 </div>

 {/* derived returns, always yield + appreciation */}
 <dl className="mt-4 space-y-2 rounded-xl bg-mist p-4 text-sm">
 <div className="flex justify-between">
 <dt className="text-ink/60">You would own</dt>
 <dd className="font-display font-bold text-ink">{calc.ft.toLocaleString()} sq ft · {cur}{fmtUsd(calc.amount)}</dd>
 </div>
 {cur !== "$" && (
 <div className="flex justify-between">
 <dt className="text-ink/60">Settles in</dt>
 <dd className="font-display font-bold text-ink">≈ ${fmtUsd(calc.usdc)} USDC</dd>
 </div>
 )}
 <div className="flex justify-between">
 <dt className="text-ink/60">Est. rental income (6–7% p.a.)</dt>
 <dd className="font-display font-bold text-brand-dark">{cur}{fmtUsd(calc.rentLow)}–{fmtUsd(calc.rentHigh)} / yr</dd>
 </div>
 <div className="flex justify-between">
 <dt className="text-ink/60">Est. capital appreciation (3–5% p.a.)</dt>
 <dd className="font-display font-bold text-[#1b7cb5]">+{cur}{fmtUsd(calc.apprLow)}–{fmtUsd(calc.apprHigh)} / yr</dd>
 </div>
 <p className="pt-1 text-[10.5px] leading-relaxed text-ink/45">
 Appreciation per Savills/JLL Central London forecasts; unrealised until sale, not guaranteed.
 </p>
 </dl>

 {/* details */}
 <div className="mt-4 grid gap-3 sm:grid-cols-2">
 <input className="field" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Full name" required />
 <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-label="Email" required />
 <select className="field sm:col-span-2" value={form.country} required aria-label="Country of residence" onChange={(e) => setForm({ ...form, country: e.target.value })}>
 <option value="" disabled>Country of residence</option>
 {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
 </select>
 </div>

 {/* eligibility self-certification, required, unchecked by default */}
 <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-hairline bg-mist p-4">
 <input type="checkbox" checked={certified} onChange={(e) => setCertified(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#1FB462]" required />
 <span className="text-xs leading-relaxed text-ink/65">
 I confirm I am eligible to invest under the laws of my country of residence, and that I am not a
 resident or citizen of the United States, the United Kingdom, or Europe (EEA/EU). This launch is
 offered under Regulation S to investors outside those regions.
 </span>
 </label>

 <button type="submit" disabled={!canSubmit} className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40">
 {state === "sending" ? "Submitting…" : `Pledge ${calc.ft.toLocaleString()} sq ft, no funds move today`}
 </button>
 {state === "error" && <p className="mt-2 text-xs text-[#c0492f]">Something went wrong, please try again.</p>}
 <p className="mt-3 text-center text-[11px] text-ink/45">
 A pledge reserves allocation only. KYC and settlement happen at closing.
 </p>
 </div>
 </form>
 );
}
