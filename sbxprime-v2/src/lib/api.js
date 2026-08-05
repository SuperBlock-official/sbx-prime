/* ------------------------------------------------------------------
 Form submission stubs.
 TODO(backend): replace both functions with real API calls
 (e.g. POST https://api.sbxprime.com/v1/pledges and /v1/interest).
 Submissions are currently logged to the console as structured JSON.
 ------------------------------------------------------------------ */

export async function submitPledge(pledge) {
 const payload = {
 kind: "pledge",
 asset: "central-london-grade-a-office",
 submittedAt: new Date().toISOString(),
 ...pledge,
 };
 // TODO(backend): POST payload, includes name, email, country,
 // usdcAmount, sqft, eligibilitySelfCertified: true
 console.log("[SBX Prime] pledge submission", JSON.stringify(payload, null, 2));
 await new Promise((r) => setTimeout(r, 600)); // simulate network
 return { ok: true, investorNumber: payload.investorNumber };
}

export async function registerInterest(interest) {
 const payload = {
 kind: "register-interest",
 submittedAt: new Date().toISOString(),
 ...interest,
 };
 // TODO(backend): POST payload, includes email, cities[], indicativeAmount
 console.log("[SBX Prime] interest registration", JSON.stringify(payload, null, 2));
 await new Promise((r) => setTimeout(r, 500));
 return { ok: true };
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
 targetUsd: 13_700_000,
 raisedUsd: 7_124_000,
 totalTokens: 13_146,
 tokensRemaining: 6_310,
 investors: 214,
 tokenPriceUsd: 1_042,
};
