import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { registerInterest } from "../lib/api";

/* GitHub-docs-style whitepaper: persistent left nav, content column, right
   "on this page" with scroll-spy, anchor links. Forward-looking mechanics
   (secondary market, $SBX, liquidity pools) are described as roadmap. */
const SECTIONS = [
  {
    id: "access",
    title: "The access problem",
    body: [
      "The best commercial buildings in the world have only ever traded in very large pieces. A prime Central London office changes hands for tens or hundreds of millions of pounds, in a single line, between a small club of institutions: sovereign wealth funds, pension funds, insurers, and the largest private offices.",
      "Individuals are left with proxies. Listed REITs bundle hundreds of assets and trade on equity-market sentiment rather than the underlying bricks. Private funds carry high minimums, long lock-ups, and layered fees. Crowdfunding platforms often hold the sponsor's promise rather than the asset itself.",
      "SBX Prime removes the minimum without removing the substance. We acquire an institutional-grade building, ring-fence it in its own company, and issue that company as tokens you can own from a single square foot, with the same legal ownership an institution would hold.",
    ],
  },
  {
    id: "structure",
    title: "The structure: 1 token = 1 sq ft = 1 share",
    body: [
      "Each asset is held in its own single-purpose company (SPV) under English law. The SPV owns the building and nothing else. We then issue the SPV's shares as security tokens on a one-to-one basis with the building's saleable area: one token represents one square foot and one share of the SPV.",
      "This makes ownership legible. The token price is simply the independent valuation divided by the saleable area, with no premium for the wrapper. Your economic rights, income and capital, are the rights of a shareholder in the company that owns the building, not a synthetic exposure or an IOU.",
    ],
    bullets: [
      ["Ring-fenced", "The SPV is bankruptcy-remote from the platform. Your claim survives anything that happens to SBX Prime."],
      ["One standard unit", "One square foot is comparable across every market we open, London, Dubai, Singapore and beyond."],
      ["Register reconciliation", "The SPV shareholder register and the on-chain token ledger are reconciled continuously as one source of truth."],
    ],
  },
  {
    id: "erc3643",
    title: "ERC-3643 and on-chain compliance",
    body: [
      "The tokens are issued under ERC-3643, the token standard for permissioned securities. Compliance becomes a property of the asset itself: transfers settle only between verified, eligible identities, enforced by the contract rather than by a promise.",
      "Every holder is bound to a verified identity. Transfers that would breach eligibility, jurisdiction, or holding rules simply cannot execute. If a holder loses their keys, the property is not lost: the issuer can reissue tokens to the same verified identity after checks. Contracts are independently audited before issuance and deployed on Polygon with redundant institutional infrastructure.",
    ],
  },
  {
    id: "underwriting",
    title: "Underwriting and the London launch",
    body: [
      "We underwrite the way an institution buys. Every asset is independently valued to RICS Red Book standard at acquisition and revalued every three to six months thereafter, with rental and capital evidence triangulated against comparable transactions rather than our own optimism.",
      "The launch programme is a shortlist of real Central London assets: Grade-A and landmark buildings across Victoria, the City, Mayfair and Westminster. Returns are always presented as two components, a rental yield plus capital appreciation, never yield alone. Central London rental and capital-growth forecasts follow Savills and JLL. All figures are indicative and capital is at risk.",
    ],
  },
  {
    id: "distribution",
    title: "Rental distribution mechanics",
    body: [
      "Net rental income, after costs, service charge, and reserves, is distributed monthly in USDC, pro-rata to token holdings. Distributions are paid on-chain and recorded against the token register, so every payment is reconcilable.",
      "Because income is distributed in a stablecoin, holders receive predictable cash flow without needing to manage a landlord's operational burden. The managing agent handles rent collection, arrears, leasing, and maintenance; holders receive the statement and the money.",
    ],
  },
  {
    id: "liquidity",
    title: "Secondary market, liquidity, and $SBX",
    body: [
      "Real estate is illiquid by nature. Tokenization does not repeal that, but it can make transferring ownership far cheaper and faster than a conventional sale. SBX Prime is designed around a compliant secondary market: verified holders can list and transfer tokens to other eligible investors, with the same ERC-3643 rules enforced on every trade.",
      "To deepen liquidity over time, the platform is designed to support permissioned liquidity pools, where eligible participants can provide two-sided liquidity against asset tokens, and a platform token, $SBX, intended to coordinate secondary-market incentives, fee flows, and governance across the SUPERBLOCK ecosystem.",
      "These liquidity mechanics and $SBX are part of the roadmap, not a live product. They will roll out progressively, subject to regulatory approval in each jurisdiction, and nothing here is an offer of $SBX or a promise of a liquid market.",
    ],
  },
  {
    id: "governance",
    title: "Governance",
    body: [
      "SBX Prime is built so the people who own the square feet make the decisions that matter. Holders vote, one token one vote, on the decisions that shape each asset: when to sell, whether to refinance, major capital works, the managing-agent mandate, distribution policy, and revaluation cadence.",
      "Decisions move from an on-chain proposal, through a fixed voting window with quorum and majority thresholds, into a timelock so every holder can see what is about to execute, and then to execution against the SPV. Governance rolls out in phases: at launch, holders vote on disposal and distribution decisions, and the on-chain remit widens as each asset and the holder base mature.",
    ],
  },
  {
    id: "risk",
    title: "Risk factors and protections",
    body: [
      "Property values and rents can fall as well as rise; capital is at risk and past performance is not a guide to the future. Liquidity is not guaranteed, especially in early phases. Tokens are securities offered to eligible investors only, qualified, professional, or accredited, with no US persons and no UK or EEA retail; eligibility is enforced at KYC and on-chain.",
      "Protections are structural, not promises: bankruptcy-remote SPVs, segregated subscription funds with pre-defined release conditions, independent valuation, identity-bound tokens, key recovery, and continuous register reconciliation. Structuring and audit support come from established, independent advisers across the jurisdictions we operate in.",
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
              SBX Prime issues institutional-grade real estate as identity-bound security tokens, one token per
              square foot of a ring-fenced English-law SPV, paying monthly USDC income, revalued independently,
              traded on a compliant secondary market, and governed on-chain by the people who own it.
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
            This document is provided for information only and is not an offer or solicitation to buy any security
            or token, nor investment, legal, or tax advice. It is not directed at any person in any jurisdiction
            where such an offer would be unlawful. Figures are indicative and subject to independent valuation.
            Capital is at risk; past performance is not a guide to future returns. $SBX and the secondary-market
            and liquidity features described are roadmap items subject to regulatory approval and may change.
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
