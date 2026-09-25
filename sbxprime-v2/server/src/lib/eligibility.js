// Country NAMES (as sent by the client, matching src/data/countries.js) that
// are excluded from allocation: the US, the UK, and the EEA/EU. Excluded
// residents are still recorded (status 'ineligible') but get no allocation and
// are not counted in the raise.
const EXCLUDED_NAMES = new Set([
  "United States", "United Kingdom",
  // EU-27
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark",
  "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
  "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland",
  "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
  // EEA (non-EU)
  "Iceland", "Liechtenstein", "Norway",
]);

export const isExcludedCountry = (name) => EXCLUDED_NAMES.has(String(name || "").trim());
