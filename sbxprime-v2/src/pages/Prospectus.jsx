import { useParams, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import PledgeModule from "../components/PledgeModule";
import NodeBackground from "../components/NodeBackground";
import PushNotification from "../components/PushNotification";
import { TiltCard } from "../components/cards";
import { Fx, SectionHead, Counter, ReturnSplit } from "../components/ui";
import ApproxMap from "../components/ApproxMap";
import { Icon } from "../components/icons";
import { ASSET, getProjection, poolFor, costModel, PLATFORM_FEES, DOCUMENTS, REFERENCES } from "../data/asset";
import { useAsset } from "../lib/assetsStore";

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

/* A per-section call to action. Scrolls to this asset's pledge module by
   default (#pledge), or links elsewhere when `to` is a route. */
function SectionCTA({ label, sub, to = "#pledge" }) {
  return (
    <div className="shell">
      <Fx delay={60} className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
        {sub && <span className="text-[13px] text-ink/55">{sub}</span>}
        {to.startsWith("#") ? (
          <a href={to} className="btn-primary">{label}</a>
        ) : (
          <Link to={to} className="btn-primary">{label}</Link>
        )}
      </Fx>
    </div>
  );
}

export default function Prospectus() {
  const { slug } = useParams();
  const a = useAsset(slug) || ASSET;
  const projection = getProjection(a);
  const cm = costModel(a);
  const money = (n) => a.cur + Math.round(n).toLocaleString("en-US");
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
        image={`/og/${a.slug}.jpg`}
      />

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden border-b border-hairline">
        <NodeBackground opacity={0.25} />
        <div className="shell relative grid gap-10 py-14 lg:grid-cols-[1.25fr_1fr] lg:py-14">
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
          <div id="pledge" className="scroll-mt-28 lg:sticky lg:top-24 lg:self-start">
            <Fx delay={100}><PledgeModule pool={poolFor(a)} /></Fx>
          </div>
        </div>
      </section>

      {/* ---------- overview + facts ---------- */}
      <section className="py-12 lg:py-14">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
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

            {a.whyInvest && (
              <Fx delay={80} className="mt-8 rounded-2xl border border-brand/20 bg-brand/[0.05] p-6">
                <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-ink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark"><path d="M13 2L4.09 12.11a1 1 0 0 0 .76 1.64H11l-1 8 8.91-10.11a1 1 0 0 0-.76-1.64H12z" /></svg>
                  Why this is a good investment
                </h3>
                <ul className="mt-4 space-y-3">
                  {a.whyInvest.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-dark">
                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.5} />
                      </span>
                      <span className="text-[14px] leading-relaxed text-ink/70">{p}</span>
                    </li>
                  ))}
                </ul>
              </Fx>
            )}
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
                  ["Asset manager", cm.manager],
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
        <SectionCTA label="Pledge your allocation" sub="1 token = 1 sq ft · monthly USDC income" />
      </section>

      {/* ---------- location / map ---------- */}
      <section className="border-t border-hairline bg-white py-12 lg:py-14">
        <div className="shell">
          <SectionHead eyebrow="Location" title={`${a.locationTitle} — the address that defends value.`} />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Fx scale className="relative overflow-hidden rounded-3xl border border-hairline">
              <ApproxMap marker={a.mapMarker} className="h-[360px] w-full" />
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl border border-white/60 bg-white/80 px-3 py-2 backdrop-blur-md">
                <Icon name="lock" className="h-[15px] w-[15px] shrink-0 text-brand-dark" strokeWidth={1.8} />
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
        <SectionCTA label="Own a square foot here" sub="Approximate area shown; exact address on verification" />
      </section>

      {/* ---------- investment breakdown ---------- */}
      <section className="py-12 lg:py-14">
        <div className="shell">
          <SectionHead
            eyebrow="Investment breakdown"
            title="Rent, value and return — with the market as the check."
            lede="Every figure below is triangulated against independent comparable evidence, not our own optimism. Current, market-comparable and forecast are shown side by side so you can see the headroom."
          />

          <div className="mt-9 grid gap-8 lg:grid-cols-2">
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
                <tfoot>
                  <tr className="border-t-2 border-brand/30 bg-brand/[0.06]">
                    <td className="px-6 py-3 font-display text-[13px] font-extrabold uppercase tracking-wider text-ink">5-yr total ROI</td>
                    <td className="px-3 py-3 text-right font-display font-bold text-brand-dark">{projection.reduce((s, [, y]) => s + y, 0).toFixed(1)}%</td>
                    <td className="px-3 py-3 text-right font-display font-bold text-ink">{projection.reduce((s, [, , ap]) => s + ap, 0).toFixed(1)}%</td>
                    <td className="px-6 py-3 text-right font-display text-base font-extrabold text-brand-dark">+{projection.reduce((s, [, y, ap]) => s + y + ap, 0).toFixed(1)}%</td>
                  </tr>
                </tfoot>
              </table>
            </Fx>
          </div>
        </div>
        <SectionCTA label="Start your pledge" sub={`${a.yieldPa} target yield + ${a.appreciationPa} appreciation`} />
      </section>

      {/* ---------- transparent costs & income ---------- */}
      <section className="border-t border-hairline bg-white py-12 lg:py-14">
        <div className="shell">
          <SectionHead
            eyebrow="Costs & income · full transparency"
            title="Every cost, in the open."
            lede="We show exactly how the token price is built and how income reaches you: total cost to acquire ÷ square feet sets the price, and gross rent minus expenses and the asset's management fee sets what you earn."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* cost to acquire → price per token */}
            <Fx scale className="card-dark overflow-hidden p-0">
              <div className="border-b border-hairline bg-brand/[0.04] px-6 py-4">
                <h3 className="font-display text-base font-bold text-ink">What builds the token price</h3>
              </div>
              <dl className="divide-y divide-hairline px-6">
                {[
                  ["Purchase price", money(cm.purchase)],
                  [`Acquisition costs (${cm.acqCostsPct}%)`, money(cm.acqCosts), "SDLT, legal, diligence, agent"],
                  [`Issuance fee (${cm.issuanceFeePct}%)`, money(cm.issuance)],
                ].map(([k, v, note]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-ink/60">{k}{note && <span className="block text-[11px] text-ink/40">{note}</span>}</dt>
                    <dd className="font-display text-sm font-bold text-ink tnum">{v}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 border-t-2 border-brand/25 py-3">
                  <dt className="font-display text-sm font-extrabold text-ink">Total cost to acquire</dt>
                  <dd className="font-display text-base font-extrabold text-ink tnum">{money(cm.totalCost)}</dd>
                </div>
              </dl>
              <div className="flex items-baseline justify-between gap-4 bg-brand/[0.06] px-6 py-4">
                <span className="text-sm text-ink/70">÷ {a.size.toLocaleString()} sq ft (tokens)</span>
                <span className="font-display text-lg font-extrabold text-brand-dark tnum">{a.cur}{cm.pricePerToken.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / token</span>
              </div>
            </Fx>

            {/* income → per-token income */}
            <Fx scale delay={100} className="card-dark overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-hairline bg-brand/[0.04] px-6 py-4">
                <h3 className="font-display text-base font-bold text-ink">What reaches you, per year</h3>
                <span className="text-[11px] text-ink/45">{cm.incomeBasis}</span>
              </div>
              <dl className="divide-y divide-hairline px-6">
                {[
                  ["Gross rent", money(cm.gross)],
                  [`Operating expenses (${cm.opexPct}%)`, "− " + money(cm.opex), "service charge, insurance, voids"],
                  [`Management fee (${cm.mgmtFeePct}%)`, "− " + money(cm.mgmt), `paid to ${cm.manager}`],
                ].map(([k, v, note]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-ink/60">{k}{note && <span className="block text-[11px] text-ink/40">{note}</span>}</dt>
                    <dd className="font-display text-sm font-bold text-ink tnum">{v}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 border-t-2 border-brand/25 py-3">
                  <dt className="font-display text-sm font-extrabold text-ink">Net income</dt>
                  <dd className="font-display text-base font-extrabold text-brand-dark tnum">{money(cm.net)}</dd>
                </div>
              </dl>
              <div className="flex items-baseline justify-between gap-4 bg-brand/[0.06] px-6 py-4">
                <span className="text-sm text-ink/70">{a.cur}{cm.incomePerToken.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / token · net</span>
                <span className="font-display text-lg font-extrabold text-brand-dark tnum">{cm.netYield}% net yield</span>
              </div>
            </Fx>
          </div>

          {/* platform fees */}
          <Fx delay={140} className="mt-6 rounded-2xl border border-hairline bg-mist/40 p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-base font-bold text-ink">Platform fees</h3>
              <span className="text-[12px] text-ink/50">Management fee is per-asset ({cm.mgmtFeePct}% here, to {cm.manager})</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORM_FEES.map(([label, rate, when]) => (
                <div key={label} className="rounded-xl border border-hairline bg-white p-4">
                  <p className="font-display text-xl font-extrabold text-brand-dark tnum">{rate}</p>
                  <p className="mt-1 font-display text-[13px] font-bold text-ink">{label}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-ink/50">{when}</p>
                </div>
              ))}
            </div>
          </Fx>
          <p className="mt-4 text-[11px] leading-relaxed text-ink/40">
            Figures indicative and rounded. Income basis noted per asset; net yield is net income ÷ total cost to acquire.
            Capital is at risk and returns are not guaranteed.
          </p>
        </div>
        <SectionCTA label="Pledge with full transparency" sub="Every cost and fee shown above" />
      </section>

      {/* ---------- tenancy ---------- */}
      <section className="border-t border-hairline bg-white py-12 lg:py-14">
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
        <SectionCTA label="Back this tenancy" sub="Monthly USDC income, professionally managed" />
      </section>

      {/* ---------- management & lifecycle ---------- */}
      <section className="py-12 lg:py-14">
        <div className="shell">
          <SectionHead
            eyebrow="Management & lifecycle"
            title="We run the building for its whole life — so you never have to."
            lede="From acquisition to eventual sale, SUPERBLOCK manages the full institutional lifecycle of the asset. You hold the token; we handle everything a landlord does."
          />
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        <SectionCTA label="Pledge your allocation" sub="We run the building for its whole life" />
      </section>

      {/* ---------- gated document bank ---------- */}
      <section className="border-t border-hairline bg-white py-12 lg:py-14">
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
                    <Icon name="doc" className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">{name}</p>
                    <p className="text-xs text-ink/45">{meta}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/40">
                  <Icon name="lock" className="h-[14px] w-[14px]" strokeWidth={1.8} />
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
            <Link to="/verify" className="btn-primary mt-1">
              Verify to access documents
            </Link>
          </Fx>
        </div>
      </section>

      {/* ---------- references ---------- */}
      <section className="py-12 lg:py-14">
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
        <SectionCTA label="Pledge your allocation" sub="Reserve your square feet — no funds move today" />
      </section>

      {/* floating proof */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-30 hidden w-[320px] xl:block">
        <PushNotification body="You've been paid 1,050 USDC rental income for August 2026." time="now" delay={1400} />
      </div>
    </>
  );
}
