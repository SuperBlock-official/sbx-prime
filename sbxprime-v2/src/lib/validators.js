// Small shared client-side validators (server re-validates everything).
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
export const isEvmAddress = (v) => /^0x[a-fA-F0-9]{40}$/.test(String(v || "").trim());
export const isFilled = (v) => String(v || "").trim().length > 0;
// Loose international phone check: 7–15 digits, optional leading + and separators.
export const isPhone = (v) => {
 const s = String(v || "").trim();
 return /^\+?[0-9()\-\s]{7,20}$/.test(s) && (s.match(/\d/g) || []).length >= 7;
};
