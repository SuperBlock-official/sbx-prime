import { createContext, useContext, useEffect, useState } from "react";
import { ASSETS as STATIC_ASSETS } from "../data/asset";

/*
  Hybrid asset source. The rich static data (src/data/asset.js) is the base, so
  first paint is exactly today's site and nothing breaks if the API is down.
  On mount we fetch the DB-backed /api/assets and overlay the fields the admin
  can edit (financials, core details, images) on top — so admin edits go live
  while long-form content the DB doesn't hold stays intact.
*/

const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const AssetsCtx = createContext(null);

const staticMap = () => Object.fromEntries(STATIC_ASSETS.map((a) => [a.slug, a]));

// Overlay DB fields onto a static asset; deep-merge the nested objects we edit.
function overlay(base = {}, api = {}) {
  return {
    ...base,
    ...api,
    images: { ...(base.images || {}), ...(api.images || {}) },
    economics: { ...(base.economics || {}), ...(api.economics || {}) },
  };
}

export function AssetsProvider({ children }) {
  const [bySlug, setBySlug] = useState(staticMap);

  useEffect(() => {
    let alive = true;
    fetch(`${API_BASE}/assets`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.assets?.length) return;
        setBySlug((prev) => {
          const next = { ...prev };
          for (const api of d.assets) next[api.slug] = overlay(prev[api.slug], api);
          return next;
        });
      })
      .catch(() => {}); // stay on static data on any failure
    return () => {
      alive = false;
    };
  }, []);

  return <AssetsCtx.Provider value={bySlug}>{children}</AssetsCtx.Provider>;
}

export function useAssets() {
  const bySlug = useContext(AssetsCtx) || staticMap();
  // Preserve the static ordering; any admin-added slugs come after.
  const order = STATIC_ASSETS.map((a) => a.slug);
  const extra = Object.keys(bySlug).filter((s) => !order.includes(s));
  const assets = [...order, ...extra].map((s) => bySlug[s]).filter(Boolean);
  return { bySlug, assets };
}

export function useAsset(slug) {
  return useAssets().bySlug[slug];
}
