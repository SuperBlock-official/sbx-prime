import { Fx } from "./ui";
import { Icon } from "./icons";

/* Lightweight CSS 3D diagram: the three independent layers that protect an
   investor's ownership. Pure CSS transforms, no WebGL, ~0 bundle cost. */
const LAYERS = [
 { icon: "building", n: "01", h: "Asset layer", b: "Ring-fenced English-law SPV holds the building." },
 { icon: "token", n: "02", h: "Platform layer", b: "ERC-3643 identity-bound tokens = your shares." },
 { icon: "scale", n: "03", h: "Regulatory layer", b: "Compliance-first, eligible investors only." },
];

export default function SecurityStack() {
 return (
 <div className="layers3d">
 <div className="layers3d-inner">
 {LAYERS.map((l, i) => (
 <Fx key={l.h} delay={i * 130} scale>
 <div className="layer-slab">
 <div className="relative flex items-center gap-4">
 <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-teal/25 text-brand-dark">
 <Icon name={l.icon} className="h-6 w-6" />
 </span>
 <div className="min-w-0">
 <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">Layer {l.n}</p>
 <p className="font-display text-[15px] font-extrabold leading-tight text-ink">{l.h}</p>
 <p className="mt-0.5 text-[12.5px] leading-snug text-ink/55">{l.b}</p>
 </div>
 </div>
 </div>
 </Fx>
 ))}
 </div>
 </div>
 );
}
