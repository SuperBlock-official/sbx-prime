import { useEffect, useMemo, useState } from "react";
import { submitPledge } from "../lib/api";
import { useRaise } from "../lib/hooks";
import { Counter, Honeypot } from "./ui";
import CountrySelect from "./CountrySelect";
import PhoneField from "./PhoneField";
import { guessCountryCode, countryNameOf, isExcludedCountryName } from "../data/countries";
import { isEmail, isEvmAddress, isFilled, isPhone } from "../lib/validators";

const fmtUsd = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

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
export default function PledgeModule({ compact = false, pool, slug = null, onPledged }) {
 const [raise, refreshRaise] = useRaise();
 const cfg = pool || {
 price: raise.tokenPriceUsd,
 raisedUsd: raise.raisedUsd,
 targetUsd: raise.targetUsd,
 investors: raise.investors,
 totalTokens: raise.totalTokens,
 tokensRemaining: raise.tokensRemaining,
 unit: "investor",
 };
 const [tab, setTab] = useState("usdc");
 const [usd, setUsd] = useState(25_000); // USDC amount
 const [sqft, setSqft] = useState(25);
 const [form, setForm] = useState({ name: "", email: "", phone: "", country: "" });
 const [wallet, setWallet] = useState("");
 const [noWallet, setNoWallet] = useState(false);
 const [company, setCompany] = useState(""); // honeypot
 const [certified, setCertified] = useState(false);
 const [submitted, setSubmitted] = useState(false); // reveal errors after first attempt
 const [state, setState] = useState("idle");
 const [assignedNo, setAssignedNo] = useState(null); // authoritative # from the server

 // Preselect country of residence from the visitor's browser locale (once, only
 // if they haven't chosen one). Runs after mount — no SSR mismatch.
 useEffect(() => {
 const name = countryNameOf(guessCountryCode());
 if (name) setForm((f) => (f.country ? f : { ...f, country: name }));
 }, []);

 const price = cfg.price;
 const cur = cfg.cur || "$";
 // pledges are made in USDC (USD-pegged); the asset is priced in its local currency
 const usdcFx = cur === "£" ? 1.27 : 1;
 const priceUsdc = price * usdcFx; // stablecoin price per sq ft
 const calc = useMemo(() => {
 // "usdc" tab: derive whole sq ft from the USDC amount pledged; "sqft" tab: from sq ft
 const ft = tab === "usdc"
 ? Math.max(1, Math.floor((usd || 0) / priceUsdc))
 : Math.max(1, Math.floor(sqft || 0));
 const amount = ft * price; // value in the asset's local currency
 const usdc = Math.round(ft * priceUsdc); // pledged / settled in USDC
 return { ft, amount, usdc, rentLow: amount * 0.06, rentHigh: amount * 0.07, apprLow: amount * 0.03, apprHigh: amount * 0.05 };
 }, [tab, usd, sqft, price, priceUsdc]);

 const pct = (cfg.raisedUsd / cfg.targetUsd) * 100;
 const investorNo = cfg.investors + 1;
 // Residents of the US / UK / EEA-EU can't receive an allocation — but we still
 // record their details (no allocation) so we can reach them if that changes.
 const excluded = isExcludedCountryName(form.country);

 // Per-field validation (server re-validates). Errors surface after first submit.
 const errors = {
 name: !isFilled(form.name) ? "Enter your full name" : "",
 email: !isEmail(form.email) ? "Enter a valid email address" : "",
 phone: !isPhone(form.phone) ? "Enter a valid contact number" : "",
 country: !isFilled(form.country) ? "Select your country of residence" : "",
 wallet: !noWallet && !isEvmAddress(wallet) ? "Enter a valid Base wallet address (0x…) or tick “I don’t have one”" : "",
 // Self-certification only applies to eligible countries; excluded residents
 // acknowledge the notice instead.
 certified: (!excluded && !certified) ? "Please confirm your eligibility" : "",
 };
 const err = (k) => (submitted ? errors[k] : "");
 const hasErrors = Object.values(errors).some(Boolean);

 const onSubmit = async (e) => {
 e.preventDefault();
 setSubmitted(true);
 if (hasErrors || state === "sending") return;
 setState("sending");
 try {
 const res = await submitPledge({
 ...form, company, usdcAmount: calc.usdc, sqft: calc.ft,
 assetSlug: slug, // attribute the pledge to this property (null on the global module)
 walletAddress: noWallet ? "" : wallet.trim(), noWallet,
 eligible: !excluded, // excluded residents are recorded with no allocation
 eligibilitySelfCertified: !excluded,
 });
 // On a per-property module keep the property-level position (anchors + public
 // pledges) so the confirmation matches what they saw; the global module uses
 // the server's authoritative site-wide number.
 setAssignedNo(slug ? investorNo : (res?.investorNumber ?? investorNo));
 setState("done");
 refreshRaise(); // update the global live pledged total + percentage
 onPledged?.(); // let the parent (per-asset prospectus) refresh its own total
 } catch {
 setState("error");
 }
 };

 if (state === "done" && excluded)
 return (
 <div className="card-dark p-7 text-center">
 <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink/10 font-display text-2xl text-ink/70">✓</span>
 <h3 className="mt-4 font-display text-xl font-bold text-ink">Details recorded</h3>
 <p className="mt-2 text-sm leading-relaxed text-ink/65">
 Thanks. This offering isn't available to residents of <b className="text-ink">{form.country}</b>, so
 <b className="text-ink"> no allocation has been made</b>. We've kept your details and will contact you if
 eligibility opens in your region. No funds move and nothing is reserved.
 </p>
 </div>
 );

 if (state === "done")
 return (
 <div className="card-dark p-7 text-center">
 <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/12 font-display text-2xl text-brand-dark">✓</span>
 <h3 className="mt-4 font-display text-xl font-bold text-ink">Pledge received</h3>
 <p className="mt-2 text-sm leading-relaxed text-ink/65">
 You've reserved <b className="text-brand-dark">{calc.ft.toLocaleString()} sq ft</b> (≈ ${fmtUsd(calc.usdc)} USDC{cur !== "$" && `, ${cur}${fmtUsd(calc.amount)}`})
 as investor <b className="text-ink">#{assignedNo ?? investorNo}</b>. We've emailed next steps, verification opens
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
 {[["usdc", "Pledge by USDC amount"], ["sqft", "Pledge by sq ft"]].map(([k, label]) => (
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
 {tab === "usdc" ? (
 <label className="block">
 <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">Amount in USDC</span>
 <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 focus-within:border-brand">
 <span className="font-display font-bold text-brand-dark">$</span>
 <input type="number" min={Math.ceil(priceUsdc)} step="500" value={usd} onChange={(e) => setUsd(+e.target.value)}
 className="w-full bg-transparent py-3 font-display text-lg font-bold text-ink outline-none" aria-label="Pledge amount in USDC" />
 <span className="text-xs text-ink/45">USDC{cur !== "$" && ` ≈ ${cur}${fmtUsd(calc.amount)}`}</span>
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
 <dd className="font-display font-bold text-ink">{calc.ft.toLocaleString()} sq ft</dd>
 </div>
 <div className="flex justify-between">
 <dt className="text-ink/60">You pledge</dt>
 <dd className="font-display font-bold text-ink">≈ ${fmtUsd(calc.usdc)} USDC</dd>
 </div>
 {cur !== "$" && (
 <div className="flex justify-between">
 <dt className="text-ink/60">Local value</dt>
 <dd className="font-display font-bold text-ink/70">≈ {cur}{fmtUsd(calc.amount)}</dd>
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
 <div>
 <input className={`field ${err("name") ? "!border-red-400" : ""}`} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Full name" />
 {err("name") && <p className="mt-1 text-[11px] text-[#c0492f]">{err("name")}</p>}
 </div>
 <div>
 <input className={`field ${err("email") ? "!border-red-400" : ""}`} type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-label="Email" />
 {err("email") && <p className="mt-1 text-[11px] text-[#c0492f]">{err("email")}</p>}
 </div>
 <div className="sm:col-span-2">
 <PhoneField value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={!!err("phone")} />
 {err("phone") && <p className="mt-1 text-[11px] text-[#c0492f]">{err("phone")}</p>}
 </div>
 <div className="sm:col-span-2">
 <CountrySelect value={form.country} onChange={(c) => setForm({ ...form, country: c })} error={!!err("country")} />
 {err("country") && <p className="mt-1 text-[11px] text-[#c0492f]">{err("country")}</p>}
 </div>
 {excluded && (
 <div className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3.5 sm:col-span-2">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className="mt-0.5 shrink-0 text-amber-600"><path d="M12 8v5M12 16h.01" /><path d="M10.3 3.9 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
 <p className="text-[12.5px] leading-relaxed text-ink/75">
 Pledging isn't available to residents of <b className="text-ink">{form.country}</b> — this offering excludes the US, UK and EEA/EU. You can still submit your details; we'll record them with <b className="text-ink">no allocation</b> and contact you if eligibility opens in your region.
 </p>
 </div>
 )}
 </div>

 {/* Base wallet address (or opt out) */}
 <div className="mt-3">
 <input
 className={`field font-mono text-[13px] ${err("wallet") ? "!border-red-400" : ""} ${noWallet ? "opacity-40" : ""}`}
 placeholder="Your Base wallet address (0x…)"
 value={wallet}
 onChange={(e) => setWallet(e.target.value)}
 disabled={noWallet}
 aria-label="Base wallet address"
 spellCheck={false}
 />
 <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-ink/60">
 <input type="checkbox" checked={noWallet} onChange={(e) => setNoWallet(e.target.checked)} className="h-3.5 w-3.5 accent-[#1FB462]" />
 I don’t have a wallet yet — help me set one up before closing.
 </label>
 {err("wallet") && <p className="mt-1 text-[11px] text-[#c0492f]">{err("wallet")}</p>}
 </div>

 {/* eligibility self-certification — only for eligible countries; excluded
 residents acknowledge the notice above instead. */}
 {!excluded && (
 <>
 <label className={`mt-4 flex cursor-pointer items-start gap-3 rounded-xl border bg-mist p-4 ${err("certified") ? "border-red-400" : "border-hairline"}`}>
 <input type="checkbox" checked={certified} onChange={(e) => setCertified(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#1FB462]" />
 <span className="text-xs leading-relaxed text-ink/65">
 I confirm I am eligible to invest under the laws of my country of residence, and that I am not a
 resident or citizen of the United States, the United Kingdom, or Europe (EEA/EU). This launch is
 offered only to eligible persons outside those regions.
 </span>
 </label>
 {err("certified") && <p className="mt-1 text-[11px] text-[#c0492f]">{err("certified")}</p>}
 </>
 )}

 <Honeypot value={company} onChange={(e) => setCompany(e.target.value)} />

 <button type="submit" disabled={state === "sending"} className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40">
 {state === "sending" ? "Submitting…" : excluded ? "Submit my details (no allocation)" : `Pledge ${calc.ft.toLocaleString()} sq ft, no funds move today`}
 </button>
 {state === "error" && <p className="mt-2 text-xs text-[#c0492f]">Something went wrong, please try again.</p>}
 <p className="mt-3 text-center text-[11px] text-ink/45">
 {excluded
 ? "Your details are recorded only — no allocation, no funds move."
 : "A pledge reserves allocation only. KYC and settlement happen at closing."}
 </p>
 </div>
 </form>
 );
}
