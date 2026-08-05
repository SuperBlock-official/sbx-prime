import { useState } from "react";
import { Fx } from "./ui";

export default function FaqAccordion({ items, defaultOpen = 0 }) {
 const [open, setOpen] = useState(defaultOpen);
 return (
 <div className="space-y-3">
 {items.map((f, i) => {
 const isOpen = open === i;
 return (
 <Fx key={f.q} delay={i * 60}>
 <div className={`rounded-2xl border bg-white transition-colors ${isOpen ? "border-brand/40" : "border-hairline"}`}>
 <button
 className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
 aria-expanded={isOpen}
 onClick={() => setOpen(isOpen ? -1 : i)}
 >
 <span className="font-display text-[15px] font-bold text-ink">{f.q}</span>
 <span
 className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-transform duration-300 ${
 isOpen ? "rotate-45 bg-brand text-white" : "bg-ink/5 text-ink"
 }`}
 aria-hidden="true"
 >
 +
 </span>
 </button>
 {isOpen && <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70">{f.a}</p>}
 </div>
 </Fx>
 );
 })}
 </div>
 );
}
