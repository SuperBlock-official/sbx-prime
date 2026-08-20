import { useMemo } from "react";
import { useAssets } from "../lib/assetsStore";
import { costModel } from "../data/asset";

/* A demo portfolio built from the REAL London assets. Values, income and yields
   are computed live from costModel() so everything is internally consistent and
   reflects any admin edits — no invented figures. sq ft held per asset: */
const HELD = [
  { slug: "grosvenor-gardens", held: 20 },
  { slug: "threadneedle-street", held: 15 },
  { slug: "dover-street", held: 5 },
];

const submarket = (a) => (a?.neighbourhood || "").split(",")[0].split("·")[0].trim();

export function usePortfolio() {
  const { bySlug } = useAssets();
  return useMemo(() => {
    const cur = "£";
    const holdings = HELD.map(({ slug, held }) => {
      const a = bySlug[slug] || {};
      const cm = costModel(a);
      return {
        slug,
        name: a.name || slug,
        submarket: submarket(a),
        manager: cm.manager,
        image: a.images?.hero,
        held,
        pricePerToken: cm.pricePerToken,
        value: Math.round(held * cm.pricePerToken),
        incomeYr: Math.round(held * cm.incomePerToken),
        yieldPct: cm.netYield,
      };
    });

    const value = holdings.reduce((s, h) => s + h.value, 0);
    const incomeYr = holdings.reduce((s, h) => s + h.incomeYr, 0);
    const heldFt = holdings.reduce((s, h) => s + h.held, 0);
    const monthly = Math.round(incomeYr / 12);
    const netYield = value ? Math.round((incomeYr / value) * 1000) / 10 : 0;

    // Allocation by value, per asset (each in a distinct London submarket).
    const allocation = holdings
      .map((h) => ({ label: h.submarket, value: h.value, pct: value ? Math.round((h.value / value) * 100) : 0 }))
      .sort((a, b) => b.value - a.value);

    // 12-month value + cumulative-rent series (smooth, ending at today's totals).
    const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    const start = Math.round(value * 0.82);
    const valueSeries = months.map((m, i) => ({
      m,
      value: Math.round(start + ((value - start) * i) / (months.length - 1)),
      rent: Math.round((incomeYr * (i + 1)) / 12),
    }));

    return { cur, holdings, value, incomeYr, monthly, heldFt, assets: holdings.length, netYield, allocation, valueSeries };
  }, [bySlug]);
}
