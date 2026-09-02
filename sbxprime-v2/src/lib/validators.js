// Small shared client-side validators (server re-validates everything).
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
export const isEvmAddress = (v) => /^0x[a-fA-F0-9]{40}$/.test(String(v || "").trim());
export const isFilled = (v) => String(v || "").trim().length > 0;
