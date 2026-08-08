import { useEffect, useState } from "react";

/* Modern cookie consent with GA4 Consent Mode. Choice is stored in a cookie
   (no local/session storage), so it persists across reloads for a year. */
const KEY = "sbx_cookie_consent";
const getConsent = () => (document.cookie.match(/sbx_cookie_consent=(\w+)/) || [])[1];
const setConsent = (v) => {
  document.cookie = `${KEY}=${v}; path=/; max-age=31536000; samesite=lax`;
};
const applyConsent = (granted) => {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
    });
  }
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c) {
      applyConsent(c === "all");
      return;
    }
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  const choose = (all) => {
    setConsent(all ? "all" : "necessary");
    applyConsent(all);
    setOpen(false);
  };

  return (
    <div className="notif-pop fixed inset-x-4 bottom-4 z-[95] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[24rem]">
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_30px_70px_-24px_rgba(15,45,32,.5)] backdrop-blur-2xl">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand-dark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" />
                <path d="M8.5 9.5h.01M9.5 14.5h.01M14.5 15.5h.01M15 10h.01" strokeLinecap="round" strokeWidth="2.4" />
              </svg>
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink">We use cookies</p>
              <p className="text-[11px] text-ink/45">Essential for the site, optional for analytics.</p>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink/60">
            We use essential cookies to run SBX Prime and optional analytics to understand what's useful and improve it.
            You're in control, choose what you're comfortable with.
          </p>
          <div className="mt-4 flex gap-2.5">
            <button onClick={() => choose(false)} className="btn-ghost flex-1 justify-center !py-2.5 text-[13px]">
              Necessary only
            </button>
            <button onClick={() => choose(true)} className="btn-primary flex-1 justify-center !py-2.5 text-[13px]">
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
