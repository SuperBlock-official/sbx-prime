import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import PledgeModule from "../components/PledgeModule";
import NodeBackground from "../components/NodeBackground";
import PushNotification from "../components/PushNotification";
import { TiltCard } from "../components/cards";
import mayfair from "../assets/cities/london-mayfair.png";
import southbank from "../assets/cities/london-southbank.png";
import victoria from "../assets/cities/london-victoria.png";
import { SHORTLIST as ASSETS } from "../data/asset";
import { Fx, SectionHead, Counter, ReturnSplit } from "../components/ui";

/* Test page: the London PLEDGE POOL model.
   25,000 sq ft offered at $900/sq ft ($22.5M). Pledges fund the acquisition of
   ONE shortlisted Central London asset; allocation is first-come, first-served. */
const PRICE = 900;
const TOTAL_SQFT = 25_000;
const PLEDGED_SQFT = 8_430;
const POOL = {
  price: PRICE,
  totalTokens: TOTAL_SQFT,
  tokensRemaining: TOTAL_SQFT - PLEDGED_SQFT,
  raisedUsd: PLEDGED_SQFT * PRICE,
  targetUsd: TOTAL_SQFT * PRICE,
  investors: 214,
  unit: "pledge",
};

const STEPS = [
  ["Pledge", "Reserve your square feet at $900/sq ft. No KYC, no wallet, and no funds move today."],
  ["We acquire", "Once the pool is committed, we purchase one Central London Grade-A asset from the shortlist below."],
  ["Allocate", "Your square feet are allocated first-come, first-served against the acquired building, at the same $900/sq ft."],
  ["Any excess", "If the asset is smaller than total pledges, the balance rolls to the next asset in the pipeline, or is refunded in full. You are never over-allocated."],
];

const IMAGES = { "grosvenor-gardens": victoria, "vauxhall-bridge-road": southbank, "dover-street": mayfair };
const SHORTLIST = ASSETS.map((a) => ({ ...a, img: IMAGES[a.slug] }));

