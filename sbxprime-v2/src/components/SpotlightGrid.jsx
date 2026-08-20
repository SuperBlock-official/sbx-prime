import { useRef } from "react";

/**
 * Wraps a grid of `.card-dark` cells and glides a soft brand-green spotlight
 * behind whichever cell the cursor is over — the tasteful "highlight grid"
 * interaction, done with two CSS custom properties and zero dependencies.
 *
 * Drop-in: swap a grid's <div className="grid …"> for <SpotlightGrid className="grid …">.
 * Only one cell is updated per pointer move, so it stays cheap. Coarse
 * pointers (touch) and reduced-motion users simply never see the glow.
 */
export default function SpotlightGrid({ as: Tag = "div", className = "", children, ...rest }) {
  const last = useRef(null);

  const clear = (el) => el && el.style.setProperty("--spot-o", "0");

  const onMove = (e) => {
    const card = e.target.closest?.(".card-dark");
    if (card !== last.current) {
      clear(last.current);
      last.current = card || null;
    }
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    card.style.setProperty("--spot-o", "1");
  };

  const onLeave = () => {
    clear(last.current);
    last.current = null;
  };

  return (
    <Tag className={`spotgrid ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}
