/* Country list for the residence selector. Flags are derived from the ISO-3166
   alpha-2 code (regional-indicator emoji), so we only store name + code. */

export const COUNTRIES = [
  ["Afghanistan", "AF"], ["Albania", "AL"], ["Algeria", "DZ"], ["Andorra", "AD"], ["Angola", "AO"],
  ["Antigua and Barbuda", "AG"], ["Argentina", "AR"], ["Armenia", "AM"], ["Australia", "AU"], ["Austria", "AT"],
  ["Azerbaijan", "AZ"], ["Bahamas", "BS"], ["Bahrain", "BH"], ["Bangladesh", "BD"], ["Barbados", "BB"],
  ["Belarus", "BY"], ["Belgium", "BE"], ["Belize", "BZ"], ["Benin", "BJ"], ["Bhutan", "BT"],
  ["Bolivia", "BO"], ["Bosnia and Herzegovina", "BA"], ["Botswana", "BW"], ["Brazil", "BR"], ["Brunei", "BN"],
  ["Bulgaria", "BG"], ["Burkina Faso", "BF"], ["Burundi", "BI"], ["Cambodia", "KH"], ["Cameroon", "CM"],
  ["Canada", "CA"], ["Cape Verde", "CV"], ["Central African Republic", "CF"], ["Chad", "TD"], ["Chile", "CL"],
  ["China", "CN"], ["Colombia", "CO"], ["Comoros", "KM"], ["Congo", "CG"], ["Congo (DRC)", "CD"],
  ["Costa Rica", "CR"], ["Côte d'Ivoire", "CI"], ["Croatia", "HR"], ["Cuba", "CU"], ["Cyprus", "CY"],
  ["Czechia", "CZ"], ["Denmark", "DK"], ["Djibouti", "DJ"], ["Dominica", "DM"], ["Dominican Republic", "DO"],
  ["Ecuador", "EC"], ["Egypt", "EG"], ["El Salvador", "SV"], ["Equatorial Guinea", "GQ"], ["Eritrea", "ER"],
  ["Estonia", "EE"], ["Eswatini", "SZ"], ["Ethiopia", "ET"], ["Fiji", "FJ"], ["Finland", "FI"],
  ["France", "FR"], ["Gabon", "GA"], ["Gambia", "GM"], ["Georgia", "GE"], ["Germany", "DE"],
  ["Ghana", "GH"], ["Greece", "GR"], ["Grenada", "GD"], ["Guatemala", "GT"], ["Guinea", "GN"],
  ["Guinea-Bissau", "GW"], ["Guyana", "GY"], ["Haiti", "HT"], ["Honduras", "HN"], ["Hong Kong SAR", "HK"],
  ["Hungary", "HU"], ["Iceland", "IS"], ["India", "IN"], ["Indonesia", "ID"], ["Iran", "IR"],
  ["Iraq", "IQ"], ["Ireland", "IE"], ["Israel", "IL"], ["Italy", "IT"], ["Jamaica", "JM"],
  ["Japan", "JP"], ["Jordan", "JO"], ["Kazakhstan", "KZ"], ["Kenya", "KE"], ["Kiribati", "KI"],
  ["Kuwait", "KW"], ["Kyrgyzstan", "KG"], ["Laos", "LA"], ["Latvia", "LV"], ["Lebanon", "LB"],
  ["Lesotho", "LS"], ["Liberia", "LR"], ["Libya", "LY"], ["Liechtenstein", "LI"], ["Lithuania", "LT"],
  ["Luxembourg", "LU"], ["Macau SAR", "MO"], ["Madagascar", "MG"], ["Malawi", "MW"], ["Malaysia", "MY"],
  ["Maldives", "MV"], ["Mali", "ML"], ["Malta", "MT"], ["Marshall Islands", "MH"], ["Mauritania", "MR"],
  ["Mauritius", "MU"], ["Mexico", "MX"], ["Micronesia", "FM"], ["Moldova", "MD"], ["Monaco", "MC"],
  ["Mongolia", "MN"], ["Montenegro", "ME"], ["Morocco", "MA"], ["Mozambique", "MZ"], ["Myanmar", "MM"],
  ["Namibia", "NA"], ["Nauru", "NR"], ["Nepal", "NP"], ["Netherlands", "NL"], ["New Zealand", "NZ"],
  ["Nicaragua", "NI"], ["Niger", "NE"], ["Nigeria", "NG"], ["North Korea", "KP"], ["North Macedonia", "MK"],
  ["Norway", "NO"], ["Oman", "OM"], ["Pakistan", "PK"], ["Palau", "PW"], ["Palestine", "PS"],
  ["Panama", "PA"], ["Papua New Guinea", "PG"], ["Paraguay", "PY"], ["Peru", "PE"], ["Philippines", "PH"],
  ["Poland", "PL"], ["Portugal", "PT"], ["Qatar", "QA"], ["Romania", "RO"], ["Russia", "RU"],
  ["Rwanda", "RW"], ["Saint Kitts and Nevis", "KN"], ["Saint Lucia", "LC"], ["Samoa", "WS"], ["San Marino", "SM"],
  ["São Tomé and Príncipe", "ST"], ["Saudi Arabia", "SA"], ["Senegal", "SN"], ["Serbia", "RS"], ["Seychelles", "SC"],
  ["Sierra Leone", "SL"], ["Singapore", "SG"], ["Slovakia", "SK"], ["Slovenia", "SI"], ["Solomon Islands", "SB"],
  ["Somalia", "SO"], ["South Africa", "ZA"], ["South Korea", "KR"], ["South Sudan", "SS"], ["Sri Lanka", "LK"],
  ["Sudan", "SD"], ["Suriname", "SR"], ["Sweden", "SE"], ["Switzerland", "CH"], ["Syria", "SY"],
  ["Taiwan", "TW"], ["Tajikistan", "TJ"], ["Tanzania", "TZ"], ["Thailand", "TH"], ["Timor-Leste", "TL"],
  ["Togo", "TG"], ["Tonga", "TO"], ["Trinidad and Tobago", "TT"], ["Tunisia", "TN"], ["Türkiye", "TR"],
  ["Turkmenistan", "TM"], ["Tuvalu", "TV"], ["Uganda", "UG"], ["Ukraine", "UA"], ["United Arab Emirates", "AE"],
  ["United Kingdom", "GB"], ["United States", "US"],
  ["Uruguay", "UY"], ["Uzbekistan", "UZ"], ["Vanuatu", "VU"], ["Venezuela", "VE"], ["Vietnam", "VN"],
  ["Yemen", "YE"], ["Zambia", "ZM"], ["Zimbabwe", "ZW"],
];

