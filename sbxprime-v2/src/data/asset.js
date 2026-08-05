/* Central London launch assets — prospectus data.
   Facts sourced from each building's marketing particulars / listing (2026).
   Presented in GBP; pledges and distributions settle in USDC at prevailing FX.
   Forward projections and rent/value forecasts are indicative. */

// brochure photography
import grosvenorHero from "../assets/assets/grosvenor-hero.jpg";
import grosvenor1 from "../assets/assets/grosvenor-1.jpg";
import grosvenor2 from "../assets/assets/grosvenor-2.jpg";
import grosvenor3 from "../assets/assets/grosvenor-3.jpg";
import threadHero from "../assets/assets/threadneedle-hero.jpg";
import thread1 from "../assets/assets/threadneedle-1.jpg";
import thread2 from "../assets/assets/threadneedle-2.jpg";
import thread3 from "../assets/assets/threadneedle-3.jpg";
import chiswellHero from "../assets/assets/chiswell-hero.jpg";
import chiswell1 from "../assets/assets/chiswell-1.jpg";
import chiswell2 from "../assets/assets/chiswell-2.jpg";
import chiswell3 from "../assets/assets/chiswell-3.jpg";
import vauxhallHero from "../assets/assets/vauxhall-hero.jpg";
import vauxhall1 from "../assets/assets/vauxhall-1.jpg";
import vauxhall2 from "../assets/assets/vauxhall-2.jpg";
import vauxhall3 from "../assets/assets/vauxhall-3.jpg";
import doverHero from "../assets/assets/dover-hero.jpg";
import dover1 from "../assets/assets/dover-1.jpg";
import dover2 from "../assets/assets/dover-2.jpg";
import dover3 from "../assets/assets/dover-3.jpg";
// LoopNet listing photography (9 Conduit St, 117-129 Baker St)
import conduitHero from "../assets/assets/conduit-hero.jpg";
import conduit1 from "../assets/assets/conduit-1.jpg";
import conduit2 from "../assets/assets/conduit-2.jpg";
import bakerHero from "../assets/assets/baker-hero.jpg";
import baker1 from "../assets/assets/baker-1.jpg";
import baker2 from "../assets/assets/baker-2.jpg";

const DOCUMENTS = [
  ["Information Memorandum", "PDF"],
  ["Independent valuation (Savills)", "PDF"],
  ["Tenancy schedule & leases", "PDF"],
  ["Title & SPV structure", "PDF"],
  ["ERC-3643 token terms", "PDF"],
  ["Building survey & EPC", "PDF"],
];

const REFERENCES = [
  ["Savills", "Independent RICS Red Book valuation & rental evidence"],
  ["JLL", "Central London market forecasts (rent & capital growth)"],
  ["CBRE", "Managing agent & building operations"],
  ["Knight Frank", "Comparable transaction evidence"],
];

const DEFAULT_PROJECTION = [
  ["Year 1", 6.2, 3.0],
  ["Year 2", 6.4, 3.2],
  ["Year 3", 6.6, 3.5],
  ["Year 4", 6.8, 3.8],
  ["Year 5", 7.0, 4.0],
];

