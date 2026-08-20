import { Router } from "express";
import rateLimit from "express-rate-limit";
import { query } from "../db.js";
import {
  loginSchema,
  assetCreateSchema,
  assetUpdateSchema,
  fieldErrors,
} from "../lib/validation.js";
import {
  verifyPassword,
  signToken,
  setAuthCookie,
  clearAuthCookie,
  requireAdmin,
} from "../auth.js";
import { uploadImage, fileUrl } from "../lib/uploads.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many attempts, try again later." },
});

// ---- Auth ------------------------------------------------------------------

router.post("/login", loginLimiter, async (req, res, next) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ ok: false, errors: fieldErrors(parsed.error) });
  try {
    const { rows } = await query(
      "select id, email, name, password_hash from admin_users where email = $1",
      [parsed.data.email]
    );
    const admin = rows[0];
    const ok = admin && (await verifyPassword(parsed.data.password, admin.password_hash));
    if (!ok) return res.status(401).json({ ok: false, error: "Invalid email or password" });

    setAuthCookie(res, signToken(admin));
    res.json({ ok: true, admin: { email: admin.email, name: admin.name } });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({ ok: true, admin: { email: req.admin.email } });
});

// Everything below requires a valid session.
router.use(requireAdmin);

// ---- Assets ----------------------------------------------------------------

router.get("/assets", async (_req, res, next) => {
  try {
    const { rows } = await query(
      "select slug, name, published, sort, data, updated_at from assets order by sort asc, name asc"
    );
    res.json({ ok: true, assets: rows });
  } catch (err) {
    next(err);
  }
});

router.get("/assets/:slug", async (req, res, next) => {
  try {
    const { rows } = await query("select * from assets where slug = $1", [req.params.slug]);
    if (!rows.length) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, asset: rows[0] });
  } catch (err) {
    next(err);
  }
});

router.post("/assets", async (req, res, next) => {
  const parsed = assetCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ ok: false, errors: fieldErrors(parsed.error) });
  const a = parsed.data;
  try {
    const { rows } = await query(
      `insert into assets (slug, name, published, sort, data)
       values ($1, $2, $3, $4, $5)
       on conflict (slug) do nothing
       returning slug, name, published, sort, data`,
      [a.slug, a.name, a.published, a.sort, a.data]
    );
    if (!rows.length) return res.status(409).json({ ok: false, error: "Slug already exists" });
    res.status(201).json({ ok: true, asset: rows[0] });
  } catch (err) {
    next(err);
  }
});

router.put("/assets/:slug", async (req, res, next) => {
  const parsed = assetUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ ok: false, errors: fieldErrors(parsed.error) });
  const p = parsed.data;
  try {
    // Merge data (jsonb ||) so partial and full updates both work.
    const { rows } = await query(
      `update assets set
         name = coalesce($2, name),
         published = coalesce($3, published),
         sort = coalesce($4, sort),
         data = case when $5::jsonb is null then data else data || $5::jsonb end,
         updated_at = now()
       where slug = $1
       returning slug, name, published, sort, data, updated_at`,
      [req.params.slug, p.name ?? null, p.published ?? null, p.sort ?? null, p.data ?? null]
    );
    if (!rows.length) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, asset: rows[0] });
  } catch (err) {
    next(err);
  }
});

router.delete("/assets/:slug", async (req, res, next) => {
  try {
    const { rowCount } = await query("delete from assets where slug = $1", [req.params.slug]);
    if (!rowCount) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// Image upload — returns the stored URL for the client to drop into hero/gallery.
router.post("/uploads", uploadImage.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file uploaded" });
  res.status(201).json({ ok: true, url: fileUrl(req.file.filename), filename: req.file.filename });
});

// ---- Captured data (read-only) --------------------------------------------

router.get("/pledges", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `select id, created_at, investor_number, name, email, country, asset_slug,
              usdc_amount, sqft, status
         from pledges order by created_at desc limit 500`
    );
    res.json({ ok: true, pledges: rows });
  } catch (err) {
    next(err);
  }
});

router.get("/leads", async (_req, res, next) => {
  try {
    const { rows } = await query(
      "select id, created_at, email, name, source from leads order by created_at desc limit 500"
    );
    res.json({ ok: true, leads: rows });
  } catch (err) {
    next(err);
  }
});

export default router;
