import { PARTNERS } from "../data/partners";

/** Infinite scrolling logo strip (pauses on hover; static when reduced motion). */
export default function PartnerStrip() {
 const row = (key) => (
 <ul key={key} className="marquee-track items-center" aria-hidden={key === "b"}>
 {PARTNERS.map((p) => (
 <li key={`${key}-${p.name}`} className="flex items-center">
 <img src={p.src} alt={p.name} className="partner-logo" loading="lazy" />
 </li>
 ))}
 </ul>
 );
 return (
 <div className="marquee overflow-hidden py-2" aria-label="Real estate, advisory and infrastructure partners">
 <div className="flex w-max gap-14">{[row("a"), row("b")]}</div>
 </div>
 );
}
