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
  ["Uruguay", "UY"], ["Uzbekistan", "UZ"], ["Vanuatu", "VU"], ["Venezuela", "VE"], ["Vietnam", "VN"],
  ["Yemen", "YE"], ["Zambia", "ZM"], ["Zimbabwe", "ZW"],
];

/** ISO alpha-2 → flag emoji (regional indicator symbols). */
export function flagOf(code) {
  if (!code || code.length !== 2) return "🏳️";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + (code.charCodeAt(0) - 65)) + String.fromCodePoint(A + (code.charCodeAt(1) - 65));
}
