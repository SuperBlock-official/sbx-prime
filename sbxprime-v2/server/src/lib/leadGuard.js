// Anti-spam helpers for public lead capture.

/** Normalise an email so dot/plus variants collapse to one identity.
 *  Gmail ignores dots and everything after "+", so bots spam "a.b.c@gmail.com",
 *  "ab.c+1@gmail.com", etc. — all the same inbox. We dedupe on the normalised form. */
export function normalizeEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  const at = e.lastIndexOf("@");
  if (at < 1) return e;
  let local = e.slice(0, at);
  const domain = e.slice(at + 1);
  local = local.split("+")[0]; // drop +tag on any provider
  if (domain === "gmail.com" || domain === "googlemail.com") {
    return local.replace(/\./g, "") + "@gmail.com";
  }
  return local + "@" + domain;
}

/** Loose international phone check: 7–15 digits, optional + and separators. */
export function isValidPhone(v) {
  const s = String(v || "").trim();
  return /^\+?[0-9()\-\s]{7,20}$/.test(s) && (s.match(/\d/g) || []).length >= 7;
}
