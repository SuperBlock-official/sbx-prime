import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "../lib/adminApi";

const money = (cur, n) => (cur || "£") + Math.round(Number(n || 0)).toLocaleString("en-US");

export default function Assets() {
  const [assets, setAssets] = useState(null);
  const [error, setError] = useState("");

  const load = () => adminApi.listAssets().then((r) => setAssets(r.assets)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const remove = async (slug) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    await adminApi.deleteAsset(slug).catch((e) => alert(e.message));
    load();
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!assets) return <p className="text-ink/50">Loading assets…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-extrabold text-ink">Assets</h1>
          <p className="text-[13px] text-ink/50">{assets.length} assets · edit details, financials and images.</p>
        </div>
        <Link to="/admin/assets/new" className="btn-primary">Add asset</Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-white">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-hairline bg-mist/40 text-[11px] uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-4 py-3 font-bold">Asset</th>
              <th className="px-4 py-3 font-bold">Valuation</th>
              <th className="px-4 py-3 font-bold">Yield</th>
              <th className="px-4 py-3 font-bold">Manager</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.slug} className="border-b border-hairline/70 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {a.data.images?.hero && (
                      <img src={a.data.images.hero} alt="" className="h-9 w-12 rounded-md object-cover" />
                    )}
                    <div>
                      <div className="font-bold text-ink">{a.name}</div>
                      <div className="text-[11px] text-ink/45">{a.data.neighbourhood || a.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 tabular-nums text-ink/70">{money(a.data.cur, a.data.valuation)}</td>
                <td className="px-4 py-3 text-ink/70">{a.data.yieldPa || "—"}</td>
                <td className="px-4 py-3 text-ink/70">{a.data.economics?.manager || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${a.published ? "bg-brand/12 text-brand-dark" : "bg-ink/10 text-ink/50"}`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/assets/${a.slug}`} className="font-bold text-brand-dark hover:underline">Edit</Link>
                  <button onClick={() => remove(a.slug)} className="ml-4 text-ink/40 hover:text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
