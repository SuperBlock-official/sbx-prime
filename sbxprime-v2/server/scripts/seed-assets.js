// Seeds the assets table from the current launch data. Idempotent: upserts by
// slug. Images reference /uploads/* (copy the brochure files into the upload
// dir first — see README). Financials are the current INDICATIVE figures.
import { getPool } from "../src/db.js";

const img = (f) => `/uploads/${f}`;

const ASSETS = [
  {
    slug: "grosvenor-gardens", name: "Grosvenor Gardens", sort: 1,
    data: {
      neighbourhood: "Victoria & Belgravia, SW1", cur: "£", size: 18036, pricePerSqft: 582,
      valuation: 10500000, yieldPa: "6–7%", appreciationPa: "3–5%", totalPa: "9–11%",
      useClass: "Office & residential · Grade II listed", tenure: "125-yr leasehold · Grosvenor Estate, to 2126", epc: "C",
      images: { hero: img("grosvenor-hero.jpg"), gallery: [img("grosvenor-1.jpg"), img("grosvenor-2.jpg"), img("grosvenor-3.jpg")] },
      economics: { manager: "Savills", mgmtFeePct: 8, grossRent: 970000, opexPct: 15, incomeBasis: "stabilised target" },
    },
  },
  {
    slug: "threadneedle-street", name: "Threadneedle Street", sort: 2,
    data: {
      neighbourhood: "City of London, EC2", cur: "£", size: 13945, pricePerSqft: 645,
      valuation: 9000000, yieldPa: "6.5%", appreciationPa: "3–4%", totalPa: "9–10%",
      useClass: "Grade A office · Grade II listed", tenure: "Long leasehold · Merchant Taylors, to 2150", epc: "B (path to A)",
      images: { hero: img("threadneedle-hero.jpg"), gallery: [img("threadneedle-1.jpg"), img("threadneedle-2.jpg"), img("threadneedle-3.jpg")] },
      economics: { manager: "CBRE", mgmtFeePct: 6, grossRent: 676620, opexPct: 5, incomeBasis: "passing rent" },
    },
  },
  {
    slug: "chiswell-street", name: "Chiswell Street", sort: 3,
    data: {
      neighbourhood: "City / Shoreditch border, EC1", cur: "£", size: 16941, pricePerSqft: 643,
      valuation: 10900000, yieldPa: "7.0%", appreciationPa: "3–4%", totalPa: "10–11%",
      useClass: "Office, retail & leisure", tenure: "Freehold", epc: "On request",
      images: { hero: img("chiswell-hero.jpg"), gallery: [img("chiswell-1.jpg"), img("chiswell-2.jpg"), img("chiswell-3.jpg")] },
      economics: { manager: "Cushman & Wakefield", mgmtFeePct: 9, grossRent: 811290, opexPct: 12, incomeBasis: "topped-up rent" },
    },
  },
  {
    slug: "vauxhall-bridge-road", name: "Vauxhall Bridge Road", sort: 4,
    data: {
      neighbourhood: "Westminster · Pimlico, SW1V", cur: "£", size: 15388, pricePerSqft: 390,
      valuation: 6000000, yieldPa: "6–7%", appreciationPa: "5–8%", totalPa: "11–15%",
      useClass: "Freehold warehouse · development", tenure: "Freehold", epc: "C (52)",
      images: { hero: img("vauxhall-hero.jpg"), gallery: [img("vauxhall-1.jpg"), img("vauxhall-2.jpg"), img("vauxhall-3.jpg")] },
      economics: { manager: "JLL", mgmtFeePct: 10, grossRent: 925000, opexPct: 14, incomeBasis: "ERV on refurbishment" },
    },
  },
  {
    slug: "dover-street", name: "Dover Street", sort: 5,
    data: {
      neighbourhood: "Mayfair, W1", cur: "£", size: 5314, pricePerSqft: 2446,
      valuation: 13000000, yieldPa: "4.5%", appreciationPa: "4–6%", totalPa: "8–10%",
      useClass: "Retail & residential", tenure: "Freehold", epc: "On request",
      images: { hero: img("dover-hero.jpg"), gallery: [img("dover-1.jpg"), img("dover-2.jpg"), img("dover-3.jpg")] },
      economics: { manager: "Knight Frank", mgmtFeePct: 5, grossRent: 595000, opexPct: 4, incomeBasis: "passing rent" },
    },
  },
  {
    slug: "conduit-street", name: "Conduit Street", sort: 6,
    data: {
      neighbourhood: "Mayfair, W1S", cur: "£", size: 17930, pricePerSqft: 1143,
      valuation: 20500000, yieldPa: "6.8%", appreciationPa: "3–5%", totalPa: "10–12%",
      useClass: "Retail · shopfront", tenure: "Freehold", epc: "On request",
      images: { hero: img("conduit-hero.jpg"), gallery: [img("conduit-1.jpg"), img("conduit-2.jpg")] },
      economics: { manager: "Savills", mgmtFeePct: 5, grossRent: 1394000, opexPct: 4, incomeBasis: "net operating income" },
    },
  },
  {
    slug: "baker-street", name: "Baker Street", sort: 7,
    data: {
      neighbourhood: "Marylebone, W1U", cur: "£", size: 6135, pricePerSqft: 1231,
      valuation: 7550000, yieldPa: "6.1%", appreciationPa: "3–5%", totalPa: "9–11%",
      useClass: "Retail & residential", tenure: "Freehold", epc: "On request",
      images: { hero: img("baker-hero.jpg"), gallery: [img("baker-1.jpg"), img("baker-2.jpg")] },
      economics: { manager: "CBRE", mgmtFeePct: 7, grossRent: 491000, opexPct: 5, incomeBasis: "passing rent" },
    },
  },
];

const pool = getPool();
for (const a of ASSETS) {
  await pool.query(
    `insert into assets (slug, name, sort, data)
     values ($1, $2, $3, $4)
     on conflict (slug) do update set name = excluded.name, sort = excluded.sort,
       data = assets.data || excluded.data, updated_at = now()`,
    [a.slug, a.name, a.sort, a.data]
  );
  console.log("seeded", a.slug);
}
console.log(`\n${ASSETS.length} assets seeded.`);
await pool.end();
