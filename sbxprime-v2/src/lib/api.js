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
export const RAISE = {
 targetUsd: 13_700_000,
 raisedUsd: 7_124_000,
 totalTokens: 13_146,
 tokensRemaining: 6_310,
 investors: 214,
 tokenPriceUsd: 1_042,
};