export default function LondonPledge() {
  const pct = Math.round((PLEDGED_SQFT / TOTAL_SQFT) * 100);
  return (
    <>
      <Seo
        title="Pledge into London — 25,000 sq ft at $900 | SBX Prime"
        description="Pledge into the Central London launch pool: 25,000 sq ft at $900 per square foot. Pledges fund the acquisition of a shortlisted Grade-A asset; allocation is first-come, first-served."
        path="/invest/london-pledge"
      />

      {/* ---------- hero + pool status ---------- */}
      <section className="relative overflow-hidden border-b border-hairline">
        <NodeBackground opacity={0.3} />
        <div className="shell relative grid gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-14">
          <div>
            <Fx>
              <span className="badge-live">Pledge pool now open</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.06] sm:text-5xl">
                Pledge into <span className="text-brand">London</span>, from $900 a square foot.
              </h1>
              <p className="lede">
                We are pooling <b className="text-ink">25,000 square feet</b> of pledges to acquire a
                Central London Grade-A office. You reserve square feet now; we buy the building once the
                pool is committed. No funds move until closing.
              </p>
              <div className="mt-5"><ReturnSplit yieldPa="6–7%" appreciationPa="3–5%" totalPa="9–11%" /></div>
              <p className="mt-1.5 text-[11px] text-ink/40">Appreciation per Savills / JLL Central London forecasts. Capital at risk.</p>
            </Fx>

            {/* pool progress */}
            <Fx delay={140}>
              <div className="card-dark mt-8 p-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">
                    London pledge pool
                  </p>
                  <p className="font-display text-sm font-bold text-brand-dark">
                    <Counter value={pct} suffix="% pledged" />
                  </p>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink/8">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-mint" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ["Pledged", <><Counter value={PLEDGED_SQFT} /> sq ft</>],
                    ["Remaining", <><Counter value={TOTAL_SQFT - PLEDGED_SQFT} /> sq ft</>],
                    ["Price", "$900 / sq ft"],
                  ].map(([label, node], i) => (
                    <div key={i}>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/45">{label}</p>
                      <p className="mt-0.5 font-display text-base font-extrabold text-ink">{node}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Fx>
          </div>

          {/* pledge module */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Fx delay={100}><PledgeModule pool={POOL} /></Fx>
          </div>
        </div>
      </section>

      {/* ---------- how your pledge works ---------- */}
      <section className="py-14 lg:py-14">
        <div className="shell">
          <SectionHead
            eyebrow="How your pledge works"
            title="Pledge to the pool. We buy the building."
            lede="Because the asset is acquired with your pledges, you commit to the London pool rather than to a single building. Here is exactly what happens."
            center
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([t, b], i) => (
              <Fx key={t} delay={i * 90} scale>
                <div className="card-dark h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand/40 bg-brand/10 font-display text-lg font-extrabold text-brand-dark">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{b}</p>
                </div>
              </Fx>
            ))}
          </div>

          {/* honesty banner */}
          <Fx delay={120}>
            <div className="mx-auto mt-10 flex max-w-4xl items-start gap-4 rounded-2xl border border-brand/25 bg-brand/[0.06] p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 8v5M12 16h.01" /><circle cx="12" cy="12" r="9" /></svg>
              </span>
              <p className="text-[13px] leading-relaxed text-ink/70">
                <b className="text-ink">You are pledging to the London pool, not to a specific building.</b> The
                three assets below are real buildings currently in the market that show the calibre we are targeting;
                the final asset is selected, independently valued, and confirmed at acquisition. Pledges are non-binding
                until you verify and subscribe at closing, and any unallocated balance is refunded in full.
              </p>
            </div>
          </Fx>
        </div>
      </section>

      {/* ---------- shortlist ---------- */}
      <section className="border-t border-hairline bg-white py-14 lg:py-14">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              eyebrow="The shortlist"
              title="Three real Central London assets in our sights."
              lede="These are live buildings currently in the market. One will be acquired with the pool; the final selection is independently valued and confirmed at acquisition."
            />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHORTLIST.map((a, i) => (
              <Fx key={a.slug} delay={i * 80} scale>
                <Link to={`/invest/${a.slug}/prospectus`} className="group block">
                  <TiltCard className="card-dark overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img src={a.img} alt={`${a.type}, ${a.area}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      <span className="badge-pipeline absolute left-4 top-4 !bg-white/85">Shortlisted</span>
                      <p className="absolute bottom-3 left-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-white/90">
                        {a.area}
                      </p>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-ink">{a.name}</h3>
                      <p className="mt-0.5 text-sm text-ink/55">{a.type}</p>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-ink/55">{a.size} · {a.price}</span>
                        <span className="font-display font-bold text-brand-dark">{a.stat}</span>
                      </div>
                      <p className="mt-3 flex items-center justify-between border-t border-hairline pt-3 text-xs leading-relaxed text-ink/50">
                        <span>{a.note}</span>
                        <span className="ml-2 shrink-0 font-bold text-brand-dark opacity-0 transition group-hover:opacity-100">View →</span>
                      </p>
                    </div>
                  </TiltCard>
                </Link>
              </Fx>
            ))}
            {/* summary tile */}
            <Fx delay={SHORTLIST.length * 80} scale>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-brand/40 bg-brand/[0.05] p-6 text-center">
                <p className="font-display text-2xl font-extrabold text-ink">1 of 3</p>
                <p className="mt-1 text-sm text-ink/60">acquired with the pool</p>
                <p className="mt-3 text-xs leading-relaxed text-ink/50">
                  First-come, first-served allocation. Any excess rolls to the next asset or is refunded.
                </p>
              </div>
            </Fx>
          </div>
        </div>
      </section>

      {/* ---------- reassurance / proof ---------- */}
      <section className="py-12 lg:py-16">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <SectionHead
            eyebrow="No surprises"
            title="Your pledge is protected at every step."
            lede="Funds only move at closing, into segregated escrow with pre-defined release conditions tied to the SPV share transfer. If we cannot acquire, you are refunded in full."
          />
          <Fx scale delay={120} className="mx-auto max-w-sm">
            <PushNotification body="Your London pledge is confirmed. You're allocation #214, first-come, first-served." time="now" delay={500} />
          </Fx>
        </div>
      </section>
    </>
  );
}
