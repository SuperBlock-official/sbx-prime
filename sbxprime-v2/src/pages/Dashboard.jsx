import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import { Fx, Counter } from "../components/ui";
import londonImg from "../assets/images/london-office.png";

/* Investor portfolio dashboard (demo data — wired to the backend at superblock.ai later). */
const PORTFOLIO = {
  value: 24_680,
  invested: 22_500,
  appreciation: 2_180,
  monthlyRent: 132,
  lifetimeRent: 1_584,
  sqft: 25,
};

const HOLDINGS = [
  { name: "Central London Grade-A Office", loc: "Mayfair, W1", sqft: 25, value: 24_680, yieldPa: "6.5%", img: londonImg, status: "Income-producing" },
];

const RENT_HISTORY = [88, 96, 104, 110, 118, 124, 128, 132]; // last 8 months USDC

const DISTRIBUTIONS = [
  ["Aug 2026", "132.00 USDC", "Paid"],
  ["Jul 2026", "128.00 USDC", "Paid"],
  ["Jun 2026", "124.00 USDC", "Paid"],
  ["May 2026", "118.00 USDC", "Paid"],
  ["Apr 2026", "110.00 USDC", "Paid"],
];

function RentChart({ data }) {
  const max = Math.max(...data);
  const w = 460, h = 150, pad = 20, gap = 10;
  const bw = (w - pad * 2 - gap * (data.length - 1)) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {data.map((v, i) => {
        const bh = (v / max) * (h - pad * 2);
        const x = pad + i * (bw + gap);
        const y = h - pad - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="4" fill={i === data.length - 1 ? "#1FB462" : "#BFE7D2"} />
          </g>
        );
      })}
    </svg>
  );
}

export default function Dashboard() {
  return (
    <>
      <Seo title="Your portfolio — Dashboard | SBX Prime" description="Your SBX Prime portfolio: holdings, rental income, appreciation and distributions in one place." path="/dashboard" />

      {/* header */}
      <section className="relative overflow-hidden border-b border-hairline">
        <NodeBackground opacity={0.22} />
        <div className="shell relative py-12 lg:py-14">
          <Fx className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="badge-pipeline">Demo dashboard</span>
              <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Your portfolio</h1>
              <p className="mt-1 text-sm text-ink/55">A preview of the investor dashboard. Live data connects to your SUPERBLOCK account.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/invest" className="btn-ghost">Browse marketplace</Link>
              <Link to="/invest/london/prospectus" className="btn-primary">Pledge more</Link>
            </div>
          </Fx>

          {/* KPI row */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Portfolio value", <><Counter value={PORTFOLIO.value} prefix="$" /></>, "+9.7% all-time", true],
              ["Total invested", <><Counter value={PORTFOLIO.invested} prefix="$" /></>, `${PORTFOLIO.sqft} sq ft owned`, false],
              ["Capital appreciation", <>+<Counter value={PORTFOLIO.appreciation} prefix="$" /></>, "Unrealised", true],
              ["Rent this month", <><Counter value={PORTFOLIO.monthlyRent} prefix="$" /></>, "Paid in USDC", true],
            ].map(([k, node, sub, pos], i) => (
              <Fx key={k} delay={i * 70} scale className="card-dark gloss p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink/45">{k}</p>
                <p className={`mt-1.5 font-display text-2xl font-extrabold ${pos ? "text-brand" : "text-ink"}`}>{node}</p>
                <p className={`mt-1 text-xs ${pos ? "text-brand-dark" : "text-ink/45"}`}>{sub}</p>
              </Fx>
            ))}
          </div>
        </div>
      </section>

      {/* body */}
      <section className="py-12 lg:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* left: holdings + distributions */}
          <div className="space-y-8">
            <Fx scale>
              <h2 className="font-display text-lg font-bold text-ink">Your holdings</h2>
              <div className="mt-4 space-y-4">
                {HOLDINGS.map((h) => (
                  <div key={h.name} className="card-dark flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <img src={h.img} alt={h.name} className="h-24 w-full rounded-xl object-cover sm:w-36" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-bold text-ink">{h.name}</h3>
                      </div>
                      <p className="text-sm text-ink/55">{h.loc}</p>
                      <span className="mt-1 inline-block rounded-full bg-brand/12 px-2.5 py-0.5 text-[11px] font-semibold text-brand-dark">{h.status}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:text-right">
                      {[["Owned", `${h.sqft} sf`], ["Value", "$" + h.value.toLocaleString()], ["Yield", h.yieldPa]].map(([k, v]) => (
                        <div key={k}>
                          <p className="text-[10px] uppercase tracking-wider text-ink/40">{k}</p>
                          <p className="font-display text-sm font-bold text-ink">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Fx>

            <Fx scale delay={80} className="card-dark overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
                <h2 className="font-display text-lg font-bold text-ink">Distributions</h2>
                <span className="text-xs text-ink/45">Monthly · USDC</span>
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-hairline">
                  {DISTRIBUTIONS.map(([m, amt, status]) => (
                    <tr key={m}>
                      <td className="px-6 py-3 text-ink/70">{m}</td>
                      <td className="px-3 py-3 font-display font-semibold text-ink">{amt}</td>
                      <td className="px-6 py-3 text-right">
                        <span className="rounded-full bg-brand/12 px-2.5 py-0.5 text-[11px] font-semibold text-brand-dark">{status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Fx>
          </div>

          {/* right: rent chart + allocation */}
          <div className="space-y-8">
            <Fx scale className="card-dark p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-lg font-bold text-ink">Rental income</h2>
                <span className="text-xs text-ink/45">Last 8 months</span>
              </div>
              <div className="mt-5"><RentChart data={RENT_HISTORY} /></div>
              <div className="mt-4 flex items-baseline justify-between border-t border-hairline pt-4">
                <span className="text-sm text-ink/55">Lifetime received</span>
                <span className="font-display text-lg font-extrabold text-brand-dark">${PORTFOLIO.lifetimeRent.toLocaleString()}</span>
              </div>
            </Fx>

            <Fx scale delay={80} className="card-dark p-6">
              <h2 className="font-display text-lg font-bold text-ink">Allocation</h2>
              <div className="mt-4 space-y-3">
                {[["London · Mayfair", 100]].map(([label, pct]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-ink/60">{label}</span>
                      <span className="font-display font-bold text-ink">{pct}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-mint" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-ink/55">
                Diversify across pipeline cities as they launch — Dubai, Singapore and New York are next.
              </p>
              <Link to="/invest" className="btn-ghost mt-4 w-full justify-center">Explore the marketplace</Link>
            </Fx>
          </div>
        </div>
      </section>
    </>
  );
}
