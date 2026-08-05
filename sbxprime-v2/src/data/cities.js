import london from "../assets/images/london-office.png";
import dubai from "../assets/images/dubai-skyline.jpg";
import singapore from "../assets/images/singapore-marina.jpg";
import newYork from "../assets/cities/new-york.png";
import miami from "../assets/cities/miami.png";
import hongKong from "../assets/cities/hong-kong.png";
import riyadh from "../assets/cities/riyadh.png";
import tokyo from "../assets/cities/tokyo.png";
import sydney from "../assets/cities/sydney.png";

/* Returns are ALWAYS two components: rental yield + capital appreciation.
 Appreciation benchmarks: London 3–5% (Savills/JLL forecasts), Dubai 5–8%, Singapore 2–4%. */
export const CITIES = [
 {
 slug: "london",
 name: "London",
 country: "United Kingdom",
 asset: "Grosvenor Gardens, Victoria",
 status: "live",
 image: london,
 yieldPa: "6–7%",
 appreciationPa: "3–5%",
 totalPa: "9–11%",
 apprSource: "Savills / JLL forecasts",
 blurb:
 "18,036 sq ft of Grade II listed office and residential in Victoria & Belgravia, income-producing with reversionary upside. The launch asset of SBX Prime.",
 },
 {
 slug: "dubai",
 name: "Dubai",
 country: "United Arab Emirates",
 asset: "Downtown Dubai Office Floor",
 status: "soon",
 image: dubai,
 yieldPa: "6–7%",
 appreciationPa: "5–8%",
 totalPa: "11–15%",
 apprSource: "regional market forecasts",
 blurb:
 "A full office floor in Downtown Dubai, the emirate's prime commercial district, in structuring for Q4.",
 },
 {
 slug: "singapore",
 name: "Singapore",
 country: "Singapore",
 asset: "Raffles Place Tower Floor",
 status: "soon",
 image: singapore,
 yieldPa: "6%",
 appreciationPa: "2–4%",
 totalPa: "8–10%",
 apprSource: "regional market forecasts",
 blurb:
 "Grade-A space in Raffles Place, the heart of Singapore's financial district, in structuring.",
 },
 // Pipeline cities, placeholder skyline art until photography is licensed.
 { slug: "new-york", name: "New York", country: "United States", asset: "Midtown Manhattan Office", status: "pipeline", image: newYork, yieldPa: "6%", appreciationPa: "3–5%", totalPa: "9–11%", apprSource: "US market forecasts", blurb: "Midtown Manhattan trophy office, pipeline." },
 { slug: "miami", name: "Miami", country: "United States", asset: "Brickell Waterfront Office", status: "pipeline", image: miami, yieldPa: "6–7%", appreciationPa: "4–6%", totalPa: "10–13%", apprSource: "US market forecasts", blurb: "Brickell financial district, pipeline." },
 { slug: "hong-kong", name: "Hong Kong", country: "Hong Kong SAR", asset: "Central District Tower Floor", status: "pipeline", image: hongKong, yieldPa: "5–6%", appreciationPa: "2–4%", totalPa: "7–10%", apprSource: "APAC market forecasts", blurb: "Central district Grade-A, pipeline." },
 { slug: "riyadh", name: "Riyadh", country: "Saudi Arabia", asset: "KAFD Office Floor", status: "pipeline", image: riyadh, yieldPa: "7%", appreciationPa: "5–8%", totalPa: "12–15%", apprSource: "GCC market forecasts", blurb: "King Abdullah Financial District, pipeline." },
 { slug: "tokyo", name: "Tokyo", country: "Japan", asset: "Marunouchi Office Floor", status: "pipeline", image: tokyo, yieldPa: "5–6%", appreciationPa: "2–4%", totalPa: "7–10%", apprSource: "APAC market forecasts", blurb: "Marunouchi CBD, pipeline." },
 { slug: "sydney", name: "Sydney", country: "Australia", asset: "Barangaroo Office Floor", status: "pipeline", image: sydney, yieldPa: "6%", appreciationPa: "3–5%", totalPa: "9–11%", apprSource: "APAC market forecasts", blurb: "Barangaroo waterfront precinct, pipeline." },
];

export const cityBySlug = (slug) => CITIES.find((c) => c.slug === slug);

export const LONDON = CITIES[0];

/* Placeholder demand intelligence shown on /invest.
 TODO(backend): replace with live aggregation of registerInterest() submissions. */
export const GLOBAL_DEMAND = { indicativeUsd: 4_260_000, registrations: 389 };