export const ASSETS = [
  {
    slug: "grosvenor-gardens",
    name: "Grosvenor Gardens",
    neighbourhood: "Victoria & Belgravia, SW1",
    cityCountry: "London, United Kingdom",
    status: "Launching soon",
    cur: "£",
    size: 18_036,
    pricePerSqft: 582,
    valuation: 10_500_000,
    priceLabel: "£10.5M · £582 / sq ft",
    yieldPa: "6–7%",
    appreciationPa: "3–5%",
    totalPa: "9–11%",
    cardStat: "6–7% target yield",
    wault: "To 2034 (offices)",
    useClass: "Office & residential · Grade II listed",
    refurbished: "Recently refurbished",
    epc: "C",
    tenure: "125-yr leasehold · Grosvenor Estate, to 2126",
    spv: "SBX-LDN-01 · English-law SPV",
    managingAgent: "Institutional managing agent",
    valuer: "Savills (RICS Red Book)",
    distribution: "Monthly · USDC",
    mapBbox: "-0.1520,51.4940,-0.1360,51.5015",
    mapMarker: "51.4977,-0.1447",
    rent: { current: 78, comparable: 88, forecast5: 96 },
    valuePsf: { current: 582, comparable: 609, forecast5: 672 },
    roi5: 52.0,
    images: { hero: grosvenorHero, gallery: [grosvenor1, grosvenor2, grosvenor3] },
    overview:
      "A Grade II listed period building in Victoria & Belgravia, bought below replacement cost, part-let to established occupiers with leases to 2034 and clear reversionary headroom as the upper floors are brought to market rent.",
    locationTitle: "Victoria & Belgravia, SW1",
    location: [
      ["Transport", "Victoria Station 300m away; Hyde Park Corner and St James's Park within a short walk."],
      ["Occupier demand", "20 years of regeneration — Nova, Cardinal Place, 105 Victoria Street; Grade-A supply remains tight."],
      ["Neighbours", "Google, American Express, Sky and Moët Hennessy, alongside Belgravia's luxury hotels."],
    ],
    tenants: [
      ["Morgan Rae Ltd", "Ground-floor unit · to 2034", "£76,820 pa"],
      ["Geneviv Medical Ltd", "Ground-floor unit · to 2034", "£64,613 pa"],
      ["Reversionary upside", "Upper floors to let", "£82–97.50 / sq ft comps"],
    ],
    area: "Victoria & Belgravia, SW1",
    type: "Grade II listed office & residential",
    sizeLabel: "18,036 sq ft",
    priceShort: "£582 / sq ft",
    note: "125-yr leasehold · income-producing with reversionary upside",
  },
  {
    slug: "threadneedle-street",
    name: "Threadneedle Street",
    neighbourhood: "City of London, EC2",
    cityCountry: "London, United Kingdom",
    status: "Launching soon",
    cur: "£",
    size: 13_945,
    pricePerSqft: 645,
    valuation: 9_000_000,
    priceLabel: "£9.0M · £645 / sq ft",
    yieldPa: "6.5%",
    appreciationPa: "3–4%",
    totalPa: "9–10%",
    cardStat: "6.47% net initial yield",
    wault: "8.7 yrs to expiry",
    useClass: "Grade A office · Grade II listed",
    refurbished: "2016",
    epc: "B (path to A)",
    tenure: "Long leasehold · Merchant Taylors, to 2150",
    spv: "SBX-LDN-02 · English-law SPV",
    managingAgent: "Institutional managing agent",
    valuer: "Savills (RICS Red Book)",
    distribution: "Monthly · USDC",
    mapBbox: "-0.0965,51.5105,-0.0805,51.5175",
    mapMarker: "51.5138,-0.0883",
    rent: { current: 48.5, comparable: 55, forecast5: 62 },
    valuePsf: { current: 645, comparable: 690, forecast5: 745 },
    roi5: 48.0,
    images: { hero: threadHero, gallery: [thread1, thread2, thread3] },
    overview:
      "A highly attractive City core asset with a classic Portland stone façade, comprehensively refurbished in 2016 and single-let to a serviced-office operator on a lease to 2034 — a rare long-income opportunity in the heart of the City.",
    locationTitle: "The heart of the City, EC2",
    location: [
      ["Transport", "Within a 10-minute walk of 8 transport hubs — Bank, Liverpool Street, Moorgate and Cannon Street."],
      ["Landmarks", "Steps from the Bank of England, the Royal Exchange and the City Tower Cluster."],
      ["Occupier demand", "One of Central London's most prestigious and best-connected office markets."],
    ],
    tenants: [
      ["Queen St Business Centre", "Boutique Workplace Co · to 2034", "£676,620 pa gross"],
      ["WAULT", "8.7 yrs to expiry", "3.7 yrs to break"],
      ["Net rent", "£621,620 pa", "£48.52 / sq ft overall"],
    ],
    area: "City of London, EC2",
    type: "Grade A office · long income",
    sizeLabel: "13,945 sq ft",
    priceShort: "£645 / sq ft",
    note: "Single-let to 2034 · 6.47% net initial yield",
  },
  {
    slug: "chiswell-street",
    name: "Chiswell Street",
    neighbourhood: "City / Shoreditch border, EC1",
    cityCountry: "London, United Kingdom",
    status: "Launching soon",
    cur: "£",
    size: 16_941,
    pricePerSqft: 643,
    valuation: 10_900_000,
    priceLabel: "£10.9M · £643 / sq ft",
    yieldPa: "7.0%",
    appreciationPa: "3–4%",
    totalPa: "10–11%",
    cardStat: "7.0% net initial yield",
    wault: "3.6 yrs to expiry",
    useClass: "Office, retail & leisure",
    refurbished: "2022–24 · Cat A+ floors",
    epc: "On request",
    tenure: "Freehold",
    spv: "SBX-LDN-03 · English-law SPV",
    managingAgent: "Institutional managing agent",
    valuer: "Savills (RICS Red Book)",
    distribution: "Monthly · USDC",
    mapBbox: "-0.0985,51.5170,-0.0825,51.5240",
    mapMarker: "51.5205,-0.0905",
    rent: { current: 47.9, comparable: 58, forecast5: 65 },
    valuePsf: { current: 643, comparable: 680, forecast5: 735 },
    roi5: 53.0,
    images: { hero: chiswellHero, gallery: [chiswell1, chiswell2, chiswell3] },
    overview:
      "A corner City freehold on the border of the City and Shoreditch, 300m from Moorgate. Multi-let to six tenants with roughly £1.5m of recent capital expenditure delivering fully fitted Cat A+ floors, an extensive roof terrace and clear reversionary potential.",
    locationTitle: "City / Shoreditch border, EC1",
    location: [
      ["Transport", "300m from Moorgate; Liverpool Street, Barbican and Old Street within a 10-minute walk."],
      ["Character", "The City's financial prestige meets the creative energy of nearby tech and media hubs."],
      ["Amenity", "Communal roof terrace with views over Central London; Whitecross Street Market nearby."],
    ],
    tenants: [
      ["Multi-let", "5 office + 1 retail tenant", "£811,290 pa topped-up"],
      ["WAULT", "3.6 yrs to expiry", "2.2 yrs to break"],
      ["Reversion", "Cat A+ refurb underway", "£47.89 / sq ft, low passing"],
    ],
    area: "City / Shoreditch, EC1",
    type: "Office, retail & leisure · freehold",
    sizeLabel: "16,941 sq ft",
    priceShort: "£643 / sq ft",
    note: "Freehold · 7.0% topped-up net initial yield",
  },
  {
    slug: "vauxhall-bridge-road",
    name: "Vauxhall Bridge Road",
    neighbourhood: "Westminster · Pimlico, SW1V",
    cityCountry: "London, United Kingdom",
    status: "Launching soon",
    cur: "£",
    size: 15_388,
    pricePerSqft: 390,
    valuation: 6_000_000,
    priceLabel: "£6.0M · £390 / sq ft",
    yieldPa: "6–7%",
    appreciationPa: "5–8%",
    totalPa: "11–15%",
    cardStat: "£925k ERV once refurbished",
    wault: "Vacant possession",
    useClass: "Freehold warehouse · development",
    refurbished: "1920s build · to be refurbished",
    epc: "C (52)",
    tenure: "Freehold",
    spv: "SBX-LDN-04 · English-law SPV",
    managingAgent: "Institutional managing agent",
    valuer: "Savills (RICS Red Book)",
    distribution: "Monthly · USDC",
    mapBbox: "-0.1435,51.4890,-0.1275,51.4960",
    mapMarker: "51.4925,-0.1357",
    rent: { current: 42, comparable: 60, forecast5: 65 },
    valuePsf: { current: 390, comparable: 470, forecast5: 560 },
    roi5: 68.0,
    images: { hero: vauxhallHero, gallery: [vauxhall1, vauxhall2, vauxhall3] },
    overview:
      "A rare vacant former warehouse in Westminster with prominent frontage on Vauxhall Bridge Road, bought at a low £390 per sq ft. Refurbished, the office ERV is around £925,000 pa; alternatively, positive pre-application feedback supports a 53-unit co-living scheme.",
    locationTitle: "Westminster · Pimlico, SW1V",
    location: [
      ["Transport", "Two-minute walk from Pimlico Station; Victoria 0.7 miles."],
      ["Optionality", "Prior approval for 18 flats; co-living scheme of 53 units positively received by Westminster."],
      ["Character", "Warehouse ceiling heights up to 6m, dual frontage and rear loading access."],
    ],
    tenants: [
      ["Vacant possession", "Full flexibility", "Refurb or redevelop"],
      ["Office ERV", "~£60 / sq ft", "≈ £925,000 pa"],
      ["Co-living", "53 units proposed", "Westminster pre-app positive"],
    ],
    area: "Westminster · Pimlico, SW1V",
    type: "Freehold warehouse · development play",
    sizeLabel: "15,388 sq ft",
    priceShort: "£390 / sq ft",
    note: "Freehold, vacant · office or 53-unit co-living scheme",
  },
  {
    slug: "dover-street",
    name: "Dover Street",
    neighbourhood: "Mayfair, W1",
    cityCountry: "London, United Kingdom",
    status: "Launching soon",
    cur: "£",
    size: 5_314,
    pricePerSqft: 2_446,
    valuation: 13_000_000,
    priceLabel: "£595k passing rent · offers invited",
    yieldPa: "4.5%",
    appreciationPa: "4–6%",
    totalPa: "8–10%",
    cardStat: "Let to Sicis to 2028",
    wault: "To Sept 2028 (+3-yr option)",
    useClass: "Retail & residential",
    refurbished: "Occupier fit-out since 2015",
    epc: "On request",
    tenure: "Freehold",
    spv: "SBX-LDN-05 · English-law SPV",
    managingAgent: "Institutional managing agent",
    valuer: "Savills (RICS Red Book)",
    distribution: "Monthly · USDC",
    mapBbox: "-0.1500,51.5055,-0.1345,51.5125",
    mapMarker: "51.5089,-0.1424",
    rent: { current: 112, comparable: 120, forecast5: 132 },
    valuePsf: { current: 2446, comparable: 2550, forecast5: 2820 },
    roi5: 42.0,
    images: { hero: doverHero, gallery: [dover1, dover2, dover3] },
    overview:
      "An attractive corner freehold on Dover Street in the heart of Mayfair, single-let to luxury Italian mosaic house Sicis, who have occupied since 2015. A reversionary lease runs to September 2028 with RPI-linked reviews collared and capped at 2–5%.",
    locationTitle: "Mayfair, W1",
    location: [
      ["Transport", "Green Park Underground within a four-minute walk."],
      ["Setting", "Between Bond Street and Albemarle Street — luxury retail and fine dining."],
      ["Covenant", "Sicis: global luxury brand; projects include The Arts Club and Burj Al Arab."],
    ],
    tenants: [
      ["Sicis UK Ltd", "Single-let · to Sept 2028", "£595,000 pa"],
      ["Rent review", "September 2028", "RPI-linked · 2–5% collar/cap"],
      ["Commitment", "In occupation since 2015", "+3-yr renewal option"],
    ],
    area: "Mayfair, W1",
    type: "Prime freehold · single-let",
    sizeLabel: "5,314 sq ft",
    priceShort: "£595k passing rent",
    note: "Freehold · RPI-linked reviews (2–5% collar/cap)",
  },
  {
    slug: "conduit-street",
    name: "Conduit Street",
    neighbourhood: "Mayfair, W1S",
    cityCountry: "London, United Kingdom",
    status: "Launching soon",
    cur: "£",
    size: 17_930,
    pricePerSqft: 1_143,
    valuation: 20_500_000,
    priceLabel: "£20.5M · £1,143 / sq ft",
    yieldPa: "6.8%",
    appreciationPa: "3–5%",
    totalPa: "10–12%",
    cardStat: "6.8% gross yield",
    wault: "Single let",
    useClass: "Retail · shopfront",
    refurbished: "1852 building",
    epc: "On request",
    tenure: "Freehold",
    spv: "SBX-LDN-06 · English-law SPV",
    managingAgent: "Institutional managing agent",
    valuer: "Savills (RICS Red Book)",
    distribution: "Monthly · USDC",
    mapBbox: "-0.1495,51.5090,-0.1340,51.5160",
    mapMarker: "51.5125,-0.1415",
    rent: { current: 78, comparable: 85, forecast5: 95 },
    valuePsf: { current: 1143, comparable: 1200, forecast5: 1320 },
    roi5: 48.0,
    images: { hero: conduitHero, gallery: [conduit1, conduit2] },
    overview:
      "A freehold retail building on Conduit Street, one of the West End's most established thoroughfares linking Regent Street with Bond Street. Single-let with a net operating income of £1,394,000 and a rare late-night licence permitting operation until 2am.",
    locationTitle: "Mayfair, W1S",
    location: [
      ["Setting", "Prime Conduit Street position, linking Regent Street with Bond Street."],
      ["Rarity", "Late-night licence permitting operation until 2am."],
      ["Market", "Mayfair — one of the world's most renowned luxury destinations."],
    ],
    tenants: [
      ["Single let", "NOI £1,394,000 pa", "6.8% gross yield"],
      ["Net initial yield", "4.0%", "(purchaser's costs 6.8%)"],
      ["Frontage", "41 ft on Conduit St", "5 floors · built 1852"],
    ],
    area: "Mayfair, W1S",
    type: "Prime retail · freehold",
    sizeLabel: "17,930 sq ft",
    priceShort: "£1,143 / sq ft",
    note: "Freehold · single-let · late-night licence to 2am",
    source: "LoopNet · Tydus Real Estate (ID 41237570)",
  },
  {
    slug: "baker-street",
    name: "Baker Street",
    neighbourhood: "Marylebone, W1U",
    cityCountry: "London, United Kingdom",
    status: "Launching soon",
    cur: "£",
    size: 6_135,
    pricePerSqft: 1_231,
    valuation: 7_550_000,
    priceLabel: "£7.55M · £1,231 / sq ft",
    yieldPa: "6.1%",
    appreciationPa: "3–5%",
    totalPa: "9–11%",
    cardStat: "6.1% net initial yield",
    wault: "9.1 yrs",
    useClass: "Retail & residential",
    refurbished: "1810 building",
    epc: "On request",
    tenure: "Freehold",
    spv: "SBX-LDN-07 · English-law SPV",
    managingAgent: "Institutional managing agent",
    valuer: "Savills (RICS Red Book)",
    distribution: "Monthly · USDC",
    mapBbox: "-0.1650,51.5190,-0.1490,51.5260",
    mapMarker: "51.5224,-0.1571",
    rent: { current: 80, comparable: 88, forecast5: 98 },
    valuePsf: { current: 1231, comparable: 1290, forecast5: 1410 },
    roi5: 46.0,
    images: { hero: bakerHero, gallery: [baker1, baker2] },
    overview:
      "A highly prominent mixed-use freehold opposite Baker Street Underground, benefiting from over 21.5 million annual passenger movements. Fully let across four units to strong national covenants including Bill's Restaurants and Robert Dyas, with a 9.1-year WAULT.",
    locationTitle: "Marylebone, W1U",
    location: [
      ["Transport", "Opposite Baker Street Underground — Metropolitan, Jubilee, Circle, District and Bakerloo lines."],
      ["Footfall", "Over 21.5 million annual passenger movements at the station opposite."],
      ["Income", "100% let; 90% of income secured beyond seven years."],
    ],
    tenants: [
      ["Bill's Restaurants", "National covenant", "Part of £491,000 pa"],
      ["Robert Dyas", "National covenant", "Long income"],
      ["WAULT", "9.1 years", "100% occupancy · NOI £460,550"],
    ],
    area: "Marylebone, W1U",
    type: "Mixed-use retail · freehold",
    sizeLabel: "6,135 sq ft",
    priceShort: "£1,231 / sq ft",
    note: "Freehold · 100% let · 9.1-yr WAULT · national covenants",
    source: "LoopNet · Green & Partners LLP (ID 40803582)",
  },
];

/* look-up helper + backwards-compatible exports */
export const ASSET_BY_SLUG = Object.fromEntries(ASSETS.map((a) => [a.slug, a]));
export const ASSET = ASSETS[0]; // flagship: Grosvenor Gardens

export function getProjection(a) {
  return a?.projection || DEFAULT_PROJECTION;
}
export const PROJECTION = DEFAULT_PROJECTION;
export { DOCUMENTS, REFERENCES };

/* Pledge-pool shortlist (the three targeted acquisitions) */
export const SHORTLIST = ASSETS.slice(0, 3).map((a) => ({
  slug: a.slug,
  name: a.name,
  area: a.area,
  type: a.type,
  size: a.sizeLabel,
  price: a.priceShort,
  stat: a.cardStat,
  note: a.note,
}));
