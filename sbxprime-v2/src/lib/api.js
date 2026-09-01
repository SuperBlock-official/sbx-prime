/* ------------------------------------------------------------------
 Backend API client.
 Base URL comes from VITE_API_URL (defaults to /api, which Vite proxies
 to the Node server in dev). See server/ for the implementation.
 ------------------------------------------------------------------ */

const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

/** POST JSON and throw a helpful Error (with .fields for 422) on failure. */
async function apiPost(path, body) {
 const res = await fetch(`${API_BASE}${path}`, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(body),
 });
 let data = {};
 try { data = await res.json(); } catch { /* non-JSON error */ }
 if (!res.ok) {
 const err = new Error(data.error || `Request failed (${res.status})`);
 if (data.errors) err.fields = data.errors;
 throw err;
 }
 return data;
}

export async function submitPledge(pledge) {
 // Server assigns the authoritative investor number and returns it.
 return apiPost("/pledges", {
 name: pledge.name,
 email: pledge.email,
 country: pledge.country,
 assetSlug: pledge.assetSlug ?? null,
 usdcAmount: pledge.usdcAmount ?? 0,
 sqft: pledge.sqft ?? 0,
 eligibilitySelfCertified: pledge.eligibilitySelfCertified === true,
 company: pledge.company || "", // honeypot (must stay empty)
 });
}

export async function registerInterest(interest) {
 const { email, name, source, company, ...rest } = interest;
 return apiPost("/leads", {
 email,
 name: name ?? null,
 source: source ?? "register-interest",
 company: company || "", // honeypot (must stay empty)
 meta: rest,
 });
}

/* TODO(backend): launching soon data should come from the chain / API.
 Static snapshot used across the site until then. */
export async function createAccount({ name, email }) {
 console.log("[SBX Prime] create account", JSON.stringify({ name, email, at: new Date().toISOString() }));
 await new Promise((r) => setTimeout(r, 700));
 // TODO(backend): returns { userId, twoFactorSecret, otpauthUri } for TOTP enrolment
 return { ok: true, otpauthUri: `otpauth://totp/SBX%20Prime:${encodeURIComponent(email)}?issuer=SBX%20Prime` };
}

export async function verifyTwoFactor({ code }) {
 console.log("[SBX Prime] verify 2FA", JSON.stringify({ codeLength: String(code || "").length }));
 await new Promise((r) => setTimeout(r, 600));
 // TODO(backend): validate TOTP against the enrolled secret
 return { ok: true };
}

export async function submitKyc({ email, documents }) {
 console.log("[SBX Prime] submit KYC", JSON.stringify({ email, documents: documents.map((d) => d.label) }));
 await new Promise((r) => setTimeout(r, 900));
 // TODO(backend): multipart upload to superblock.ai; status stays "in_review"
 return { ok: true, status: "in_review" };
}

export const RAISE = {
 // Grosvenor Gardens flagship in USDC-equivalent (£582/sq ft ≈ $740), 32% pledged.
 targetUsd: 13_350_000,
 raisedUsd: 4_272_000,
 totalTokens: 18_036,
 tokensRemaining: 12_264,
 investors: 120,
 tokenPriceUsd: 740,
};
