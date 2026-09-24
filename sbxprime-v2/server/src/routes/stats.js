import { Router } from "express";
import { query } from "../db.js";

const router = Router();

// Public: live raise progress aggregated from real pledges. Powers the site's
// "% pledged / pledged / investors / sq ft" figures so they update as pledges
// come in. Also a per-asset breakdown keyed by slug.
router.get("/", async (_req, res, next) => {
  try {
    const totals = await query(
      `select coalesce(sum(usdc_amount), 0)::float as raised,
              count(*)::int as investors,
              coalesce(sum(sqft), 0)::int as sqft
         from pledges
        where status <> 'withdrawn'`
    );
    const byAsset = await query(
      `select asset_slug,
              coalesce(sum(usdc_amount), 0)::float as raised,
              count(*)::int as investors,
              coalesce(sum(sqft), 0)::int as sqft
         from pledges
        where status <> 'withdrawn' and asset_slug is not null
        group by asset_slug`
    );
    const t = totals.rows[0];
    const assets = {};
    for (const r of byAsset.rows) {
      assets[r.asset_slug] = { raisedUsd: Math.round(r.raised), investors: r.investors, sqft: r.sqft };
    }
    res.json({
      ok: true,
      raisedUsd: Math.round(t.raised),
      investors: t.investors,
      sqftPledged: t.sqft,
      assets,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
