import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, flagOf } from "../data/countries";

/** Searchable country-of-residence select with flags. value/onChange use the
 *  country name (string). Keyboard: type to filter, ↑/↓ to move, Enter to pick. */
export default function CountrySelect({ value, onChange, error, id = "country" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const selected = COUNTRIES.find(([name]) => name === value);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(([name, code]) => name.toLowerCase().includes(q) || code.toLowerCase() === q);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
    setActive(0);
  }, [open]);

  const pick = (name) => {
    onChange(name);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); pick(results[active][0]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`field flex items-center justify-between text-left ${error ? "!border-red-400" : ""}`}
      >
        <span className={selected ? "text-ink" : "text-ink/35"}>
          {selected ? <>{flagOf(selected[1])}&nbsp;&nbsp;{selected[0]}</> : "Country of residence"}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 shrink-0 text-ink/40"><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open && (
        <div className="absolute z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_24px_60px_-24px_rgba(15,45,32,.45)]">
          <div className="border-b border-hairline p-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search countries…"
              className="w-full rounded-lg bg-mist/60 px-3 py-2 text-sm text-ink outline-none placeholder-ink/40"
              aria-label="Search countries"
            />
          </div>
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {results.length === 0 && <li className="px-3 py-2 text-sm text-ink/40">No match</li>}
            {results.map(([name, code], i) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => pick(name)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm ${
                    i === active ? "bg-brand/[0.08] text-ink" : "text-ink/75"
                  } ${name === value ? "font-bold" : ""}`}
                >
                  <span className="text-base leading-none">{flagOf(code)}</span>
                  <span className="flex-1">{name}</span>
                  {name === value && <span className="text-brand-dark">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
