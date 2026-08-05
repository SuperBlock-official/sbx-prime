import { useState } from "react";
import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead } from "../components/ui";
import { registerInterest } from "../lib/api";

/* Full on-page whitepaper. Forward-looking mechanics (secondary market, $SBX,
   liquidity pools) are described as designed/roadmap, not live. Indicative. */
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

export default function Whitepaper() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const ok = /\S+@\S+\.\S+/.test(email);

  const submit = async (e) => {
    e.preventDefault();
    if (!ok || state === "sending") return;
    setState("sending");
    await registerInterest({ email, cities: [], indicativeAmount: "whitepaper-download" });
    setState("done");
  };

  return (
    <>
      <Seo
        title="Whitepaper | SBX Prime"
        description="The SBX Prime whitepaper: structure, ERC-3643 token standard, underwriting, USDC distribution mechanics, secondary-market and liquidity design ($SBX), governance, and risk factors."
        path="/whitepaper"
      />

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden border-b border-hairline">
        <NodeBackground opacity={0.28} />
        <div className="shell relative py-14 lg:py-16">
          <div className="max-w-3xl">
            <SectionHead
              eyebrow="Whitepaper · v1.0 · August 2026"
              title="The full structure, in writing."
              lede="How SBX Prime turns trophy commercial real estate into compliant, income-producing, governable ownership from a single square foot. Written for investors and their advisers, not for hype."
            />
            <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-ink/40">For qualified investors only · Indicative · Not an offer of securities</p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="shell grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* ---------- sticky TOC + download ---------- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">Contents</p>
            <nav className="mt-4 space-y-2.5">
              {SECTIONS.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="block text-sm text-ink/60 transition hover:text-brand-dark">
                  <span className="mr-2 font-display text-xs font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              ))}
            </nav>

            <div className="card-dark mt-8 p-5">
              {state === "done" ? (
                <div className="text-center">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand/15 font-display text-lg text-brand">✓</span>
                  <h3 className="mt-2 font-display text-sm font-bold">Check your inbox</h3>
                  <p className="mt-1 text-[12px] text-ink/60">The PDF is on its way to {email}.</p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="font-display text-sm font-bold text-ink">Download the PDF</h3>
                  <p className="mt-1 text-[11px] text-ink/55">The full 40-page version, gated only by email.</p>
                  <input
                    className="field mt-3 !py-2.5 text-sm" type="email" placeholder="Work email" value={email}
                    onChange={(e) => setEmail(e.target.value)} aria-label="Email" required
                  />
                  <button type="submit" disabled={!ok || state === "sending"} className="btn-primary mt-3 w-full !py-2.5 text-[13px] disabled:opacity-40">
                    {state === "sending" ? "Sending…" : "Email me the PDF"}
                  </button>
                </form>
              )}
            </div>
          </aside>

          {/* ---------- body ---------- */}
          <div className="max-w-2xl">
            <Fx className="rounded-2xl border border-hairline bg-mist/50 p-6">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand-dark">Abstract</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
                SBX Prime issues institutional-grade real estate as identity-bound security tokens, one token per
                square foot of a ring-fenced English-law SPV, paying monthly USDC income, revalued independently,
                traded on a compliant secondary market, and governed on-chain by the people who own it.
              </p>
            </Fx>

            <div className="mt-10 space-y-12">
              {SECTIONS.map((s, i) => (
                <Fx as="section" key={s.id} id={s.id} className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-extrabold text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="font-display text-2xl font-extrabold text-ink">{s.title}</h2>
                  </div>
                  <div className="mt-4 space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-[15px] leading-relaxed text-ink/70">{p}</p>
                    ))}
                  </div>
                  {s.bullets && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {s.bullets.map(([t, b]) => (
                        <div key={t} className="rounded-2xl border border-hairline bg-white/70 p-4">
                          <p className="font-display text-[13px] font-bold text-ink">{t}</p>
                          <p className="mt-1 text-[12px] leading-relaxed text-ink/55">{b}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Fx>
              ))}
            </div>

            <p className="mt-12 border-t border-hairline pt-6 text-[11px] leading-relaxed text-ink/40">
              This document is provided for information only and is not an offer or solicitation to buy any security
              or token, nor investment, legal, or tax advice. It is not directed at any person in any jurisdiction
              where such an offer would be unlawful. Figures are indicative and subject to independent valuation.
              Capital is at risk; past performance is not a guide to future returns. $SBX and the secondary-market
              and liquidity features described are roadmap items subject to regulatory approval and may change.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