/** ISO alpha-2 → flag emoji (regional indicator symbols). */
export function flagOf(code) {
  if (!code || code.length !== 2) return "🏳️";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + (code.charCodeAt(0) - 65)) + String.fromCodePoint(A + (code.charCodeAt(1) - 65));
}

/** ISO alpha-2 → international dialing code (E.164 country calling code). */
export const DIAL_CODES = {
  AF: "+93", AL: "+355", DZ: "+213", AD: "+376", AO: "+244", AG: "+1", AR: "+54", AM: "+374",
  AU: "+61", AT: "+43", AZ: "+994", BS: "+1", BH: "+973", BD: "+880", BB: "+1", BY: "+375",
  BE: "+32", BZ: "+501", BJ: "+229", BT: "+975", BO: "+591", BA: "+387", BW: "+267", BR: "+55",
  BN: "+673", BG: "+359", BF: "+226", BI: "+257", KH: "+855", CM: "+237", CA: "+1", CV: "+238",
  CF: "+236", TD: "+235", CL: "+56", CN: "+86", CO: "+57", KM: "+269", CG: "+242", CD: "+243",
  CR: "+506", CI: "+225", HR: "+385", CU: "+53", CY: "+357", CZ: "+420", DK: "+45", DJ: "+253",
  DM: "+1", DO: "+1", EC: "+593", EG: "+20", SV: "+503", GQ: "+240", ER: "+291", EE: "+372",
  SZ: "+268", ET: "+251", FJ: "+679", FI: "+358", FR: "+33", GA: "+241", GM: "+220", GE: "+995",
  DE: "+49", GH: "+233", GR: "+30", GD: "+1", GT: "+502", GN: "+224", GW: "+245", GY: "+592",
  HT: "+509", HN: "+504", HK: "+852", HU: "+36", IS: "+354", IN: "+91", ID: "+62", IR: "+98",
  IQ: "+964", IE: "+353", IL: "+972", IT: "+39", JM: "+1", JP: "+81", JO: "+962", KZ: "+7",
  KE: "+254", KI: "+686", KW: "+965", KG: "+996", LA: "+856", LV: "+371", LB: "+961", LS: "+266",
  LR: "+231", LY: "+218", LI: "+423", LT: "+370", LU: "+352", MO: "+853", MG: "+261", MW: "+265",
  MY: "+60", MV: "+960", ML: "+223", MT: "+356", MH: "+692", MR: "+222", MU: "+230", MX: "+52",
  FM: "+691", MD: "+373", MC: "+377", MN: "+976", ME: "+382", MA: "+212", MZ: "+258", MM: "+95",
  NA: "+264", NR: "+674", NP: "+977", NL: "+31", NZ: "+64", NI: "+505", NE: "+227", NG: "+234",
  KP: "+850", MK: "+389", NO: "+47", OM: "+968", PK: "+92", PW: "+680", PA: "+507", PG: "+675",
  PY: "+595", PE: "+51", PH: "+63", PL: "+48", PT: "+351", QA: "+974", RO: "+40", RU: "+7",
  RW: "+250", KN: "+1", LC: "+1", VC: "+1", WS: "+685", SM: "+378", ST: "+239", SA: "+966",
  SN: "+221", RS: "+381", SC: "+248", SL: "+232", SG: "+65", SK: "+421", SI: "+386", SB: "+677",
  SO: "+252", ZA: "+27", KR: "+82", SS: "+211", ES: "+34", LK: "+94", SD: "+249", SR: "+597",
  SE: "+46", CH: "+41", SY: "+963", TW: "+886", TJ: "+992", TZ: "+255", TH: "+66", TL: "+670",
  TG: "+228", TO: "+676", TT: "+1", TN: "+216", TR: "+90", TM: "+993", TV: "+688", UG: "+256",
  UA: "+380", AE: "+971", GB: "+44", US: "+1", UY: "+598", UZ: "+998", VU: "+678", VA: "+379",
  VE: "+58", VN: "+84", YE: "+967", ZM: "+260", ZW: "+263",
};

