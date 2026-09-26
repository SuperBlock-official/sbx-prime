import { SqFtMark } from "./ui";

/** Consistent framed persona/investor portrait with the square-foot motif accent.
 *  Illustrative imagery — never captioned as a real, named investor. */
export default function PersonaFrame({ src, alt, className = "", ratio = "aspect-[4/5]" }) {
 return (
 <div className={`group relative overflow-hidden rounded-3xl border border-hairline shadow-[0_40px_80px_-42px_rgba(15,45,32,0.5)] ${ratio} ${className}`}>
 <img
 src={src}
 alt={alt}
 loading="lazy"
 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
 />
 <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
 <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg border border-white/40 bg-white/80 text-brand-dark backdrop-blur">
 <SqFtMark className="h-4 w-4" />
 </span>
 </div>
 );
}
