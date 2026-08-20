/*
  Post-build prerender for social/SEO meta. The app is a client-rendered SPA, so
  social scrapers (which don't run JS) only see the raw HTML. This writes a
  per-route dist/<path>/index.html with the correct <title>, description and
  Open Graph / Twitter tags baked in, so a shared link previews that page.

  The runtime <Seo> component still refines tags for real users; this just makes
  the FIRST byte correct for crawlers. Keep the strings here in sync with each
  page's <Seo> props (they are stable marketing copy).
*/
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://www.sbxprime.com";
const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "../dist");

const STATIC = [
  ["/", "Tokenized Real Estate London | SBX Prime by SUPERBLOCK", "Own institutional-grade London commercial real estate from one square foot. ERC-3643 security tokens, 6–7% rental yield plus 3–5% capital appreciation potential (Savills/JLL). For qualified investors."],
  ["/invest", "Invest, Global Pipeline | SBX Prime", "London is launching; Dubai, Singapore, New York, Miami, Hong Kong, Riyadh, Tokyo and Sydney are next. Register interest to shape which trophy asset SBX Prime tokenizes next."],
  ["/how-it-works", "How It Works, The Investor Journey | SBX Prime", "Discover, pledge, verify, own, earn. How SBX Prime turns trophy commercial real estate into ERC-3643 security tokens with monthly USDC rent and a compliant secondary market."],
  ["/technology", "Technology, Powered by SUPERBLOCK | SBX Prime", "How SBX Prime tokenizes trophy real estate: single-asset SPVs, ERC-3643 identity-bound security tokens, audited smart contracts, USDC rent distribution, on-chain governance, and AI insights."],
  ["/trust", "Trust & Security | SBX Prime", "Three layers of protection: ring-fenced SPVs and institutional management at asset level, ERC-3643 identity-bound tokens at platform level, and a compliance-first regulatory posture."],
  ["/about", "About, SBX Prime by SUPERBLOCK", "SBX Prime is built by SUPERBLOCK and a team of specialists across finance, real estate, technology, transformation, accounting and audit, working with the world's best builders, to give investors direct, compliant ownership of trophy commercial real estate."],
  ["/whitepaper", "Whitepaper | SBX Prime", "The SBX Prime whitepaper: structure, ERC-3643 token standard, underwriting, USDC distribution mechanics, secondary-market and liquidity design ($SBX), governance, and risk factors."],
  ["/faq", "FAQ | SBX Prime", "Everything investors ask about SBX Prime: eligibility, the pledge process, ERC-3643 tokens, rental distributions, the secondary market, custody, and risk."],
  ["/dashboard", "Your Dashboard | SBX Prime", "Track portfolio value, monthly USDC rent, holdings, DAO governance and compliance — the full SBX Prime investor console."],
  ["/register", "Pledge Your Allocation | SBX Prime", "Reserve your allocation in the Central London launch. Pledge by USDC amount or square feet, no KYC, no wallet, no funds move until closing."],
  ["/verify", "Verify your account | SBX Prime", "Create your SBX Prime account, set up two-factor authentication, and complete identity verification to unlock the full investor data room."],
  ["/invest/london", "Grosvenor Gardens, Victoria SW1 — Launching Soon | SBX Prime", "Own the Central London launch asset on Grosvenor Gardens from one square foot (£582). 6–7% target rental yield plus 3–5% capital appreciation potential (Savills/JLL). Pledge now, no KYC until closing."],
  ["/invest/london-pledge", "Pledge into London — 25,000 sq ft at $900 | SBX Prime", "Pledge into the Central London launch pool: 25,000 sq ft at $900 per square foot. Pledges fund the acquisition of a shortlisted Central London asset; allocation is first-come, first-served."],
];

// Prospectus routes — per-asset title/description/image. Keep in sync with the
// seeded assets (server/scripts/seed-assets.js).
const ASSETS = [
  ["grosvenor-gardens", "Grosvenor Gardens", "Victoria & Belgravia, SW1", 18036],
  ["threadneedle-street", "Threadneedle Street", "City of London, EC2", 13945],
  ["chiswell-street", "Chiswell Street", "City / Shoreditch border, EC1", 16941],
  ["vauxhall-bridge-road", "Vauxhall Bridge Road", "Westminster · Pimlico, SW1V", 15388],
  ["dover-street", "Dover Street", "Mayfair, W1", 5314],
  ["conduit-street", "Conduit Street", "Mayfair, W1S", 17930],
  ["baker-street", "Baker Street", "Marylebone, W1U", 6135],
];

const routes = [
  ...STATIC.map(([p, title, description]) => ({ p, title, description, image: "/og.jpg" })),
  ...ASSETS.map(([slug, name, hood, size]) => ({
    p: `/invest/${slug}/prospectus`,
    title: `${name}, ${hood} — Prospectus | SBX Prime`,
    description: `Investment prospectus for ${name} in ${hood}: ${size.toLocaleString("en-US")} sq ft. Financials, tenancy, valuation and gated document bank.`,
    image: `/og/${slug}.jpg`,
  })),
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const setProp = (html, prop, val) =>
  html.replace(new RegExp(`(<meta property="${prop}" content=")[^"]*("\\s*/>)`), `$1${esc(val)}$2`);
const setName = (html, name, val) =>
  html.replace(new RegExp(`(<meta name="${name}" content=")[^"]*("\\s*/>)`), `$1${esc(val)}$2`);

function render(tpl, { p, title, description, image }) {
  const url = SITE + p;
  const img = SITE + image;
  let html = tpl
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(description)}" />`);
  html = setProp(html, "og:title", title);
  html = setProp(html, "og:description", description);
  html = setProp(html, "og:url", url);
  html = setProp(html, "og:image", img);
  html = setName(html, "twitter:image", img);
  // Add twitter title/description (not in the base template).
  html = html.replace(
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${esc(title)}" />\n    <meta name="twitter:description" content="${esc(description)}" />`
  );
  return html;
}

const tpl = await readFile(path.join(dist, "index.html"), "utf8");

for (const r of routes) {
  const html = render(tpl, r);
  const outDir = r.p === "/" ? dist : path.join(dist, r.p);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf8");
}

console.log(`prerendered ${routes.length} routes with per-page meta`);
