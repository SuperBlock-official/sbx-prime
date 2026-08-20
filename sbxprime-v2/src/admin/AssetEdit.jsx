import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { adminApi } from "../lib/adminApi";

const ACQ_COSTS_PCT = 6.8;
const ISSUANCE_FEE_PCT = 2.5;

const BLANK = {
  slug: "", name: "", published: true, sort: 0,
  neighbourhood: "", cur: "£", size: "", pricePerSqft: "", valuation: "",
  yieldPa: "", appreciationPa: "", totalPa: "", useClass: "", tenure: "", epc: "",
  manager: "", mgmtFeePct: "", grossRent: "", opexPct: "", incomeBasis: "",
  hero: "", gallery: [],
};

export default function AssetEdit() {
  const { slug } = useParams();
  const isNew = !slug;
  const navigate = useNavigate();
  const [f, setF] = useState(BLANK);
  const [status, setStatus] = useState({ loading: !isNew, saving: false, error: "", fieldErrors: {} });

  useEffect(() => {
    if (isNew) return;
    adminApi.getAsset(slug).then(({ asset }) => {
      const d = asset.data || {};
      const e = d.economics || {};
      setF({
        slug: asset.slug, name: asset.name, published: asset.published, sort: asset.sort,
        neighbourhood: d.neighbourhood || "", cur: d.cur || "£", size: d.size ?? "",
        pricePerSqft: d.pricePerSqft ?? "", valuation: d.valuation ?? "",
        yieldPa: d.yieldPa || "", appreciationPa: d.appreciationPa || "", totalPa: d.totalPa || "",
        useClass: d.useClass || "", tenure: d.tenure || "", epc: d.epc || "",
        manager: e.manager || "", mgmtFeePct: e.mgmtFeePct ?? "", grossRent: e.grossRent ?? "",
        opexPct: e.opexPct ?? "", incomeBasis: e.incomeBasis || "",
        hero: d.images?.hero || "", gallery: d.images?.gallery || [],
      });
      setStatus((s) => ({ ...s, loading: false }));
    }).catch((e) => setStatus((s) => ({ ...s, loading: false, error: e.message })));
  }, [slug, isNew]);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const num = (v) => (v === "" || v === null ? 0 : Number(v));

  // Live cost model — mirrors the site's costModel() so edits show their effect.
  const cm = useMemo(() => {
    const purchase = num(f.valuation);
    const size = num(f.size);
    const acqCosts = Math.round((purchase * ACQ_COSTS_PCT) / 100);
    const issuance = Math.round((purchase * ISSUANCE_FEE_PCT) / 100);
    const totalCost = purchase + acqCosts + issuance;
    const pricePerToken = size ? Math.round((totalCost / size) * 100) / 100 : 0;
    const gross = num(f.grossRent);
    const opex = Math.round((gross * num(f.opexPct)) / 100);
    const mgmt = Math.round((gross * num(f.mgmtFeePct)) / 100);
    const net = gross - opex - mgmt;
    const incomePerToken = size ? Math.round((net / size) * 100) / 100 : 0;
    const netYield = totalCost ? Math.round((net / totalCost) * 1000) / 10 : 0;
    return { totalCost, pricePerToken, net, incomePerToken, netYield };
  }, [f.valuation, f.size, f.grossRent, f.opexPct, f.mgmtFeePct]);

  const money = (n) => (f.cur || "£") + Math.round(n).toLocaleString("en-US");

  const buildPayload = () => {
    const data = {
      neighbourhood: f.neighbourhood, cur: f.cur, size: num(f.size),
      pricePerSqft: num(f.pricePerSqft), valuation: num(f.valuation),
      yieldPa: f.yieldPa, appreciationPa: f.appreciationPa, totalPa: f.totalPa,
      useClass: f.useClass, tenure: f.tenure, epc: f.epc,
      economics: {
        manager: f.manager, mgmtFeePct: num(f.mgmtFeePct), grossRent: num(f.grossRent),
        opexPct: num(f.opexPct), incomeBasis: f.incomeBasis,
      },
      images: { hero: f.hero, gallery: f.gallery },
    };
    const base = { name: f.name, published: f.published, sort: num(f.sort), data };
    return isNew ? { slug: f.slug, ...base } : base;
  };

  const save = async () => {
    setStatus((s) => ({ ...s, saving: true, error: "", fieldErrors: {} }));
    try {
      if (isNew) await adminApi.createAsset(buildPayload());
      else await adminApi.updateAsset(slug, buildPayload());
      navigate("/admin");
    } catch (e) {
      setStatus((s) => ({ ...s, saving: false, error: e.message, fieldErrors: e.errors || {} }));
    }
  };

  const uploadTo = async (file, target) => {
    const { url } = await adminApi.uploadImage(file);
    if (target === "hero") setF((p) => ({ ...p, hero: url }));
    else setF((p) => ({ ...p, gallery: [...p.gallery, url] }));
  };

  if (status.loading) return <p className="text-ink/50">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <Link to="/admin" className="text-[13px] text-ink/50 hover:text-ink">← Back to assets</Link>
      <div className="mt-2 flex items-center justify-between">
        <h1 className="font-display text-xl font-extrabold text-ink">
          {isNew ? "New asset" : f.name || slug}
        </h1>
        <label className="flex items-center gap-2 text-[13px] text-ink/60">
          <input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} />
          Published
        </label>
      </div>

      {status.error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">{status.error}</p>}

      <Section title="Core details">
        {isNew && <Field label="Slug (url)" value={f.slug} onChange={set("slug")} err={status.fieldErrors.slug} placeholder="e.g. bond-street" />}
        <Field label="Name" value={f.name} onChange={set("name")} err={status.fieldErrors.name} />
        <Field label="Neighbourhood" value={f.neighbourhood} onChange={set("neighbourhood")} />
        <Field label="Currency" value={f.cur} onChange={set("cur")} className="w-24" />
        <Field label="Size (sq ft)" value={f.size} onChange={set("size")} type="number" />
        <Field label="Price / sq ft" value={f.pricePerSqft} onChange={set("pricePerSqft")} type="number" />
        <Field label="Valuation" value={f.valuation} onChange={set("valuation")} type="number" />
        <Field label="Use class" value={f.useClass} onChange={set("useClass")} wide />
        <Field label="Tenure" value={f.tenure} onChange={set("tenure")} wide />
        <Field label="EPC" value={f.epc} onChange={set("epc")} className="w-32" />
        <Field label="Yield p.a." value={f.yieldPa} onChange={set("yieldPa")} />
        <Field label="Appreciation p.a." value={f.appreciationPa} onChange={set("appreciationPa")} />
        <Field label="Total p.a." value={f.totalPa} onChange={set("totalPa")} />
        <Field label="Sort order" value={f.sort} onChange={set("sort")} type="number" className="w-24" />
      </Section>

      <Section title="Financials (per-asset economics)">
        <Field label="Asset manager" value={f.manager} onChange={set("manager")} wide />
        <Field label="Management fee %" value={f.mgmtFeePct} onChange={set("mgmtFeePct")} type="number" />
        <Field label="Gross rent (p.a.)" value={f.grossRent} onChange={set("grossRent")} type="number" />
        <Field label="Opex %" value={f.opexPct} onChange={set("opexPct")} type="number" />
        <Field label="Income basis" value={f.incomeBasis} onChange={set("incomeBasis")} wide />
      </Section>

      {/* live preview of the derived numbers */}
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-brand/20 bg-brand/[0.04] p-4 sm:grid-cols-4">
        <Stat label="Total cost" value={money(cm.totalCost)} />
        <Stat label="Price / token" value={money(cm.pricePerToken)} />
        <Stat label="Net income" value={money(cm.net)} />
        <Stat label="Net yield" value={`${cm.netYield}%`} />
      </div>

      <Section title="Images">
        <ImageField label="Hero image" url={f.hero} onUpload={(file) => uploadTo(file, "hero")} onClear={() => setF({ ...f, hero: "" })} />
        <div className="col-span-full">
          <p className="text-[12px] font-bold uppercase tracking-wide text-ink/50">Gallery</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {f.gallery.map((url, i) => (
              <div key={url + i} className="relative">
                <img src={url} alt="" className="h-20 w-28 rounded-lg border border-hairline object-cover" />
                <button
                  onClick={() => setF({ ...f, gallery: f.gallery.filter((_, j) => j !== i) })}
                  className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-white"
                  aria-label="Remove"
                >×</button>
              </div>
            ))}
            <label className="grid h-20 w-28 cursor-pointer place-items-center rounded-lg border border-dashed border-hairline text-[12px] text-ink/50 hover:border-brand/50 hover:text-brand-dark">
              + Add
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadTo(e.target.files[0], "gallery")} />
            </label>
          </div>
        </div>
      </Section>

      <div className="mt-8 flex items-center gap-3">
        <button onClick={save} disabled={status.saving} className="btn-primary disabled:opacity-60">
          {status.saving ? "Saving…" : isNew ? "Create asset" : "Save changes"}
        </button>
        <Link to="/admin" className="btn-ghost">Cancel</Link>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-6 rounded-2xl border border-hairline bg-white p-5">
      <h2 className="font-display text-[15px] font-extrabold text-ink">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", err, wide, className = "", placeholder }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="block text-[12px] font-bold uppercase tracking-wide text-ink/50">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`field mt-1.5 ${className}`} />
      {err && <p className="mt-1 text-[12px] text-red-600">{err}</p>}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-ink/45">{label}</p>
      <p className="font-display text-base font-extrabold tabular-nums text-ink">{value}</p>
    </div>
  );
}

function ImageField({ label, url, onUpload, onClear }) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-[12px] font-bold uppercase tracking-wide text-ink/50">{label}</label>
      <div className="mt-2 flex items-center gap-4">
        {url ? (
          <img src={url} alt="" className="h-24 w-40 rounded-lg border border-hairline object-cover" />
        ) : (
          <div className="grid h-24 w-40 place-items-center rounded-lg border border-dashed border-hairline text-[12px] text-ink/40">No image</div>
        )}
        <div className="flex flex-col gap-2">
          <label className="btn-ghost cursor-pointer text-center">
            Upload
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} />
          </label>
          {url && <button onClick={onClear} className="text-[12px] text-ink/40 hover:text-red-600">Remove</button>}
        </div>
      </div>
    </div>
  );
}
