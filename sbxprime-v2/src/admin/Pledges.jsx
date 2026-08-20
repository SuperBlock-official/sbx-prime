import { useEffect, useState } from "react";
import { adminApi } from "../lib/adminApi";

const money = (n) => "$" + Math.round(Number(n || 0)).toLocaleString("en-US");
const date = (s) => new Date(s).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

export default function Pledges() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.listPledges().then((r) => setRows(r.pledges)).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!rows) return <p className="text-ink/50">Loading pledges…</p>;

  const total = rows.reduce((s, r) => s + Number(r.usdc_amount || 0), 0);

  return (
    <div>
      <h1 className="font-display text-xl font-extrabold text-ink">Pledges</h1>
      <p className="text-[13px] text-ink/50">{rows.length} pledges · {money(total)} USDC reserved.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-hairline bg-white">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="border-b border-hairline bg-mist/40 text-[11px] uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-4 py-3 font-bold">#</th>
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="px-4 py-3 font-bold">Email</th>
              <th className="px-4 py-3 font-bold">Country</th>
              <th className="px-4 py-3 font-bold">Asset</th>
              <th className="px-4 py-3 font-bold">Amount</th>
              <th className="px-4 py-3 font-bold">Sq ft</th>
              <th className="px-4 py-3 font-bold">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-hairline/70 last:border-0">
                <td className="px-4 py-3 tabular-nums text-ink/50">{r.investor_number}</td>
                <td className="px-4 py-3 font-bold text-ink">{r.name}</td>
                <td className="px-4 py-3 text-ink/70">{r.email}</td>
                <td className="px-4 py-3 text-ink/70">{r.country}</td>
                <td className="px-4 py-3 text-ink/70">{r.asset_slug || "—"}</td>
                <td className="px-4 py-3 tabular-nums text-ink/70">{money(r.usdc_amount)}</td>
                <td className="px-4 py-3 tabular-nums text-ink/70">{Number(r.sqft).toLocaleString("en-US")}</td>
                <td className="px-4 py-3 text-ink/45">{date(r.created_at)}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-ink/40">No pledges yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
