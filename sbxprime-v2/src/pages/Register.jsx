import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import PledgeModule from "../components/PledgeModule";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead } from "../components/ui";
import { Icon } from "../components/icons";
import { ASSETS, livePoolFor } from "../data/asset";
import { useRaise } from "../lib/hooks";

export default function Register() {
 const [slug, setSlug] = useState(ASSETS[0].slug);
 const [raise, refreshRaise] = useRaise();
 const asset = ASSETS.find((a) => a.slug === slug) || ASSETS[0];
 const stats = raise.assets ? (raise.assets[asset.slug] || {}) : null;
 const pool = livePoolFor(asset, stats);
 const pct = Math.round((pool.raisedUsd / pool.targetUsd) * 100);

 const facts = [
 ["area", "Location", asset.area],
 ["grid", "Size", asset.sizeLabel],
 ["coins", "Price", asset.priceShort],
 ["percent", "Target yield", asset.yieldPa],
 ["doc", "Tenure", asset.tenure],
 ["shield", "Structure", asset.spv],
 ];

 return (
 <>
 <Seo
 title="Pledge Your Allocation | SBX Prime"
 description="Reserve your allocation in a Central London launch asset. Choose a building, pledge by USDC amount or square feet, no KYC, no wallet, no funds move until closing."
 path="/register"
 />
 <section className="relative overflow-hidden">
 <NodeBackground opacity={0.3} />
 <div className="shell relative grid gap-10 py-14 lg:grid-cols-[1.05fr_1fr]">
 {/* ---------- LEFT: property picker + selected asset details/images ---------- */}
 <div>
 <SectionHead
 eyebrow="Pledge"
 title="Choose a building. Reserve your square feet."
 lede="A pledge holds your place in a specific Central London asset. No KYC today, no wallet, no payment, verification and settlement happen at closing."
 />

 {/* property selector */}
 <Fx delay={80}>
 <div className="mt-7">
 <label htmlFor="pledge-asset" className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">
 <Icon name="building" className="h-4 w-4 text-brand-dark" /> Choose your property
 </label>
 <div className="relative">
 <select
 id="pledge-asset"
 value={slug}
 onChange={(e) => setSlug(e.target.value)}
 className="field appearance-none pr-10 font-display font-bold text-ink"
 >
 {ASSETS.map((a) => (
 <option key={a.slug} value={a.slug}>{a.name} — {a.area}</option>
 ))}
 </select>
 <svg aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M6 9l6 6 6-6" />
 </svg>
 </div>
 </div>
 </Fx>

 {/* selected asset card — image, key facts, progress */}
 <Fx delay={140} scale key={asset.slug}>
 <div className="card-dark mt-4 overflow-hidden">
 <div className="relative h-52 overflow-hidden sm:h-64">
 <img src={asset.images.hero} alt={asset.name} className="h-full w-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
 <span className="badge-live absolute left-4 top-4 !bg-white/85">{asset.status}</span>
 <div className="absolute inset-x-4 bottom-3 text-white">
 <p className="font-display text-xl font-extrabold leading-tight">{asset.name}</p>
 <p className="text-xs text-white/80">{asset.area} · {asset.useClass}</p>
 </div>
 </div>

 <div className="p-5">
 {/* progress */}
 <div className="flex items-center justify-between text-xs">
 <span className="font-display font-bold text-brand-dark">{pct}% pledged</span>
 <span className="text-ink/50">{pool.tokensRemaining.toLocaleString()} of {pool.totalTokens.toLocaleString()} sq ft left</span>
 </div>
 <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/8">
 <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-mint" style={{ width: `${pct}%` }} />
 </div>

 {/* key facts */}
 <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
 {facts.map(([icon, k, v]) => (
 <div key={k} className="flex gap-2.5">
 <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-dark">
 <Icon name={icon} className="h-4 w-4" />
 </span>
 <div className="min-w-0">
 <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/45">{k}</dt>
 <dd className="text-[13px] font-semibold leading-snug text-ink">{v}</dd>
 </div>
 </div>
 ))}
 </dl>

 <p className="mt-5 border-t border-hairline pt-4 text-sm leading-relaxed text-ink/60">{asset.overview}</p>

 <Link to={`/invest/${asset.slug}/prospectus`} className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-brand-dark hover:gap-2.5 transition-all">
 View full prospectus <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>
 </Fx>
 </div>

 {/* ---------- RIGHT: pledge form (follows the chosen building) ---------- */}
 <Fx delay={120}>
 {/* keyed so the module resets its inputs cleanly when the property changes */}
 <PledgeModule key={asset.slug} pool={pool} slug={asset.slug} onPledged={refreshRaise} />
 </Fx>
 </div>
 </section>
 </>
 );
}
