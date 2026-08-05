import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import PledgeModule from "../components/PledgeModule";
import NodeBackground from "../components/NodeBackground";
import PushNotification from "../components/PushNotification";
import { TiltCard } from "../components/cards";
import { Fx, SectionHead, Counter, ReturnSplit } from "../components/ui";
import { LONDON_FUND, poolFor } from "../data/asset";

const HOW = [
  ["One commitment", "Pledge once and get a share of the fund, rather than choosing a single building."],
  ["Diversified", "Your money is spread across every SBX London asset, offices, retail, and mixed-use, in different submarkets."],
  ["One distribution", "Blended monthly rental income from the whole portfolio, paid in USDC."],
  ["One governance stake", "Your fund shares carry proportional votes across every asset the fund holds."],
];

export default function LondonFund() {
  const f = LONDON_FUND;
  const pool = poolFor(f);
  const pct = Math.round((pool.raisedUsd / pool.targetUsd) * 100);

  return (
    <>
      <Seo
        title="SBX London Fund — a share of every London asset | SBX Prime"
        description="One commitment, diversified across every SBX Prime London asset. The SBX London Fund holds shares in all seven Central London buildings, with blended monthly income and one governance stake."
        path="/invest/london-fund"
      />

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden border-b border-hairline">
        <NodeBackground opacity={0.28} />
        <div className="shell relative grid gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-16">
          <div>
            <Fx>
              <span className="badge-live">Diversified · Central London</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.06] sm:text-5xl">
                The <span className="text-brand">SBX London Fund</span>.
              </h1>
              <p className="lede">
                One commitment, a share of every SBX London asset. Instead of picking a single building,
                own a slice of the whole Central London portfolio, diversified across submarkets and use types.
              </p>
              <div className="mt-5"><ReturnSplit yieldPa={f.yieldPa} appreciationPa={f.appreciationPa} totalPa={f.totalPa} /></div>
              <p className="mt-1.5 text-[11px] text-ink/40">Blended across the portfolio. Appreciation per Savills / JLL forecasts. Indicative. Capital at risk.</p>
            </Fx>

            {/* fund stat row */}
            <Fx delay={120} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Gross asset value", <><Counter value={f.valuation / 1e6} decimals={1} prefix={f.cur} suffix="M" /></>],
                ["Assets", <Counter value={f.assetCount} />],
                ["Total area", <><Counter value={f.size} /> sf</>],
                ["Blended price", <>{f.cur}<Counter value={f.pricePerSqft} /></>],
              ].map(([k, node], i) => (
                <div key={i} className="card-dark gloss p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink/45">{k}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-brand">{node}</p>
                </div>
              ))}
            </Fx>

            {/* fund vs single asset */}
            <Fx delay={140} className="mt-8 flex items-start gap-4 rounded-2xl border border-brand/25 bg-brand/[0.06] p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 3v18h18M7 15l4-4 3 3 5-6" /></svg>
              </span>
              <p className="text-[13px] leading-relaxed text-ink/70">
                <b className="text-ink">Fund or single asset, your choice.</b> Prefer to back one building? Every asset also
                has its own prospectus and pledge. The fund simply spreads your commitment across all of them.
              </p>
            </Fx>
          </div>

          {/* sticky pledge */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Fx delay={100}><PledgeModule pool={pool} /></Fx>
          </div>
        </div>
      </section>

      {/* ---------- how the fund works ---------- */}
      <section className="py-14 lg:py-16">
        <div className="shell">
          <SectionHead
            eyebrow="How the fund works"
            title="Shares in a fund that holds shares in every asset."
            lede="The SBX London Fund is a single vehicle that owns a stake in each London SPV. Your fund shares give you proportional economic and governance rights across the entire portfolio."
            center
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map(([t, b], i) => (
              <Fx key={t} delay={i * 80} scale className="card-dark h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand/40 bg-brand/10 font-display font-extrabold text-brand-dark">{i + 1}</span>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{b}</p>
              </Fx>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- holdings ---------- */}
      <section className="border-t border-hairline bg-white py-14 lg:py-16">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              eyebrow="Fund holdings"
              title={`${f.assetCount} Central London assets, one fund.`}
              lede="Every building the fund holds, with its portfolio weight. Tap any asset for its full prospectus."
            />
            <Fx><Link to="/invest" className="btn-ghost shrink-0">Browse individually →</Link></Fx>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {f.holdings.map((h, i) => (
              <Fx key={h.slug} delay={(i % 4) * 70} scale>
                <Link to={`/invest/${h.slug}/prospectus`} className="group block h-full">
                  <TiltCard className="card-dark flex h-full flex-col overflow-hidden">
                    <div className="relative h-36 overflow-hidden">
                      <img src={h.image} alt={h.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-display text-[11px] font-extrabold text-brand-dark">{h.weight}%</span>
                      <p className="absolute bottom-2 left-3 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-brand-mint">{h.area}</p>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-[15px] font-bold text-ink">{h.name}</h3>
                      <p className="mt-auto pt-2 font-display text-[13px] font-bold text-brand-dark">{h.stat}</p>
                    </div>
                  </TiltCard>
                </Link>
              </Fx>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- proof / cta ---------- */}
      <section className="py-14 lg:py-16">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <SectionHead
            eyebrow="Diversified income"
            title="Spread your risk across the whole of prime London."
            lede="One building can wobble; a portfolio of seven across offices, retail, and mixed-use is steadier. The fund gives you that spread in a single pledge, with blended monthly income and one statement."
          />
          <Fx scale delay={120} className="mx-auto max-w-sm">
            <PushNotification body="SBX London Fund, August income distributed across 7 assets. Statement ready." time="now" delay={500} />
          </Fx>
        </div>
      </section>
    </>
  );
}
