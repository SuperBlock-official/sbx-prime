import { useDragSpin } from "../lib/hooks";
import { RAISE } from "../lib/api";
import logoWhite from "../assets/images/sbx-logo-white.svg";

/** 3D auto-rotating token card. Pauses on hover; drag to spin. */
export default function TokenCard() {
 const { ref, ...drag } = useDragSpin();
 return (
 <div className="token-stage mx-auto w-[300px] sm:w-[340px]" style={{ touchAction: "pan-y" }}>
 <div
 ref={ref}
 {...drag}
 className="token-3d autospin relative aspect-[1.586] cursor-grab select-none active:cursor-grabbing"
 aria-label="SBX Prime London token card, drag to rotate"
 >
 {/* front */}
 <div className="token-face holo absolute inset-0 rounded-2xl border border-brand/35 p-5 shadow-[0_30px_70px_-25px_rgba(9,200,90,.35)]">
 <div className="flex items-start justify-between">
 <img src={logoWhite} alt="SBX Prime" className="h-6 w-auto" />
 <span className="badge-live">Live</span>
 </div>
 <p className="mt-6 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
 Token price
 </p>
 <p className="font-display text-4xl font-extrabold text-white">
 ${RAISE.tokenPriceUsd.toLocaleString()}
 </p>
 <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
 <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
 1 token = 1 sq ft
 </p>
 <p className="text-[11px] text-white/50">= 1 SPV share</p>
 </div>
 </div>
 {/* back */}
 <div className="token-face token-back holo absolute inset-0 rounded-2xl border border-brand-teal/35 p-5">
 <div className="h-8 w-full rounded bg-ink/70" aria-hidden="true" />
 <p className="mt-5 font-display text-sm font-bold text-white">Grosvenor Gardens</p>
 <p className="mt-1 text-xs text-white/55">Victoria SW1 · 18,036 sq ft · income-producing</p>
 <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
 <span className="rounded-full border border-brand-teal/50 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-brand-teal">
 ERC-3643 token
 </span>
 <span className="font-display text-[10px] font-bold text-white/40">SPV #SBX-LDN-01</span>
 </div>
 </div>
 </div>
 <p className="mt-4 text-center text-xs text-white/40">Drag to rotate · hover to pause</p>
 </div>
 );
}
