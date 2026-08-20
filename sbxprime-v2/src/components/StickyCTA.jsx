import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* Mobile-only pledge bar. Slides up once past the fold; hidden on the pages
   that already lead with the pledge form. Translucent material over content,
   in the Apple sense — chrome that floats, not an opaque strip. */
const HIDE_ON = ["/register", "/verify"];
const consentResolved = () => /sbx_cookie_consent=/.test(document.cookie);

export default function StickyCTA() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  // Hold the bar until the cookie choice is made — otherwise both dock at the
  // bottom on mobile and overlap.
  const [ready, setReady] = useState(consentResolved);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    const onConsent = () => setReady(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("sbx:consent", onConsent);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("sbx:consent", onConsent);
    };
  }, []);

  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;
  const visible = show && ready;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out lg:hidden ${
        visible ? "translate-y-0" : "translate-y-[130%]"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-2xl border border-hairline bg-white/85 p-2.5 pl-4 shadow-[0_18px_44px_-16px_rgba(15,45,32,.45)] backdrop-blur-md">
        <div className="min-w-0 flex-1">
          <p className="font-display text-[13px] font-bold leading-tight text-ink">Central London launch is open</p>
          <p className="mt-0.5 text-[11px] leading-tight text-ink/55">From $900 / sq ft · no funds move today</p>
        </div>
        <Link
          to="/register"
          tabIndex={visible ? 0 : -1}
          className="btn-primary shrink-0 whitespace-nowrap px-4 py-2.5 text-[13px]"
        >
          Pledge now
        </Link>
      </div>
    </div>
  );
}
