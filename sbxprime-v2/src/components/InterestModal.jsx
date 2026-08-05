import { useEffect, useState } from "react";
import { CITIES } from "../data/cities";
import { registerInterest } from "../lib/api";

const AMOUNTS = ["Under $5K", "$5K–$25K", "$25K–$100K", "$100K+"];

/** Demand-intelligence capture for pipeline cities. */
export default function InterestModal({ open, initialCity = null, onClose }) {
 const [email, setEmail] = useState("");
 const [cities, setCities] = useState(initialCity ? [initialCity] : []);
 const [amount, setAmount] = useState("");
 const [state, setState] = useState("idle");

 useEffect(() => {
 if (open) {
 setCities(initialCity ? [initialCity] : []);
 setState("idle");
 }
 }, [open, initialCity]);

 useEffect(() => {
 const onKey = (e) => e.key === "Escape" && onClose();
 if (open) window.addEventListener("keydown", onKey);
 return () => window.removeEventListener("keydown", onKey);
 }, [open, onClose]);

 if (!open) return null;

 const toggle = (slug) => setCities((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]));
 const canSubmit = /\S+@\S+\.\S+/.test(email) && cities.length && amount && state !== "sending";

 const submit = async (e) => {
 e.preventDefault();
 if (!canSubmit) return;
 setState("sending");
 await registerInterest({ email, cities, indicativeAmount: amount });
 setState("done");
 };

 return (
 <div
 className="fixed inset-0 z-[90] grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
 role="dialog" aria-modal="true" aria-label="Register interest"
 onMouseDown={(e) => e.target === e.currentTarget && onClose()}
 >
 <div className="card-dark w-full max-w-md p-6">
 {state === "done" ? (
 <div className="text-center">
 <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/12 font-display text-xl text-brand-dark">✓</span>
 <h3 className="mt-3 font-display text-lg font-bold text-ink">You're on the list</h3>
 <p className="mt-2 text-sm text-ink/65">
 We'll notify you the moment {cities.length > 1 ? "these markets open" : "this market opens"}, early registrants get first allocation.
 </p>
 <button onClick={onClose} className="btn-ghost mt-5 w-full">Close</button>
 </div>
 ) : (
 <form onSubmit={submit}>
 <div className="flex items-start justify-between gap-4">
 <div>
 <h3 className="font-display text-lg font-bold text-ink">Register interest</h3>
 <p className="mt-1 text-xs text-ink/55">No commitment, this shapes which market we tokenize next.</p>
 </div>
 <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg border border-hairline px-2.5 py-1 text-ink/55">✕</button>
 </div>

 <input className="field mt-5" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" required />

 <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink/50">Which cities interest you?</p>
 <div className="mt-2 flex flex-wrap gap-2">
 {CITIES.filter((c) => c.status !== "live").map((c) => (
 <button type="button" key={c.slug} onClick={() => toggle(c.slug)} aria-pressed={cities.includes(c.slug)}
 className={`rounded-full px-3.5 py-1.5 font-display text-xs font-bold transition-colors ${
 cities.includes(c.slug) ? "bg-brand text-white" : "border border-ink/15 text-ink/65 hover:border-brand/50"
 }`}>
 {c.name}
 </button>
 ))}
 </div>

 <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink/50">Indicative amount</p>
 <select className="field mt-2" value={amount} onChange={(e) => setAmount(e.target.value)} required aria-label="Indicative amount">
 <option value="" disabled>Select a range</option>
 {AMOUNTS.map((a) => <option key={a}>{a}</option>)}
 </select>

 <button type="submit" disabled={!canSubmit} className="btn-primary mt-5 w-full disabled:opacity-40">
 {state === "sending" ? "Submitting…" : "Register interest"}
 </button>
 </form>
 )}
 </div>
 </div>
 );
}
