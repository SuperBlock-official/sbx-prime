import { useState } from "react";
import { Icon } from "../components/icons";
import { useAssets } from "../lib/assetsStore";
import { costModel, PLATFORM_FEES } from "../data/asset";
import { AreaChart, Donut } from "./charts";

const gbp = (n) => "£" + Math.round(Number(n || 0)).toLocaleString("en-US");
const ft = (n) => `${Number(n || 0).toLocaleString("en-US")} ft²`;

function Card({ className = "", children }) {
  return <div className={`rounded-2xl border border-hairline bg-white p-5 ${className}`}>{children}</div>;
}
function SectionTitle({ children, right }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-[15px] font-extrabold text-ink">{children}</h2>
      {right}
    </div>
  );
}

/* ───────────────────────── Dashboard (overview) ───────────────────────── */

export function Overview({ p, onNavigate }) {
  const start = p.valueSeries[0]?.value || p.value;
  const gain = p.value - start;
  const gainPct = start ? Math.round((gain / start) * 1000) / 10 : 0;

  const kpis = [
    { label: "Portfolio value", value: gbp(p.value), sub: `▲ ${gainPct}%  ·  +${gbp(gain)}`, tone: "up" },
    { label: "Rent · last 12 mo", value: gbp(p.incomeYr), sub: `${gbp(p.monthly)} / mo`, tone: "muted" },
    { label: "Blended net yield", value: `${p.netYield}%`, sub: `${ft(p.heldFt)} · ${p.assets} assets`, tone: "plain" },
    { label: "Next distribution", value: gbp(p.monthly), sub: "01 Sep · in 12 days", tone: "grad" },
  ];

  const tx = [
    { tag: "Rent", cls: "bg-brand/12 text-brand-dark", label: `${p.assets} properties`, date: "01 Sep 2026", amt: `+${gbp(p.monthly)}`, pos: true },
    { tag: "Buy", cls: "bg-brand-teal/12 text-[#1b7cb5]", label: `${p.holdings[2].submarket} · ${ft(p.holdings[2].held)}`, date: "24 Aug 2026", amt: `-${gbp(p.holdings[2].value)}`, pos: false },
    { tag: "Sell", cls: "bg-[#e8583f]/12 text-[#c0492f]", label: `${p.holdings[1].name} · 3 ft²`, date: "18 Aug 2026", amt: `+${gbp(3 * p.holdings[1].pricePerToken)}`, pos: true },
    { tag: "Deposit", cls: "bg-ink/8 text-ink/60", label: "Bank transfer", date: "02 Aug 2026", amt: "+£25,000", pos: true },
  ];

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className={`rounded-2xl border p-4 ${k.tone === "grad" ? "border-transparent bg-gradient-to-br from-brand-mint via-[#2ecbc4] to-brand-teal text-[#06231a]" : "border-hairline bg-white"}`}>
            <p className={`text-[11px] font-bold uppercase tracking-wide ${k.tone === "grad" ? "text-[#06231a]/70" : "text-ink/45"}`}>{k.label}</p>
            <p className={`mt-1 font-display text-[26px] font-extrabold tabular-nums ${k.tone === "grad" ? "text-[#06231a]" : "text-ink"}`}>{k.value}</p>
            <p className={`mt-0.5 text-[12px] tabular-nums ${k.tone === "up" ? "text-brand-dark" : k.tone === "grad" ? "text-[#06231a]/75" : "text-ink/45"}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* chart + allocation */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-5">
        <Card>
          <SectionTitle right={<span className="text-[12px] font-semibold text-brand-dark">Last 12 months ▾</span>}>Portfolio value vs rent collected</SectionTitle>
          <AreaChart series={p.valueSeries} />
        </Card>
        <Card>
          <SectionTitle>Allocation</SectionTitle>
          <Donut data={p.allocation} centerTop={p.heldFt} centerSub="ft² held" />
        </Card>
      </div>

      {/* holdings + transactions + dao */}
      <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-5">
        <Card>
          <SectionTitle right={<button onClick={() => onNavigate("portfolio")} className="text-[12px] font-bold text-brand-dark hover:underline">View all</button>}>Your holdings</SectionTitle>
          <div className="space-y-3">
            {p.holdings.map((h) => (
              <div key={h.slug} className="flex items-center gap-3">
                <img src={h.image} alt="" className="h-9 w-11 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-ink">{h.name}</p>
                  <p className="text-[11px] text-ink/45">{h.submarket} · {h.manager}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-bold tabular-nums text-ink">{gbp(h.value)}</p>
                  <p className="text-[11px] tabular-nums text-brand-dark">{ft(h.held)} · {h.yieldPct}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle right={<button onClick={() => onNavigate("rent")} className="text-[12px] font-bold text-brand-dark hover:underline">View all</button>}>Recent transactions</SectionTitle>
          <div className="space-y-2.5">
            {tx.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${t.cls}`}>{t.tag}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-ink">{t.label}</p>
                  <p className="text-[10.5px] text-ink/40">{t.date}</p>
                </div>
                <span className={`text-[12px] font-bold tabular-nums ${t.pos ? "text-brand-dark" : "text-[#c0492f]"}`}>{t.amt}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle right={<span className="text-[11px] font-bold text-brand-dark">3 open</span>}>DAO proposals</SectionTitle>
          <Proposals compact onOpen={() => onNavigate("dao")} />
        </Card>
      </div>
    </div>
  );
}

