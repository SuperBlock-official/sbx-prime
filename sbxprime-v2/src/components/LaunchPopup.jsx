import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ASSETS } from "../data/asset";
import appicon from "../assets/images/sbx-appicon.svg";

/* Shows once per browser session: a session cookie (cleared on browser close)
   survives full page reloads, while the module flag covers SPA route changes. */
let alreadyShown = false;
const SEEN = "sbx_popup_seen";
const hasSeen = () => typeof document !== "undefined" && document.cookie.includes(`${SEEN}=1`);

// a spread across Central London: Victoria, the City, Mayfair
const PICKS = ["grosvenor-gardens", "threadneedle-street", "dover-street"]
  .map((slug) => ASSETS.find((a) => a.slug === slug))
  .filter(Boolean);

export default function LaunchPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alreadyShown || hasSeen()) return;
    const t = setTimeout(() => {
      alreadyShown = true;
      document.cookie = `${SEEN}=1; path=/; samesite=lax`; // session cookie
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
  const close = () => setOpen(false);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="London pledges are now open"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="notif-pop relative my-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_50px_110px_-30px_rgba(15,45,32,.55)]">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-ink/60 shadow-sm backdrop-blur transition hover:bg-white hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {/* header */}
        <div className="px-7 pt-8 text-center sm:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-dark">
            <img src={appicon} alt="" className="h-4 w-4" />
            Now open · Central London
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] text-ink sm:text-[2.1rem]">
            Pledges for <span className="text-brand">London</span> have begun.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink/60">
            Reserve your square feet in the Central London launch from{" "}
            <b className="text-ink">$900 a square foot</b>. Ninety seconds, no KYC, and no funds move today.
            Early pledges get first allocation.
          </p>
        </div>

        {/* real London assets */}
        <div className="mt-7 grid grid-cols-3 gap-3 px-7 sm:px-10">
          {PICKS.map((a) => (
            <Link
              key={a.slug}
              to={`/invest/${a.slug}/prospectus`}
              onClick={close}
              className="group relative block overflow-hidden rounded-2xl border border-hairline"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={a.images.hero}
                  alt={a.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-display text-[9px] font-bold uppercase tracking-[0.14em] text-brand-mint">{a.area}</p>
                <p className="mt-0.5 font-display text-[13px] font-bold leading-tight text-white">{a.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-3 px-7 text-center text-[11px] text-ink/40 sm:px-10">
          Three of the real Central London assets in the launch. Tap to view a prospectus.
        </p>

        {/* actions */}
        <div className="mt-6 flex flex-col gap-3 border-t border-hairline bg-mist/40 px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <button onClick={close} className="order-2 font-display text-[13px] font-bold text-ink/50 transition hover:text-ink sm:order-1">
            Not right now
          </button>
          <div className="order-1 flex gap-3 sm:order-2">
            <Link to="/invest" onClick={close} className="btn-ghost flex-1 justify-center whitespace-nowrap sm:flex-none">
              Browse all
            </Link>
            <Link to="/invest/london-pledge" onClick={close} className="btn-primary flex-1 justify-center whitespace-nowrap sm:flex-none">
              Make your pledge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
