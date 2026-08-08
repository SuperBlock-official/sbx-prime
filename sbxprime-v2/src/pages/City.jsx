import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { cityBySlug } from "../data/cities";
import NodeBackground from "../components/NodeBackground";
import InterestModal from "../components/InterestModal";
import PushNotification from "../components/PushNotification";
import { Skyline, TiltCard } from "../components/cards";
import { Fx, ReturnSplit } from "../components/ui";

export default function City() {
 const { slug } = useParams();
 const [open, setOpen] = useState(false);
 const city = cityBySlug(slug);

 if (!city) return <Navigate to="/invest" replace />;
 if (city.slug === "london") return <Navigate to="/invest/london" replace />;

 return (
 <>
 <Seo
 title={`${city.name}, ${city.status === "soon" ? "Coming Soon" : "Pipeline"} | SBX Prime`}
 description={`Register interest in tokenized ${city.name} commercial real estate. ${city.yieldPa} rental yield plus ${city.appreciationPa} capital appreciation potential (${city.apprSource}).`}
 path={`/invest/${city.slug}`}
 />
 <section className="relative overflow-hidden">
 <NodeBackground opacity={0.3} />
 <div className="shell relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
 <div>
 <Fx>
 {city.status === "soon" ? <span className="badge-soon">Coming soon</span> : <span className="badge-pipeline">Pipeline</span>}
 <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
 {city.name}. <span className="text-brand">Next on the map.</span>
 </h1>
 <p className="lede">{city.blurb}</p>
 <div className="mt-5">
 <ReturnSplit yieldPa={city.yieldPa} appreciationPa={city.appreciationPa} totalPa={city.totalPa} />
 <p className="mt-1.5 text-[11px] text-ink/40">Appreciation per {city.apprSource}. Capital at risk.</p>
 </div>
 <div className="mt-8 flex flex-wrap gap-3">
 <button onClick={() => setOpen(true)} className="btn-primary">Register interest in {city.name}</button>
 <Link to="/invest/london" className="btn-ghost">See the Central London launch</Link>
 </div>
 <p className="mt-4 max-w-md text-xs leading-relaxed text-ink/45">
 Registering is not a commitment. It tells us where to deploy next, the most-registered
 market opens first, and early registrants get first allocation.
 </p>
 </Fx>
 </div>
 <Fx scale delay={140} className="relative">
 <TiltCard className="overflow-hidden rounded-3xl border border-hairline">
 {city.image ? (
 <img src={city.image} alt={`${city.asset}, ${city.name}`} className="h-72 w-full object-cover sm:h-96" />
 ) : (
 <Skyline seed={city.slug.length + 3} className="h-72 w-full sm:h-96" />
 )}
 </TiltCard>
 <div className="absolute -bottom-6 left-1/2 w-[min(88%,330px)] -translate-x-1/2">
 <PushNotification body={`${city.name} allocation open, you're on the priority list.`} time="soon" delay={700} />
 </div>
 </Fx>
 </div>
 </section>
 <InterestModal open={open} initialCity={city.slug} onClose={() => setOpen(false)} />
 </>
 );
}
