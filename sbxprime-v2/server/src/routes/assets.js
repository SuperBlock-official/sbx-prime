import { Router } from "express";
import { query } from "../db.js";

const router = Router();

// Public: published assets only. Returns the full prospectus object plus slug.
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `select slug, name, data from assets where published = true order by sort asc, name asc`
    );
    res.json({ ok: true, assets: rows.map(shape) });
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const { rows } = await query(
      `select slug, name, data from assets where slug = $1 and published = true`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, asset: shape(rows[0]) });
  } catch (err) {
    next(err);
  }
});

// Merge the promoted columns into the data object so the client gets one shape.
function shape(row) {
  return { slug: row.slug, name: row.name, ...row.data };
}

export default router;