/* ───────────────────────── DAO proposals ───────────────────────── */

const PROPOSALS = [
  { title: "Refinance · Grosvenor Gardens", tag: "Debt", pct: 71, left: "4d left" },
  { title: "Rent review · Threadneedle Street", tag: "Leasing", pct: 88, left: "9d left" },
  { title: "Service charge budget · Dover Street", tag: "Opex", pct: 64, left: "6d left" },
];

function Proposals({ compact, onOpen }) {
  const list = compact ? PROPOSALS.slice(0, 2) : PROPOSALS;
  return (
    <div className="space-y-4">
      {list.map((pr) => (
        <div key={pr.title}>
          <p className="text-[13px] font-bold text-ink">{pr.title}</p>
          <span className="mt-1 inline-block rounded-md bg-brand-teal/12 px-2 py-0.5 text-[10px] font-bold text-[#1b7cb5]">{pr.tag}</span>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/8">
            <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-mint" style={{ width: `${pr.pct}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[11px] text-ink/45">
            <span>{pr.pct}% for</span><span>{pr.left}</span>
          </div>
        </div>
      ))}
      <button onClick={onOpen} className="w-full rounded-xl bg-brand py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-dark">Review &amp; vote</button>
    </div>
  );
}

export function DaoVoting() {
  return (
    <div className="max-w-2xl">
      <Card><SectionTitle right={<span className="text-[11px] font-bold text-brand-dark">3 open</span>}>Open proposals</SectionTitle><Proposals /></Card>
      <p className="mt-4 text-[12px] text-ink/45">One token equals one vote. Passed proposals enter a timelock before they execute on-chain.</p>
    </div>
  );
}

/* ───────────────────────── Marketplace ───────────────────────── */

