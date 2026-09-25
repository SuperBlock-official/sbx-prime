import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, flagOf, DIAL_CODES } from "../data/countries";

// Only countries we have a dialing code for.
const WITH_DIAL = COUNTRIES.filter(([, code]) => DIAL_CODES[code]);

/** Phone input with a searchable country-code selector (flag + dial code).
 *  Emits the combined string, e.g. "+44 7911 123456", via onChange. */
export default function PhoneField({ value, onChange, error, id = "phone", defaultCode = "GB" }) {
  const [code, setCode] = useState(defaultCode);
  const [num, setNum] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const searchRef = useRef(null);

  // Keep the parent's combined value in sync with the two parts.
  useEffect(() => {
    const dial = DIAL_CODES[code] || "";
    onChange(`${dial} ${num}`.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, num]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return WITH_DIAL;
    return WITH_DIAL.filter(
      ([name, c]) => name.toLowerCase().includes(q) || DIAL_CODES[c].includes(q) || c.toLowerCase() === q
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
    else setQuery("");
    setActive(0);
  }, [open]);

  const pick = (c) => { setCode(c); setOpen(false); };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); pick(results[active][1]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className={`field flex items-center gap-0 !p-0 ${error ? "!border-red-400" : ""}`}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Country dialing code"
          className="flex shrink-0 items-center gap-1.5 rounded-l-xl border-r border-hairline px-3 py-3 text-sm text-ink hover:bg-mist/60"
        >
          <span className="text-base leading-none">{flagOf(code)}</span>
          <span className="font-semibold tabular-nums">{DIAL_CODES[code]}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/40"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="7911 123456"
          aria-label="Phone number"
          className="w-full bg-transparent px-3 py-3 text-sm text-ink outline-none placeholder-ink/35"
        />
      </div>

      {open && (
        <div className="absolute z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_24px_60px_-24px_rgba(15,45,32,.45)]">
          <div className="border-b border-hairline p-2">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search country or code…"
              className="w-full rounded-lg bg-mist/60 px-3 py-2 text-sm text-ink outline-none placeholder-ink/40"
              aria-label="Search country dialing code"
            />
          </div>
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {results.length === 0 && <li className="px-3 py-2 text-sm text-ink/40">No match</li>}
            {results.map(([name, c], i) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => pick(c)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm ${
                    i === active ? "bg-brand/[0.08] text-ink" : "text-ink/75"
                  } ${c === code ? "font-bold" : ""}`}
                >
                  <span className="text-base leading-none">{flagOf(c)}</span>
                  <span className="flex-1">{name}</span>
                  <span className="tabular-nums text-ink/50">{DIAL_CODES[c]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
