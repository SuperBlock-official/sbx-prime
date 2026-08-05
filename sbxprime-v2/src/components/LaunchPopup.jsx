import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appicon from "../assets/images/sbx-appicon.svg";

/* Shows once per full page load (not on client-side route changes). */
let alreadyShown = false;

export default function LaunchPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alreadyShown) return;
    const t = setTimeout(() => {
      alreadyShown = true;
      setOpen(true);
    }, 1300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="London pledges are now open"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="notif-pop w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_40px_90px_-30px_rgba(15,45,32,.5)] backdrop-blur-2xl">
        {/* gradient header */}
        <div className="relative bg-gradient-to-br from-brand-mint via-[#2ecbc4] to-brand-teal px-7 pt-7 pb-6 text-center">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/10 text-[#06231a] transition-colors hover:bg-black/20"
          >
            ✕
          </button>
          <img src={appicon} alt="" className="mx-auto h-14 w-14 shadow-lg" />
          <p className="mt-4 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-[#06231a]/70">
            Now open · Central London
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-extrabold leading-tight text-[#06231a]">
            Pledges for London have begun.
          </h2>
        </div>

        {/* body */}
        <div className="px-7 py-6 text-center">
          <p className="text-sm leading-relaxed text-ink/70">
            Reserve your square feet in the Central London launch from{" "}
            <b className="text-ink">$900 a square foot</b>. It takes ninety seconds, no KYC and no funds
            move today. Early pledges get first allocation.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link to="/invest/london-pledge" onClick={() => setOpen(false)} className="btn-primary w-full">
              Make your pledge today
            </Link>
            <button onClick={() => setOpen(false)} className="font-display text-[13px] font-bold text-ink/50 hover:text-ink">
              Not right now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
