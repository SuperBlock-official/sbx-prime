export const FAQ_CATEGORIES = [
 {
 category: "The Basics",
 items: [
 {
 q: "What is SBX Prime?",
 a: "SBX Prime is an institutional-grade real estate tokenization platform by SUPERBLOCK. Investors outside the US, UK, and Europe own fractional shares of trophy commercial real estate through ERC-3643 tokens, where one token represents one square foot and one share in the property-owning SPV.",
 },
 {
 q: "What does 1 token actually represent?",
 a: "One token = one square foot = one share in the special purpose vehicle (SPV) that owns the building. This is direct, register-backed economic ownership, not a synthetic exposure or a fund unit. The Grosvenor Gardens launch asset is divided into 18,036 tokens, one per saleable square foot.",
 },
 {
 q: "What returns can I expect?",
 a: "Returns always come from two components: rental yield of 6–7% per annum, distributed from tenant rent, plus capital appreciation potential, approximately 3–5% per annum for Central London based on Savills and JLL forecasts. Together that is an indicative total return of roughly 9–11% per annum for the London asset. Capital appreciation is unrealised until sale and not guaranteed.",
 },
 {
 q: "What is the minimum investment?",
 a: "One square foot. For the Grosvenor Gardens launch asset, that is one token at about $740 (£582). There is no institutional minimum, the point of tokenization is access.",
 },
 ],
 },
 {
 category: "Eligibility & Compliance",
 items: [
 {
 q: "Who can invest?",
 a: "The current launch is offered only to eligible persons outside the US, UK, and Europe, subject to the laws of your country of residence. It is not available to persons in the United States, the United Kingdom, or Europe (EEA/EU). Eligibility is self-certified at pledge and verified during onboarding KYC.",
 },
 {
 q: "Why ERC-3643 and not a normal token?",
 a: "ERC-3643 is a permissioned token standard. Identity is bound to the token itself: transfers only settle between wallets that hold verified on-chain credentials. That makes compliance legally enforceable at the token level, unlike ERC-20, where anyone can hold or move the token and compliance is bolted on afterwards.",
 },
 {
 q: "Is SBX Prime regulated?",
 a: "The platform operates a compliance-first structure: each property sits in its own SPV, tokens are issued to eligible investors only through an offshore structure and are not offered as securities, and full KYC/AML applies before settlement. The structure is designed with regulatory counsel across the jurisdictions we operate in.",
 },
 {
 q: "Do I pay tax on my returns?",
 a: "Tax treatment depends on your country of residence. Rental distributions and any capital gains are generally taxable; SBX Prime provides annual statements to support your filings but does not provide tax advice. Please consult your adviser.",
 },
 ],
 },
 {
 category: "The Pledge & Investing",
 items: [
 {
 q: "What is a pledge, am I committing money now?",
 a: "No. A pledge is a reservation of allocation, not a payment. You tell us how much you intend to invest (in USDC or by square feet), and we hold your place in the raise. Funds move only after KYC verification and legal subscription at closing. You can amend or withdraw a pledge before then.",
 },
 {
 q: "How do I pay when the raise closes?",
 a: "Subscriptions settle in USDC. Fiat on-ramp options are being finalised with payment partners for investors who prefer to fund from a bank account.",
 },
 {
 q: "How is rent paid to me?",
 a: "Net rental income is distributed monthly in USDC, pro-rata to your token holding, directly to your verified wallet. The launch asset's tenant pays quarterly in advance; distributions are smoothed to monthly.",
 },
 {
 q: "Can I sell my tokens?",
 a: "Yes. After the primary raise, tokens are listed on the SBX Prime secondary marketplace, where verified investors can list holdings and accept offers per square foot. Because tokens are ERC-3643, transfers settle only between verified investors, liquidity without compliance risk.",
 },
 {
 q: "What is the instant-liquidity pool, and how does $SBX staking work?",
 a: "If you want to exit immediately rather than wait for a secondary buyer, an instant-liquidity pool can take your tokens on the spot for a 4% fee. Those pools are funded by $SBX stakers: holders of the $SBX platform token stake into a market's liquidity pool and, in return for providing the liquidity, earn a pro-rata share of that 4% fee whenever someone uses the pool. The people who provide liquidity earn from the people who use it. Liquidity pools and $SBX are on the roadmap, subject to regulatory approval.",
 },
 ],
 },
 {
 category: "The Asset & Structure",
 items: [
 {
 q: "Who manages the building?",
 a: "Institutional managing agents. The Central London asset is managed under mandate with a top-tier firm (CBRE-calibre), handling leasing, service charge, insurance, and building operations. Asset-level decisions above defined thresholds go to token-holder votes.",
 },
 {
 q: "What happens if SUPERBLOCK disappears?",
 a: "The property is owned by its own SPV, not by SUPERBLOCK. Your tokens are shares in that SPV, recorded on-chain and mirrored in the shareholder register. An appointed administrator can step in to run or wind down the SPV, selling the asset and distributing proceeds to token holders.",
 },
 {
 q: "Where are investor funds held before closing?",
 a: "Pledges involve no funds. At closing, subscription funds flow through segregated client-money accounts / on-chain escrow with pre-defined release conditions tied to completion of the SPV share transfer.",
 },
 {
 q: "What are the key risks?",
 a: "Real estate values can fall as well as rise; rental income depends on tenant performance; tokens may be illiquid despite the secondary market; currency and regulatory changes can affect returns. Capital appreciation figures are forecasts, not promises. Invest only what you can afford to hold long-term.",
 },
 ],
 },
];

/* Flattened for the FAQPage JSON-LD */
export const FAQ_FLAT = FAQ_CATEGORIES.flatMap((c) => c.items);
