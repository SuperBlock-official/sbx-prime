import { useEffect, useRef, useState } from "react";

/** Prospectus image carousel: a main image with prev/next arrows and a
 *  thumbnail strip. Combines the hero and the gallery into one reel. */
export default function ProspectusGallery({ hero, gallery = [], name }) {
  const images = [hero, ...gallery].filter(Boolean);
  const [idx, setIdx] = useState(0);
  const touchX = useRef(null);

  const go = (d) => setIdx((i) => (i + d + images.length) % images.length);

  // Arrow-key navigation while the carousel is focused.
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  // Basic swipe on touch devices.
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  // Keep the active thumbnail in view.
  const stripRef = useRef(null);
  useEffect(() => {
    const el = stripRef.current?.querySelector(`[data-i="${idx}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [idx]);

  if (!images.length) return null;

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-3xl border border-hairline"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${name} images`}
      >
        <img
          src={images[idx]}
          alt={`${name} — view ${idx + 1} of ${images.length}`}
          className="h-[300px] w-full object-cover sm:h-[420px]"
        />

        {images.length > 1 && (
          <>
            <button
              type="button" onClick={() => go(-1)} aria-label="Previous image"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-white/85 text-ink shadow-md backdrop-blur transition hover:bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button
              type="button" onClick={() => go(1)} aria-label="Next image"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-white/85 text-ink shadow-md backdrop-blur transition hover:bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums text-white">
              {idx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* thumbnail strip */}
      <div ref={stripRef} className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {images.map((g, i) => (
          <button
            key={i} data-i={i} type="button" onClick={() => setIdx(i)}
            aria-label={`View image ${i + 1}`} aria-current={i === idx}
            className={`overflow-hidden rounded-xl border transition ${
              i === idx ? "border-brand ring-2 ring-brand/30" : "border-hairline hover:border-brand/40"
            }`}
          >
            <img src={g} alt="" className="h-16 w-full object-cover sm:h-20" loading="lazy" />
          </button>
        ))}
        <div className="grid h-16 place-items-center rounded-xl border border-dashed border-brand/40 bg-brand/[0.05] text-center sm:h-20">
          <span className="text-[11px] font-semibold text-brand-dark">+ virtual tour</span>
        </div>
      </div>
    </div>
  );
}
