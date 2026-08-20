import { useEffect, useState } from "react";
import { adminApi } from "../lib/adminApi";

const date = (s) => new Date(s).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

export default function Leads() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.listLeads().then((r) => setRows(r.leads)).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!rows) return <p className="text-ink/50">Loading leads…</p>;

  return (
    <div>
      <h1 className="font-display text-xl font-extrabold text-ink">Leads</h1>
      <p className="text-[13px] text-ink/50">{rows.length} registered interest.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-hairline bg-white">
        <table className="w-full min-w-[520px] text-left text-[13px]">
          <thead className="border-b border-hairline bg-mist/40 text-[11px] uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-4 py-3 font-bold">Email</th>
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="px-4 py-3 font-bold">Source</th>
              <th className="px-4 py-3 font-bold">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-hairline/70 last:border-0">
                <td className="px-4 py-3 font-bold text-ink">{r.email}</td>
                <td className="px-4 py-3 text-ink/70">{r.name || "—"}</td>
                <td className="px-4 py-3 text-ink/70">{r.source || "—"}</td>
                <td className="px-4 py-3 text-ink/45">{date(r.created_at)}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-ink/40">No leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