export function Marketplace() {
  const { assets } = useAssets();
  return (
    <div className="grid grid-cols-3 gap-4">
      {assets.map((a) => {
        const cm = costModel(a);
        return (
          <Card key={a.slug} className="!p-0 overflow-hidden">
            <img src={a.images?.hero} alt="" className="h-28 w-full object-cover" />
            <div className="p-4">
              <p className="text-[13px] font-bold text-ink">{a.name}</p>
              <p className="text-[11px] text-ink/45">{a.neighbourhood}</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink/40">Per sq ft</p>
                  <p className="font-display text-[15px] font-extrabold tabular-nums text-ink">{gbp(cm.pricePerToken)}</p>
                </div>
                <span className="rounded-full bg-brand/12 px-2.5 py-1 text-[11px] font-bold text-brand-dark">{cm.netYield}% net</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Portfolio ───────────────────────── */

export function Portfolio({ p }) {
  return (
    <Card className="!p-0 overflow-hidden">
      <table className="w-full text-left text-[13px]">
        <thead className="border-b border-hairline bg-[#F4F9F6] text-[11px] uppercase tracking-wide text-ink/45">
          <tr>
            <th className="px-5 py-3 font-bold">Property</th>
            <th className="px-5 py-3 font-bold">Held</th>
            <th className="px-5 py-3 font-bold">Price / ft²</th>
            <th className="px-5 py-3 font-bold">Value</th>
            <th className="px-5 py-3 font-bold">Income / yr</th>
            <th className="px-5 py-3 font-bold">Yield</th>
          </tr>
        </thead>
        <tbody>
          {p.holdings.map((h) => (
            <tr key={h.slug} className="border-b border-hairline/70 last:border-0">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <img src={h.image} alt="" className="h-9 w-11 rounded-md object-cover" />
                  <div><p className="font-bold text-ink">{h.name}</p><p className="text-[11px] text-ink/45">{h.submarket} · {h.manager}</p></div>
                </div>
              </td>
              <td className="px-5 py-3 tabular-nums text-ink/70">{ft(h.held)}</td>
              <td className="px-5 py-3 tabular-nums text-ink/70">{gbp(h.pricePerToken)}</td>
              <td className="px-5 py-3 tabular-nums font-bold text-ink">{gbp(h.value)}</td>
              <td className="px-5 py-3 tabular-nums text-ink/70">{gbp(h.incomeYr)}</td>
              <td className="px-5 py-3 tabular-nums text-brand-dark">{h.yieldPct}%</td>
            </tr>
          ))}
          <tr className="bg-[#F4F9F6] font-bold">
            <td className="px-5 py-3 text-ink">Total</td>
            <td className="px-5 py-3 tabular-nums text-ink">{ft(p.heldFt)}</td>
            <td />
            <td className="px-5 py-3 tabular-nums text-ink">{gbp(p.value)}</td>
            <td className="px-5 py-3 tabular-nums text-ink">{gbp(p.incomeYr)}</td>
            <td className="px-5 py-3 tabular-nums text-brand-dark">{p.netYield}%</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

/* ───────────────────────── Rental income ───────────────────────── */

export function RentalIncome({ p }) {
  const rows = p.valueSeries.slice().reverse().slice(0, 6).map((d, i, arr) => {
    const prev = arr[i + 1]?.rent ?? 0;
    return { m: d.m, amount: d.rent - prev };
  }).filter((r) => r.amount > 0);
  return (
    <div className="grid grid-cols-[1fr_1.2fr] gap-5">
      <Card>
        <SectionTitle>This month</SectionTitle>
        <p className="font-display text-4xl font-extrabold tabular-nums text-ink">{gbp(p.monthly)}</p>
        <p className="mt-1 text-[13px] text-ink/50">Paid in USDC · next 01 Sep</p>
        <div className="mt-4 space-y-2">
          {p.holdings.map((h) => (
            <div key={h.slug} className="flex justify-between text-[13px]">
              <span className="text-ink/60">{h.name}</span>
              <span className="font-bold tabular-nums text-ink">{gbp(h.incomeYr / 12)}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Distribution history</SectionTitle>
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.m} className="flex items-center justify-between border-b border-hairline/60 pb-2 text-[13px] last:border-0">
              <span className="text-ink/60">{r.m} 2026</span>
              <span className="font-bold tabular-nums text-brand-dark">+{gbp(r.amount)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────────── Secondary market ───────────────────────── */

export function SecondaryMarket({ p }) {
  const asks = p.holdings.map((h, i) => ({ name: h.name, px: h.pricePerToken, ft: [4, 9, 3][i] || 5 }));
  return (
    <div className="max-w-3xl">
      <Card className="!p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
          <p className="font-display text-[14px] font-extrabold text-ink">Open listings</p>
          <span className="rounded-full bg-brand/12 px-2.5 py-1 text-[11px] font-bold text-brand-dark">1.5% trading fee</span>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#F4F9F6] text-[11px] uppercase tracking-wide text-ink/45">
            <tr><th className="px-5 py-2.5 font-bold">Property</th><th className="px-5 py-2.5 font-bold">Ask / ft²</th><th className="px-5 py-2.5 font-bold">Size</th><th className="px-5 py-2.5" /></tr>
          </thead>
          <tbody>
            {asks.map((a) => (
              <tr key={a.name} className="border-t border-hairline/70">
                <td className="px-5 py-3 font-bold text-ink">{a.name}</td>
                <td className="px-5 py-3 tabular-nums text-ink/70">{gbp(a.px)}</td>
                <td className="px-5 py-3 tabular-nums text-ink/70">{ft(a.ft)}</td>
                <td className="px-5 py-3 text-right"><button className="rounded-lg bg-brand px-3 py-1.5 text-[12px] font-bold text-white">Buy</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ───────────────────────── Prime AI ───────────────────────── */

export function PrimeAI({ p }) {
  const [msgs, setMsgs] = useState([
    { role: "ai", text: `You hold ${ft(p.heldFt)} across ${p.assets} London assets worth ${gbp(p.value)}, yielding ${p.netYield}% net. Ask me anything.` },
  ]);
  const [q, setQ] = useState("");
  const ask = (text) => {
    const t = text.trim(); if (!t) return;
    const a = pick(t, p);
    setMsgs((m) => [...m, { role: "me", text: t }, { role: "ai", text: a }]);
    setQ("");
  };
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto pb-4">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${m.role === "me" ? "ml-auto bg-brand text-white" : "bg-white text-ink border border-hairline"}`}>{m.text}</div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 pb-2">
        {["What's my best-yielding asset?", "How much rent this month?", "Explain the fees"].map((s) => (
          <button key={s} onClick={() => ask(s)} className="rounded-full border border-hairline bg-white px-3 py-1.5 text-[12px] text-ink/60 hover:border-brand/40 hover:text-brand-dark">{s}</button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask Prime AI…" className="flex-1 rounded-xl border border-hairline bg-white px-4 py-2.5 text-[13px] outline-none focus:border-brand/50" />
        <button className="rounded-xl bg-brand px-4 text-[13px] font-bold text-white">Send</button>
      </form>
    </div>
  );
}
function pick(q, p) {
  const s = q.toLowerCase();
  if (s.includes("yield") || s.includes("best")) {
    const top = [...p.holdings].sort((a, b) => b.yieldPct - a.yieldPct)[0];
    return `${top.name} leads at ${top.yieldPct}% net yield (${ft(top.held)} held, ${gbp(top.value)}).`;
  }
  if (s.includes("rent") || s.includes("month")) return `Your next distribution is ${gbp(p.monthly)}, paid 01 Sep in USDC.`;
  if (s.includes("fee")) return "Issuance 2.5% (in the token price), transaction 0.25%, secondary marketplace 1.5%, and a 4% instant-liquidity pool fee. Management fees vary per asset and go to that building's manager.";
  return `Your portfolio is ${gbp(p.value)} across ${p.assets} London assets at ${p.netYield}% net.`;
}

/* ───────────────────────── Wallet ───────────────────────── */

export function Wallet({ p }) {
  return (
    <div className="grid max-w-3xl grid-cols-2 gap-5">
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink/45">USDC balance</p>
        <p className="mt-1 font-display text-3xl font-extrabold tabular-nums text-ink">$3,420.00</p>
        <p className="mt-1 text-[12px] text-ink/45">Available to invest or withdraw</p>
        <button className="mt-4 w-full rounded-xl bg-brand py-2.5 text-[13px] font-bold text-white">Deposit USDC</button>
      </Card>
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink/45">$SBX staked</p>
        <p className="mt-1 font-display text-3xl font-extrabold tabular-nums text-ink">12,500</p>
        <p className="mt-1 text-[12px] text-brand-dark">Earning liquidity-pool fees</p>
        <button className="mt-4 w-full rounded-xl border border-hairline py-2.5 text-[13px] font-bold text-ink/70">Manage staking</button>
      </Card>
      <Card className="col-span-2">
        <SectionTitle>Wallet address</SectionTitle>
        <div className="flex items-center justify-between rounded-xl bg-[#F4F9F6] px-4 py-3 font-mono text-[12px] text-ink/60">
          0x9f2a…4E71 (Base)
          <span className="rounded-md bg-brand/12 px-2 py-0.5 text-[11px] font-bold text-brand-dark">ERC-3643</span>
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────────── KYC ───────────────────────── */

export function Kyc() {
  const steps = [
    ["Identity verified", "Passport · matched", true],
    ["Sanctions & PEP screening", "Cleared", true],
    ["Source of funds", "Approved", true],
    ["Accredited-investor status", "On file", true],
  ];
  return (
    <div className="max-w-xl">
      <Card>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand/12"><Icon name="shield" className="h-6 w-6 text-brand-dark" /></span>
          <div><p className="font-display text-[15px] font-extrabold text-ink">Verified</p><p className="text-[12px] text-ink/50">Eligible under Regulation S · outside US/UK/EEA</p></div>
        </div>
        <ul className="mt-5 space-y-3">
          {steps.map(([t, s]) => (
            <li key={t} className="flex items-center gap-3">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand-dark"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /></span>
              <span className="flex-1 text-[13px] font-semibold text-ink">{t}</span>
              <span className="text-[12px] text-ink/45">{s}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ───────────────────────── Documents ───────────────────────── */

export function Documents() {
  const docs = [
    ["Monthly rent statement — Aug 2026", "PDF"],
    ["Q2 2026 portfolio report", "PDF"],
    ["Grosvenor Gardens — RICS valuation", "PDF"],
    ["SPV shareholder certificate", "PDF"],
    ["ERC-3643 token terms", "PDF"],
    ["Annual audited accounts 2025", "PDF"],
  ];
  return (
    <Card className="!p-0 max-w-2xl overflow-hidden">
      <ul>
        {docs.map(([t, k]) => (
          <li key={t} className="flex items-center gap-3 border-b border-hairline/70 px-5 py-3.5 last:border-0">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand-dark"><Icon name="doc" className="h-4 w-4" /></span>
            <span className="flex-1 text-[13px] font-semibold text-ink">{t}</span>
            <span className="text-[11px] font-bold text-ink/40">{k}</span>
            <button className="rounded-lg border border-hairline px-3 py-1.5 text-[12px] font-bold text-brand-dark">Download</button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ───────────────────────── Trade (soon) ───────────────────────── */

export function ComingSoon() {
  return (
    <div className="grid h-full place-items-center">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand-dark"><Icon name="chart" className="h-7 w-7" /></span>
        <p className="mt-4 font-display text-lg font-extrabold text-ink">Live trading is coming soon</p>
        <p className="mt-1 text-[13px] text-ink/50">Instant token swaps with on-chain settlement.</p>
      </div>
    </div>
  );
}
