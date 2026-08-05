import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import PledgeModule from "../components/PledgeModule";
import NodeBackground from "../components/NodeBackground";
import PushNotification from "../components/PushNotification";
import { TiltCard } from "../components/cards";
import { Fx, SectionHead, Counter, ReturnSplit } from "../components/ui";
import ApproxMap from "../components/ApproxMap";
import { ASSET_BY_SLUG, ASSET, getProjection, DOCUMENTS, REFERENCES } from "../data/asset";

/* Simple, dependency-free comparison bar (current / comparable / forecast). */
function CompareBars({ rows, prefix = "£", suffix = "" }) {
  const max = Math.max(...rows.map((r) => r[1]));
  return (
    <div className="space-y-4">
      {rows.map(([label, val, tone]) => (
        <div key={label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[13px] text-ink/60">{label}</span>
            <span className="font-display text-sm font-bold text-ink">
              {prefix}{val.toLocaleString("en-US", { maximumFractionDigits: val < 100 ? 1 : 0 })}{suffix}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
            <div
              className={`h-full rounded-full ${tone === "forecast" ? "bg-gradient-to-r from-brand to-brand-mint" : tone === "comparable" ? "bg-brand/50" : "bg-ink/25"}`}
              style={{ width: `${Math.round((val / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* 5-year cumulative growth line (rent + capital), pure SVG. */
function GrowthChart({ projection }) {
  const pts = [];
  let cum = 0;
  projection.forEach(([, y, a]) => {
    cum += y + a;
    pts.push(cum);
  });
  const w = 520, h = 200, pad = 28;
  const maxY = Math.ceil(Math.max(...pts) / 10) * 10;
  const x = (i) => pad + (i / (pts.length - 1)) * (w - pad * 2);
  const y = (v) => h - pad - (v / maxY) * (h - pad * 2);
  const line = pts.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const area = `${line} L${x(pts.length - 1)},${h - pad} L${x(0)},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1FB462" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1FB462" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((f) => (
        <line key={f} x1={pad} x2={w - pad} y1={pad + f * (h - pad * 2)} y2={pad + f * (h - pad * 2)} stroke="#DDEDE3" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#gfill)" />
      <path d={line} fill="none" stroke="#1FB462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r="3.5" fill="#fff" stroke="#0F8746" strokeWidth="2" />
          <text x={x(i)} y={h - 8} textAnchor="middle" className="fill-ink/45" fontSize="10">Y{i + 1}</text>
        </g>
      ))}
      <text x={x(pts.length - 1)} y={y(pts[pts.length - 1]) - 10} textAnchor="end" className="fill-brand-dark" fontSize="12" fontWeight="700">
        +{pts[pts.length - 1].toFixed(0)}% total
      </text>
    </svg>
  );
}

export default function Prospectus() {
  const { slug } = useParams();
  const a = ASSET_BY_SLUG[slug] || ASSET;
  const [docOpen, setDocOpen] = useState(false);
  const projection = getProjection(a);
  const rentRows = [
    ["Current passing rent", a.rent.current, "current"],
    ["Market comparable", a.rent.comparable, "comparable"],
    ["Forecast rent (Yr 5)", a.rent.forecast5, "forecast"],
  ];
  const valueRows = [
    ["Current valuation", a.valuePsf.current, "current"],
    ["Market comparable", a.valuePsf.comparable, "comparable"],
    ["Forecast value (Yr 5)", a.valuePsf.forecast5, "forecast"],
  ];

  return (
    <>
      <Seo
        title={`${a.name}, ${a.neighbourhood} — Prospectus | SBX Prime`}
        description={`Investment prospectus for ${a.name} in ${a.neighbourhood}: ${a.size.toLocaleString()} sq ft. Financials, tenancy, valuation and gated document bank.`}
        path={`/invest/${a.slug}/prospectus`}
      />

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden border-b border-hairline">
        <NodeBackground opacity={0.25} />
        <div className="shell relative grid gap-12 py-14 lg:grid-cols-[1.25fr_1fr] lg:py-14">
          <div>
            <Fx>
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-live">{a.status}</span>
                <span className="text-xs uppercase tracking-[0.16em] text-ink/45">{a.cityCountry}</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.06] sm:text-5xl">
                {a.name}
              </h1>
              <p className="mt-2 font-display text-lg font-semibold text-brand-dark">{a.neighbourhood}</p>
              <p className="lede">
                Institutional Central London real estate, tokenized square foot by square foot under a
                ring-fenced English-law SPV. {a.useClass}.
              </p>
              <div className="mt-5"><ReturnSplit yieldPa={a.yieldPa} appreciationPa={a.appreciationPa} totalPa={a.totalPa} /></div>
              <p className="mt-1.5 text-[11px] text-ink/40">Appreciation per Savills / JLL Central London forecasts. Indicative figures. Capital at risk.</p>
            </Fx>

            {/* headline stat row */}
            <Fx delay={120} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Valuation", <><Counter value={a.valuation / 1e6} decimals={1} prefix={a.cur} suffix="M" /></>],
                ["Price / sq ft", <>{a.cur}<Counter value={a.pricePerSqft} /></>],
                ["Saleable area", <><Counter value={a.size} /> sf</>],
                ["5-yr ROI", <>+<Counter value={a.roi5} decimals={1} suffix="%" /></>],
              ].map(([k, node], i) => (
                <div key={i} className="card-dark gloss p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink/45">{k}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-brand">{node}</p>
                </div>
              ))}
            </Fx>

            {/* gallery */}
            <Fx delay={140} scale className="mt-8">
              <TiltCard max={6} className="overflow-hidden rounded-3xl border border-hairline">
                <img src={a.images.hero} alt={a.name} className="h-[300px] w-full object-cover sm:h-[380px]" />
              </TiltCard>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {a.images.gallery.map((g, i) => (
                  <img key={i} src={g} alt={`${a.name} view ${i + 1}`} className="h-20 w-full rounded-xl border border-hairline object-cover sm:h-24" />
                ))}
                <div className="grid h-20 place-items-center rounded-xl border border-dashed border-brand/40 bg-brand/[0.05] text-center sm:h-24">
                  <span className="text-[11px] font-semibold text-brand-dark">+ virtual tour</span>
                </div>
              </div>
            </Fx>
          </div>

          {/* sticky pledge */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Fx delay={100}><PledgeModule /></Fx>
          </div>
        </div>
      </section>

      {/* ---------- overview + facts ---------- */}
      <section className="py-14 lg:py-16">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHead
              eyebrow="Overview"
              title="Underwritten like an institution buys."
              lede={a.overview}
            />
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-ink/70">
              <p>
                Ownership is held through {a.spv}, a single-asset special-purpose vehicle. Your tokens
                are shares in that SPV, one token per square foot, with monthly net rental income
                distributed pro-rata in USDC.
              </p>
              {a.source && <p className="text-[13px] text-ink/45">Listing reference: {a.source}.</p>}
            </div>
          </div>
          <Fx scale delay={100}>
            <div className="card-dark overflow-hidden">
              <div className="border-b border-hairline bg-brand/[0.04] px-6 py-4">
                <p className="font-display text-sm font-bold text-ink">Asset facts</p>
              </div>
              <dl className="divide-y divide-hairline px-6">
                {[
                  ["Use class", a.useClass],
                  ["Saleable area", `${a.size.toLocaleString()} sq ft`],
                  ["Tenure", a.tenure],
                  ["Built / refurbished", a.refurbished],
                  ["EPC rating", a.epc],
                  ["WAULT", a.wault],
                  ["Managing agent", a.managingAgent],
                  ["Independent valuer", a.valuer],
                  ["Token standard", "ERC-3643 · 1 token = 1 sq ft"],
                  ["Distributions", a.distribution],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-xs uppercase tracking-wider text-ink/45">{k}</dt>
                    <dd className="text-right font-display text-sm font-bold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Fx>
        </div>
      </section>

      {/* ---------- location / map ---------- */}
      <section className="border-t border-hairline bg-white py-14 lg:py-16">
        <div className="shell">
          <SectionHead eyebrow="Location" title={`${a.locationTitle} — the address that defends value.`} />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Fx scale className="relative overflow-hidden rounded-3xl border border-hairline">
              <ApproxMap marker={a.mapMarker} className="h-[360px] w-full" />
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl border border-white/60 bg-white/80 px-3 py-2 backdrop-blur-md">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-brand-dark"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <p className="text-[11px] leading-tight text-ink/60">Approximate area shown for privacy. The exact address is shared with verified investors.</p>
              </div>
            </Fx>
            <div className="grid gap-4">
              {a.location.map(([t, b], i) => (
                <Fx key={t} delay={i * 80} scale className="card-dark p-5">
                  <h3 className="font-display text-base font-bold text-ink">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{b}</p>
                </Fx>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- investment breakdown ---------- */}
      <section className="py-14 lg:py-16">
        <div className="shell">
          <SectionHead
            eyebrow="Investment breakdown"
            title="Rent, value and return — with the market as the check."
            lede="Every figure below is triangulated against independent comparable evidence, not our own optimism. Current, market-comparable and forecast are shown side by side so you can see the headroom."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Fx scale className="card-dark p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold text-ink">Rent · per sq ft / yr</h3>
                <span className="text-xs text-ink/45">Savills rental evidence</span>
              </div>
              <div className="mt-6"><CompareBars rows={rentRows} prefix={a.cur} /></div>
              <p className="mt-5 text-[13px] leading-relaxed text-ink/55">
                Passing rent is shown against current market comparables and a five-year forecast
                reflecting Central London rental growth.
              </p>
            </Fx>

            <Fx scale delay={100} className="card-dark p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold text-ink">Capital value · per sq ft</h3>
                <span className="text-xs text-ink/45">Knight Frank comparables</span>
              </div>
              <div className="mt-6"><CompareBars rows={valueRows} prefix={a.cur} /></div>
              <p className="mt-5 text-[13px] leading-relaxed text-ink/55">
                Entry value is set at the independent valuation, in line with recent comparable
                transactions, with the five-year forecast per Savills / JLL capital-growth outlook.
              </p>
            </Fx>
          </div>

          {/* ROI chart + table */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Fx scale className="card-dark p-6">
              <h3 className="font-display text-lg font-bold text-ink">Cumulative 5-year total return</h3>
              <p className="mt-1 text-[13px] text-ink/55">Rental income plus capital appreciation, compounded (indicative).</p>
              <div className="mt-6"><GrowthChart projection={projection} /></div>
            </Fx>

            <Fx scale delay={100} className="card-dark overflow-hidden p-0">
              <div className="border-b border-hairline px-6 py-4">
                <h3 className="font-display text-lg font-bold text-ink">5-year projection</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-ink/45">
                    <th className="px-6 py-3 font-medium">Year</th>
                    <th className="px-3 py-3 text-right font-medium">Yield</th>
                    <th className="px-3 py-3 text-right font-medium">Appr.</th>
                    <th className="px-6 py-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {projection.map(([yr, y, ap]) => (
                    <tr key={yr}>
                      <td className="px-6 py-3 text-ink/70">{yr}</td>
                      <td className="px-3 py-3 text-right font-display font-semibold text-brand-dark">{y.toFixed(1)}%</td>
                      <td className="px-3 py-3 text-right font-display font-semibold text-ink">{ap.toFixed(1)}%</td>
                      <td className="px-6 py-3 text-right font-display font-bold text-ink">{(y + ap).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Fx>
          </div>
        </div>
      </section>

      {/* ---------- tenancy ---------- */}
      <section className="border-t border-hairline bg-white py-14 lg:py-16">
        <div className="shell">
          <SectionHead
            eyebrow="Tenancy"
            title="The income behind your tokens."
            lede="Who pays the rent, the covenant behind it, and the reversionary or index-linked upside that institutional buyers underwrite to."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {a.tenants.map(([k, v, note], i) => (
              <Fx key={k} delay={i * 80} scale className="card-dark p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">{k}</p>
                <p className="mt-2 font-display text-2xl font-extrabold text-ink">{v}</p>
                <p className="mt-1 text-sm text-brand-dark">{note}</p>
              </Fx>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- management & lifecycle ---------- */}
      <section className="py-14 lg:py-16">
        <div className="shell">
          <SectionHead
            eyebrow="Management & lifecycle"
            title="We run the building for its whole life — so you never have to."
            lede="From acquisition to eventual sale, SUPERBLOCK manages the full institutional lifecycle of the asset. You hold the token; we handle everything a landlord does."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Acquire & structure", "Due diligence, independent valuation, and transfer into a ring-fenced SPV."],
              ["Operate & lease", "CBRE-calibre management: rent collection, service charge, leasing and reviews."],
              ["Report & distribute", "Monthly USDC distributions and transparent reporting on-chain and in-app."],
              ["Revalue & exit", "Independent revaluation every 3–6 months, with a governed path to eventual sale."],
            ].map(([t, b], i) => (
              <Fx key={t} delay={i * 80} scale className="card-dark h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand/40 bg-brand/10 font-display font-extrabold text-brand-dark">{i + 1}</span>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{b}</p>
              </Fx>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- gated document bank ---------- */}
      <section className="border-t border-hairline bg-white py-14 lg:py-16">
        <div className="shell">
          <SectionHead
            eyebrow="Document bank"
            title="The full data room, once you're verified."
            lede="The complete institutional data room — valuation, leases, title and token terms — is available to verified investors. Create an account and complete verification to unlock it."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {DOCUMENTS.map(([name, meta], i) => (
              <Fx key={name} delay={i * 60} className="flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-mist/60 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand-dark">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">{name}</p>
                    <p className="text-xs text-ink/45">{meta}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/40">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  Locked
                </span>
              </Fx>
            ))}
          </div>
          <Fx delay={120} className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-brand/25 bg-brand/[0.06] p-8 text-center">
            <p className="font-display text-lg font-bold text-ink">Unlock the full data room</p>
            <p className="max-w-xl text-sm text-ink/60">
              Create your account and complete verification to view and download every document.
              Verification is handled by our team, usually within one business day.
            </p>
            <Link to="/register" className="btn-primary mt-1" onClick={() => setDocOpen(true)}>
              Verify to access documents
            </Link>
            {docOpen && (
              <p className="mt-1 text-[13px] text-brand-dark">
                Redirecting you to create an account and start verification.
              </p>
            )}
          </Fx>
        </div>
      </section>

      {/* ---------- references ---------- */}
      <section className="py-14 lg:py-16">
        <div className="shell">
          <SectionHead
            eyebrow="References & advisors"
            title="Independent names behind every number."
            lede="We do not mark our own homework. Valuation, market forecasts and management are provided by established, independent institutions."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REFERENCES.map(([name, role], i) => (
              <Fx key={name} delay={i * 80} scale className="card-dark p-6">
                <p className="font-display text-lg font-extrabold text-ink">{name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{role}</p>
              </Fx>
            ))}
          </div>
          <p className="mt-8 text-center text-[11px] leading-relaxed text-ink/40">
            This prospectus is provided for information only and is not an offer of securities or investment advice.
            Figures shown are indicative and subject to independent valuation at acquisition. Capital is at risk and past
            performance is not a guide to future returns.
          </p>
        </div>
      </section>

      {/* floating proof */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-30 hidden w-[320px] xl:block">
        <PushNotification body="You've been paid 1,050 USDC rental income for August 2026." time="now" delay={1400} />
      </div>
    </>
  );
}
