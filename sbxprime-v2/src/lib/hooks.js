import { useEffect, useRef, useState, useCallback } from "react";

const motionOK = () =>
 typeof window !== "undefined" &&
 window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

/** Adds .is-in when the element scrolls into view (enhancement only). */
export function useInView(options = { threshold: 0.18 }) {
 const ref = useRef(null);
 useEffect(() => {
 const el = ref.current;
 if (!el) return;
 if (!("IntersectionObserver" in window)) {
 el.classList.add("is-in");
 return;
 }
 const io = new IntersectionObserver(
 (entries) =>
 entries.forEach((e) => {
 if (e.isIntersecting) {
 e.target.classList.add("is-in");
 io.unobserve(e.target);
 }
 }),
 options
 );
 io.observe(el);
 return () => io.disconnect();
 }, []);
 return ref;
}

/** Counts up 0 → value when in view. Renders final value immediately without JS/motion. */
export function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
 const ref = useRef(null);
 const [val, setVal] = useState(motionOK() ? 0 : target);
 useEffect(() => {
 const el = ref.current;
 if (!el || !motionOK() || !("IntersectionObserver" in window)) {
 setVal(target);
 return;
 }
 let raf;
 const io = new IntersectionObserver(
 (entries) => {
 if (!entries[0].isIntersecting) return;
 io.disconnect();
 const t0 = performance.now();
 const tick = (t) => {
 const p = Math.min(1, (t - t0) / duration);
 const eased = 1 - Math.pow(1 - p, 3);
 setVal(+(target * eased).toFixed(decimals));
 if (p < 1) raf = requestAnimationFrame(tick);
 };
 raf = requestAnimationFrame(tick);
 },
 { threshold: 0.4 }
 );
 io.observe(el);
 return () => {
 io.disconnect();
 cancelAnimationFrame(raf);
 };
 }, [target]);
 return [ref, val];
}

/** 3D mouse tilt (max ±12deg) with moving specular sheen. */
export function useTilt(max = 12) {
 const ref = useRef(null);
 const onMove = useCallback(
 (e) => {
 const el = ref.current;
 if (!el || !motionOK()) return;
 const r = el.getBoundingClientRect();
 const px = (e.clientX - r.left) / r.width;
 const py = (e.clientY - r.top) / r.height;
 el.style.setProperty("--ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
 el.style.setProperty("--rx", `${(-(py - 0.5) * 2 * max).toFixed(2)}deg`);
 el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
 el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
 el.style.setProperty("--sheen-o", "1");
 el.style.setProperty("--lift", "-6px");
 },
 [max]
 );
 const onLeave = useCallback(() => {
 const el = ref.current;
 if (!el) return;
 ["--rx", "--ry", "--lift"].forEach((p) => el.style.setProperty(p, "0"));
 el.style.setProperty("--sheen-o", "0");
 }, []);
 return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/** Typed-text cycler for the hero. */
export function useTyped(words, { type = 70, erase = 38, hold = 1500 } = {}) {
 const [text, setText] = useState(motionOK() ? "" : words[0]);
 useEffect(() => {
 if (!motionOK()) return;
 let w = 0, i = 0, dir = 1, timer;
 const step = () => {
 const word = words[w];
 i += dir;
 setText(word.slice(0, i));
 let delay = dir > 0 ? type : erase;
 if (dir > 0 && i === word.length) { dir = -1; delay = hold; }
 else if (dir < 0 && i === 0) { dir = 1; w = (w + 1) % words.length; delay = 300; }
 timer = setTimeout(step, delay);
 };
 timer = setTimeout(step, 500);
 return () => clearTimeout(timer);
 }, []);
 return text;
}

/** Drag-to-spin for the 3D token card. */
export function useDragSpin() {
 const ref = useRef(null);
 const state = useRef({ dragging: false, x: 0, ry: 0 });
 const onPointerDown = (e) => {
 state.current.dragging = true;
 state.current.x = e.clientX;
 ref.current?.classList.remove("autospin");
 ref.current?.setPointerCapture?.(e.pointerId);
 };
 const onPointerMove = (e) => {
 if (!state.current.dragging) return;
 state.current.ry += (e.clientX - state.current.x) * 0.5;
 state.current.x = e.clientX;
 ref.current?.style.setProperty("--token-ry", `${state.current.ry}deg`);
 };
 const onPointerUp = () => (state.current.dragging = false);
 return { ref, onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp };
}
