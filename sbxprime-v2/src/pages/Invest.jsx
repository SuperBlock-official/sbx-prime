import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { CITIES, GLOBAL_DEMAND } from "../data/cities";
import { useAssets } from "../lib/assetsStore";
import { RAISE } from "../lib/api";
import { CityCard, TiltCard } from "../components/cards";
import InterestModal from "../components/InterestModal";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead, Counter } from "../components/ui";

const TABS = [
 ["all", "All"],
 ["live", "Launching"],
 ["soon", "Coming Soon"],
 ["pipeline", "Pipeline"],
];

export default function Invest() {
 const { assets } = useAssets();
 const [tab, setTab] = useState("all");
 const [modal, setModal] = useState(null);
 const list = CITIES.filter((c) => tab === "all" || c.status === tab);

 return (
 <>
 <Seo
 title="Invest, Global Pipeline | SBX Prime"
 description="London is launching; Dubai, Singapore, New York, Miami, Hong Kong, Riyadh, Tokyo and Sydney are next. Register interest to shape which trophy asset SBX Prime tokenizes next."
 path="/invest"
 />
 <section className="relative overflow-hidden border-b border-hairline">
 <NodeBackground opacity={0.3} />
 <div className="shell relative py-14 lg:py-14">
 <SectionHead
 eyebrow="Marketplace"
 title="One platform. The world's trophy markets."
 lede="Every asset follows the same standard: 1 token = 1 sq ft = 1 SPV share, returns quoted as rental yield plus capital appreciation."
 />
 {/* global demand counter */}
 <Fx delay={140}>
 <div className="card-dark mt-8 inline-flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4">
 <div>
 <p className="text-[10px] uppercase tracking-[0.18em] text-ink/45">Indicative demand registered</p>
 <p className="font-display text-2xl font-extrabold text-brand">
 $<Counter value={GLOBAL_DEMAND.indicativeUsd / 1e6} decimals={2} />M+
 </p>
 </div>
 <div>
 <p className="text-[10px] uppercase tracking-[0.18em] text-ink/45">Registrations</p>
 <p className="font-display text-2xl font-extrabold text-ink"><Counter value={GLOBAL_DEMAND.registrations} /></p>
 </div>
 <p className="max-w-[220px] text-xs leading-relaxed text-ink/50">
 Demand routes our pipeline, the most-registered market opens next.
 </p>
 </div>
 </Fx>
 </div>
 </section>

 {/* ---------- Central London launch assets ---------- */}
 <section className="border-b border-hairline bg-white py-12 lg:py-14">
 <div className="shell">
 <div className="flex flex-wrap items-end justify-between gap-4">
 <SectionHead
 eyebrow="Central London · live"
 title="The London launch assets."
 lede="Seven real Central London buildings currently in the market. Each has its own full prospectus, own it directly from a single square foot."
 />
 <Link to="/register" className="btn-ghost shrink-0">Pledge your allocation</Link>
 </div>

 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {assets.map((a, i) => (
 <Fx key={a.slug} delay={(i % 3) * 80} scale>
 <Link to={`/invest/${a.slug}/prospectus`} className="group block h-full">
 <TiltCard className="card-dark flex h-full flex-col overflow-hidden">
 <div className="relative h-44 overflow-hidden">
 <img src={a.images.hero} alt={a.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
 <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
 <span className="badge-live absolute left-4 top-4 !bg-white/85">{a.status}</span>
 <p className="absolute bottom-3 left-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-white/90">{a.area}</p>
 </div>
 <div className="flex flex-1 flex-col p-5">
 <h3 className="font-display text-lg font-bold text-ink">{a.name}</h3>
 <p className="mt-0.5 text-sm text-ink/55">{a.type}</p>
 <div className="mt-3 flex items-center justify-between text-sm">
 <span className="text-ink/55">{a.sizeLabel} · {a.priceShort}</span>
 <span className="font-display font-bold text-brand-dark">{a.cardStat}</span>
 </div>
 <p className="mt-auto flex items-center justify-between border-t border-hairline pt-3 text-xs leading-relaxed text-ink/50">
 <span>{a.note}</span>
 <span className="ml-2 shrink-0 font-bold text-brand-dark opacity-0 transition group-hover:opacity-100">View →</span>
 </p>
 </div>
 </TiltCard>
 </Link>
 </Fx>
 ))}
 </div>
 </div>
 </section>

 <section className="py-12 lg:py-14">
 <div className="shell">
 <SectionHead eyebrow="Global pipeline" title="The world's trophy markets, next." lede="London is live. These markets open as demand routes our pipeline." />
 {/* filter tabs */}
 <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter markets">
 {TABS.map(([k, label]) => (
 <button
 key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
 className={`rounded-full px-5 py-2 font-display text-[13px] font-bold transition-colors ${
 tab === k ? "bg-brand text-white" : "border border-ink/12 text-ink/55 hover:border-brand/50 hover:text-ink"
 }`}
 >
 {label}
 <span className="ml-2 opacity-60">
 {k === "all" ? CITIES.length : CITIES.filter((c) => c.status === k).length}
 </span>
 </button>
 ))}
 </div>

 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {list.map((c, i) => (
 <CityCard key={c.slug} city={c} raise={RAISE} delay={i * 80} onRegister={(city) => setModal(city.slug)} />
 ))}
 </div>
 </div>
 </section>

 <InterestModal open={!!modal} initialCity={modal} onClose={() => setModal(null)} />
 </>
 );
}
