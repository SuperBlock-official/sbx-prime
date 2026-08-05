import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { registerInterest } from "../lib/api";

/* GitHub-docs-style whitepaper: persistent left nav, content column, right
   "on this page" with scroll-spy, anchor links. Grounded in SBX Prime's own
   whitepaper (SBX Group / Superblock). Forward-looking items (secondary
   market, liquidity pools, $SBX) are marked coming soon. */
const SECTIONS = [
  {
    id: "summary",
    title: "Executive summary",
    body: [
      "SBX Prime is an institutional-grade tokenized real estate platform built on the ERC-3643 security-token standard and powered by Superblock's tokenization infrastructure. It gives investors direct fractional ownership of super-prime buildings in London, Dubai, and Singapore, from a single square foot.",
      "It combines two decades of SBX Group's real estate expertise with on-chain compliance and AI-assisted governance, delivering institutional investment quality with the access, transparency, and liquidity of a modern digital asset.",
    ],
  },
  {
    id: "problem",
    title: "The problem",
    body: ["Traditional real estate investment locks out almost everyone:"],
    bullets: [
      ["High capital barriers", "Direct entry into prime assets typically starts at $500K to $10M+."],
      ["Illiquidity", "Capital is locked for five to ten year hold periods."],
      ["Geographic restrictions", "Foreign-ownership rules block cross-border participation."],
      ["Opacity", "Limited reporting, manual distributions, and records you cannot audit."],
      ["Counterparty risk", "Reliance on intermediaries whose incentives are not aligned with yours."],
    ],
  },
  {
    id: "solution",
    title: "The solution",
    body: ["SBX Prime removes each barrier without removing the legal substance of ownership:"],
    bullets: [
      ["Fractional tokenization", "Each building is issued as ERC-3643 tokens, one token per saleable square foot."],
      ["On-chain liquidity", "Tokens are transferable on a compliant secondary marketplace (coming soon)."],
      ["Global compliant KYC", "Identity verification across 190+ countries, under each investor's applicable regime."],
      ["Transparent ledger", "Ownership, income, and governance recorded on the Polygon blockchain."],
      ["AI-assisted governance", "A DAO voting system with AI analysis of every proposal."],
    ],
  },
  {
    id: "token-standard",
    title: "ERC-3643 token standard (T-REX)",
    body: [
      "SBX Prime uses ERC-3643, the T-REX (Token for Regulated EXchanges) standard built and maintained by Superblock. It is the leading compliance-first security-token standard, adopted by regulated financial institutions worldwide, and it makes compliance a property of the asset itself.",
    ],
    bullets: [
      ["Identity registry", "Every wallet is linked to an on-chain identity recording KYC/AML status, accreditation, and jurisdiction eligibility."],
      ["Compliance module", "Rules are enforced at the contract level, automatically blocking non-compliant transfers before they execute."],
      ["Transfer management", "Transfers pass real-time compliance checks; the module can pause, restrict, or force-transfer to meet legal requirements."],
    ],
  },
  {
    id: "superblock",
    title: "The Superblock platform",
    body: [
      "The tokenization infrastructure is built on Superblock's ONCHAINID platform, a reference implementation of ERC-3643 used by regulated institutions. Superblock's smart contracts are open-source, audited by CertiK, and have processed over $2 billion in tokenized assets globally.",
    ],
    bullets: [
      ["Token issuance engine", "Property SPV shares converted to ERC-3643 tokens with full legal documentation."],
      ["Identity management", "ONCHAINID digital identity for every investor, stored on-chain (EIP-734/735)."],
      ["Compliance automation", "Real-time transfer-compliance checking across all registered rules."],
      ["Asset registry & audit trail", "An immutable registry linking legal titles to token contracts, with a complete on-chain event history."],
    ],
  },
  {
    id: "onboarding",
    title: "How assets are onboarded",
    body: [
      "Every asset passes the same institutional pipeline before a single token is issued. The rigor is the product: we onboard the way a pension fund underwrites, then tokenize.",
    ],
    bullets: [
      ["Source & screen", "Off-market and on-market sourcing of super-prime assets in target cities."],
      ["Due diligence", "Legal, technical, and financial diligence, with title and tenancy verified."],
      ["Independent valuation", "RICS Red Book valuation at acquisition, revalued quarterly thereafter."],
      ["SPV & title", "The building is placed in a bankruptcy-remote SPV; legal title stays registered with the Land Department, HMLR, or URA as applicable."],
      ["Issue & list", "Superblock mints the SPV as ERC-3643 tokens, one per square foot, and the asset is listed with its full prospectus."],
    ],
  },
  {
    id: "regulatory",
    title: "Regulatory structure",
    body: [
      "There is no single right wrapper for tokenized real estate. SBX Prime structures each offering around three variables, where the asset sits, where the issuing vehicle is formed, and where the investor resides, then selects the most efficient combination for that deal.",
      "In practice this lets a US-accredited base and a global, largely retail, non-US audience invest in the same asset, each under the rule set built for them.",
    ],
    bullets: [
      ["Delaware SPV", "A Delaware LLC or corporation holds the asset and its economic and governance rights; the tokens are that vehicle's shares."],
      ["Reg D + Reg S", "Rule 506(c) admits verified accredited US investors; Regulation S opens the same offering to non-US investors, including retail outside the US, targeting a global audience."],
      ["Offshore vehicles", "Tax-neutral BVI, Cayman Islands, or Jersey companies for international pooling where they are the more efficient home."],
      ["Private fund structures", "Regulated or exempt fund vehicles where a fund, rather than a single-asset SPV, is the better fit."],
    ],
  },
  {
    id: "tokenomics",
    title: "Tokenomics & fees",
    body: [
      "Each property issues its own ERC-3643 contract, named SBX-[PROPERTY_CODE]. Supply is fixed at issuance and equals the building's total square footage; the token price is the independent valuation divided by that area. Tokens have zero decimals, so you own whole square feet, never fractions of one.",
    ],
    table: {
      head: ["Fee", "Rate", "When charged"],
      rows: [
        ["Platform fee", "1.0%", "At investment"],
        ["Management fee", "8% of rental income", "Quarterly"],
        ["Performance fee", "20% above an 8% IRR", "At exit"],
        ["Secondary market", "0.5% per side", "On each trade"],
      ],
    },
    bullets: [
      ["Rent collected", "Gross rent is collected by the SPV's managing agent."],
      ["Costs & fees deducted", "Operating costs, then the management fee, are deducted."],
      ["Distributed on-chain", "A smart contract splits the remainder pro-rata and pays each registered wallet."],
    ],
  },
  {
    id: "management",
    title: "Institutional management & reporting",
    body: [
      "SBX Prime runs each building for its whole life to an institutional standard, and reports on it transparently. Income flows through audited smart contracts with no manual handling, so what you are owed and what you are paid are always reconcilable on-chain.",
      "Holders receive monthly income statements, quarterly asset reports, quarterly RICS valuations, and annually audited SPV accounts prepared by a Big Four firm. Every property carries full building and loss-of-rent insurance.",
    ],
  },
  {
    id: "governance",
    title: "AI-powered DAO governance",
    body: [
      "SBX Prime introduces AI-assisted DAO governance for tokenized real estate: token holders vote, weighted by holdings, on the decisions that shape their assets, and an AI engine makes each proposal legible before the vote.",
    ],
    bullets: [
      ["What holders vote on", "Major capex and refurbishment, exit timing and method, fee adjustments, new acquisitions, and emergency decisions."],
      ["AI governance engine", "Each proposal is analysed for financial impact, market context, and risk, with a plain-English summary and a recommended vote."],
      ["Advisory, not binding", "The AI recommendation discloses its full reasoning; investors keep complete autonomy. Voting is anonymous and holding-weighted."],
    ],
  },
  {
    id: "secondary",
    title: "Secondary market, liquidity & $SBX",
    body: [
      "Real estate is illiquid by nature. Tokenization makes transferring ownership far faster and cheaper than a conventional sale. A compliant peer-to-peer secondary marketplace (coming soon) will let verified holders trade tokens, with ERC-3643 rules enforced on every trade and a 0.5%-per-side fee.",
      "To deepen liquidity, permissioned liquidity pools are planned to provide near-instant liquidity against asset tokens, coordinated by the $SBX platform token across the Superblock ecosystem. Liquidity pools and $SBX are on the roadmap, subject to regulatory approval; nothing here is an offer of $SBX.",
    ],
  },
  {
    id: "protections",
    title: "Investor rights & protections",
    body: ["Protection is a foundational principle, structural rather than promised, and it operates on three levels."],
    bullets: [
      ["Legal", "Bankruptcy-remote SPVs, a jurisdiction-appropriate regulated framework, an independent trustee per SPV, and legal title held at the relevant land registry."],
      ["Financial", "Multi-signature escrow until acquisition completes, annual Big Four audits, quarterly RICS valuations, and full insurance."],
      ["Blockchain", "Immutable ownership records on Polygon and rental income routed through audited smart contracts, with no manual handling."],
    ],
  },
  {
    id: "technology",
    title: "Technology stack",
    body: ["The platform is engineered on institutional infrastructure across four layers."],
    bullets: [
      ["Blockchain", "Polygon PoS, Solidity 0.8+ audited by CertiK, IPFS document hashing, and Chainlink oracles for valuations and FX."],
      ["Identity", "ONCHAINID (EIP-734/735) via Superblock, Jumio biometric KYC, and Chainalysis plus ComplyAdvantage AML screening."],
      ["Application", "Next.js frontend, Node.js APIs, PostgreSQL and IPFS storage, on AWS and Azure behind Cloudflare."],
      ["AI", "Governance analysis, an ML property-valuation model, risk scoring, and portfolio personalisation."],
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap",
    body: ["SBX Prime is delivered in phases, from a compliant foundation to a global, liquid market."],
    bullets: [
      ["Foundation", "ERC-3643 deployment on Polygon, Superblock ONCHAINID integration, first offerings structured under Reg D / Reg S, first tokenizations, web platform."],
      ["Growth", "Mobile apps, the secondary marketplace, the DAO governance module, the AI engine, and London expansion."],
      ["Scale", "Singapore launch, an institutional tier, multi-chain deployment, DeFi integrations, and a $1B AUM milestone."],
      ["Global", "New York, Hong Kong, and Tokyo markets, exchange-listing partnerships, and regulated fund products."],
    ],
  },
  {
    id: "team",
    title: "Team & advisors",
    body: [
      "SBX Prime is built by the SBX Group team, a Dubai-based real estate group with over twenty years of institutional market experience. The advisory board spans real estate (former JLL, CBRE, and Knight Frank executives), blockchain (ERC-3643 core contributors), regulation (former SEC and FCA advisers), and finance (former Goldman Sachs and Morgan Stanley real estate bankers).",
      "Technology partners include Superblock (tokenization infrastructure), Chainlink (oracles), Polygon (network), and AWS and Azure (cloud).",
    ],
  },
];

const RELATED = [
  ["Technology", "/technology"],
  ["Trust & Security", "/trust"],
  ["Marketplace", "/invest"],
  ["FAQ", "/faq"],
];

function AnchorHeading({ id, n, children }) {
  return (
    <h2 id={id} className="group scroll-mt-28 flex items-baseline gap-3 font-display text-[1.6rem] font-extrabold text-ink">
      <span className="font-mono text-sm font-bold text-brand">{n}</span>
      <a href={`#${id}`} className="relative">
        {children}
        <span className="absolute -left-5 top-1/2 -translate-y-1/2 text-brand opacity-0 transition group-hover:opacity-100" aria-hidden>#</span>
      </a>
    </h2>
  );
}

export default function Whitepaper() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [active, setActive] = useState(SECTIONS[0].id);
  const ok = /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!ok || state === "sending") return;
    setState("sending");
    await registerInterest({ email, cities: [], indicativeAmount: "whitepaper-download" });
    setState("done");
  };

  const navLink = (id, title) =>
    `block rounded-md px-3 py-1.5 text-[13px] leading-snug transition ${
      active === id ? "bg-brand/10 font-semibold text-brand-dark" : "text-ink/60 hover:bg-ink/[0.04] hover:text-ink"
    }`;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Whitepaper | SBX Prime"
        description="The SBX Prime whitepaper: structure, ERC-3643 token standard, underwriting, USDC distribution mechanics, secondary-market and liquidity design ($SBX), governance, and risk factors."
        path="/whitepaper"
      />

      {/* ---------- docs top bar ---------- */}
      <div className="border-b border-hairline">
        <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-4 px-5 py-3.5">
          <p className="font-mono text-[12px] text-ink/50">
            <Link to="/" className="hover:text-ink">Docs</Link>
            <span className="mx-1.5 text-ink/30">/</span>
            <span className="font-semibold text-ink">Whitepaper</span>
          </p>
          <a href="#get-pdf" className="btn-ghost !py-2 text-[13px]">Download PDF</a>
        </div>
      </div>

      <div className="mx-auto grid max-w-[86rem] gap-0 px-0 lg:grid-cols-[248px_minmax(0,1fr)_216px]">
        {/* ---------- left nav ---------- */}
        <aside className="hidden border-r border-hairline lg:block">
          <div className="sticky top-[4.75rem] max-h-[calc(100vh-4.75rem)] overflow-y-auto px-4 py-8">
            <p className="px-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/40">Whitepaper v1.0</p>
            <nav className="mt-3 space-y-0.5">
              {SECTIONS.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className={navLink(s.id, s.title)}>
                  <span className="mr-1.5 font-mono text-[11px] text-brand/70">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              ))}
            </nav>
            <p className="mt-7 px-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/40">Related</p>
            <nav className="mt-3 space-y-0.5">
              {RELATED.map(([label, to]) => (
                <Link key={to} to={to} className="block rounded-md px-3 py-1.5 text-[13px] text-ink/60 transition hover:bg-ink/[0.04] hover:text-ink">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* ---------- content ---------- */}
        <article className="min-w-0 px-5 py-10 sm:px-10 lg:px-14">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand-dark">Whitepaper · v1.0 · August 2026</p>
          <h1 className="mt-3 font-display text-[2.5rem] font-extrabold leading-[1.05] text-ink sm:text-[3rem]">
            SBX Prime Whitepaper
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/65">
            How SBX Prime turns trophy commercial real estate into compliant, income-producing, governable
            ownership from a single square foot. Written for investors and their advisers, not for hype.
          </p>
          <p className="mt-4 inline-block rounded-md border border-hairline bg-mist/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45">
            For qualified investors only · Indicative · Not an offer of securities
          </p>

          {/* abstract callout */}
          <div className="mt-8 rounded-xl border-l-[3px] border-brand bg-mist/50 p-5">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand-dark">Abstract</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
              SBX Prime issues super-prime real estate as ERC-3643 security tokens, one token per square foot of
              a bankruptcy-remote SPV, on Superblock's ONCHAINID infrastructure. Income flows through audited smart
              contracts, assets are revalued quarterly by RICS surveyors, and holders govern each building through
              an AI-assisted DAO. Each offering is wrapped in the most efficient regulatory structure for its asset,
              vehicle, and investor jurisdictions.
            </p>
          </div>

          {/* sections */}
          <div className="mt-12 space-y-12">
            {SECTIONS.map((s, i) => (
              <section key={s.id}>
                <AnchorHeading id={s.id} n={String(i + 1).padStart(2, "0")}>{s.title}</AnchorHeading>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-[15px] leading-[1.75] text-ink/70">{p}</p>
                  ))}
                </div>
                {s.table && (
                  <div className="mt-6 overflow-x-auto rounded-lg border border-hairline">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline bg-mist/50 text-left">
                          {s.table.head.map((h) => (
                            <th key={h} className="px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink/50">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        {s.table.rows.map((r, ri) => (
                          <tr key={ri}>
                            {r.map((c, ci) => (
                              <td key={ci} className={`px-4 py-2.5 ${ci === 0 ? "font-display font-bold text-ink" : "text-ink/65"}`}>{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.bullets && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {s.bullets.map(([t, b]) => (
                      <div key={t} className="rounded-lg border border-hairline bg-mist/40 p-4">
                        <p className="font-display text-[13px] font-bold text-ink">{t}</p>
                        <p className="mt-1 text-[12px] leading-relaxed text-ink/55">{b}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* download */}
          <div id="get-pdf" className="mt-14 scroll-mt-28 rounded-xl border border-hairline bg-mist/40 p-6">
            {state === "done" ? (
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/15 font-display text-lg text-brand">✓</span>
                <p className="text-sm text-ink/70">The PDF is on its way to <b className="text-ink">{email}</b>.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-ink">Download the full PDF</h3>
                  <p className="mt-1 text-[12px] text-ink/55">The 40-page version with appendices, gated only by email.</p>
                  <input
                    className="field mt-3" type="email" placeholder="Work email" value={email}
                    onChange={(e) => setEmail(e.target.value)} aria-label="Email" required
                  />
                </div>
                <button type="submit" disabled={!ok || state === "sending"} className="btn-primary shrink-0 disabled:opacity-40">
                  {state === "sending" ? "Sending…" : "Email me the PDF"}
                </button>
              </form>
            )}
          </div>

          <p className="mt-10 border-t border-hairline pt-6 text-[11px] leading-relaxed text-ink/40">
            This whitepaper is for information only and does not constitute an offer to sell or a solicitation to buy
            any securities, nor investment, legal, or tax advice. It has not been reviewed by any regulatory authority.
            Each offering is structured under the regime appropriate to its asset, vehicle, and investor jurisdictions,
            for example Regulation D and Regulation S in and outside the United States. Figures are indicative and
            subject to independent valuation. Capital is at risk and past performance is not a guide to future returns.
            The secondary market, liquidity pools, and $SBX are roadmap items subject to regulatory approval and may
            change. Prospective investors should read the full offering memorandum and risk disclosures before investing.
          </p>
        </article>

        {/* ---------- right on-this-page ---------- */}
        <aside className="hidden border-l border-hairline xl:block">
          <div className="sticky top-[4.75rem] px-5 py-10">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/40">On this page</p>
            <nav className="mt-3 space-y-1 border-l border-hairline">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`-ml-px block border-l-2 py-1 pl-3 text-[12px] leading-snug transition ${
                    active === s.id ? "border-brand font-semibold text-brand-dark" : "border-transparent text-ink/50 hover:text-ink"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