export const dialOf = (code) => DIAL_CODES[code] || "";

/** Regions this offering cannot be sold into: the US, the UK, and the EEA/EU.
 *  Excluded residents may still register their details, but receive no allocation. */
export const EXCLUDED_CODES = new Set([
  "US", "GB",
  // EU-27
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EEA (non-EU)
  "IS", "LI", "NO",
]);

/** ISO alpha-2 for a country name (or "" if unknown). */
export const codeOfName = (name) => (COUNTRIES.find(([n]) => n === name) || [])[1] || "";

/** True when the named country is in an excluded region. */
export const isExcludedCountryName = (name) => EXCLUDED_CODES.has(codeOfName(name));

/** Country name for an ISO alpha-2 code (or "" if unknown). */
export function countryNameOf(code) {
  const found = COUNTRIES.find(([, c]) => c === code);
  return found ? found[0] : "";
}

// Names for dialing-code entries that aren't in the residence list (which
// excludes UK/US). The phone picker offers every dialing code regardless.
const PHONE_NAME_SUPPLEMENT = { GB: "United Kingdom", US: "United States", VA: "Vatican City" };

/** All countries with a dialing code, [name, code], sorted by name — for the
 *  phone picker (independent of the residence eligibility list). */
export const PHONE_COUNTRIES = Object.keys(DIAL_CODES)
  .map((code) => [countryNameOf(code) || PHONE_NAME_SUPPLEMENT[code] || code, code])
  .sort((a, b) => a[0].localeCompare(b[0]));

/** Best-guess ISO alpha-2 for the visitor, from the browser locale region
 *  (e.g. "en-GB" → "GB"). Client-only, no network/geo-IP. Null if unknown. */
export function guessCountryCode() {
  try {
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const l of langs) {
      const m = /[-_]([A-Za-z]{2})$/.exec(l || "");
      if (m) {
        const code = m[1].toUpperCase();
        if (DIAL_CODES[code]) return code; // any known country (broader than residence list)
      }
    }
  } catch {
    /* navigator unavailable (SSR/prerender) */
  }
  return null;
}
