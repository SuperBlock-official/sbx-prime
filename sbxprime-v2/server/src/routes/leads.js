import { Router } from "express";
import { query } from "../db.js";
import { leadSchema, fieldErrors } from "../lib/validation.js";
import { sendMail, leadConfirmation } from "../lib/email.js";
import { normalizeEmail, isValidPhone } from "../lib/leadGuard.js";

const router = Router();

// Silently accept-and-drop: bots get a 200 so they don't retry, we store nothing.
const drop = (res) => res.status(201).json({ ok: true });

router.post("/", async (req, res, next) => {
  // 1) Honeypot — real users never fill the hidden `company` field; bots do.
  if (req.body?.company) return drop(res);

  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: fieldErrors(parsed.error) });
  }
  const d = parsed.data;

  // 2) Timing gate — a genuine person can't complete the form in <2.5s.
  if (d.renderedAt && Date.now() - d.renderedAt < 2500) return drop(res);

  // 3) Require real contact details. The current spam wave posts email only, so
  //    a name + valid phone requirement removes it while capturing more data.
  const name = (d.name || "").trim();
  const phone = (d.phone || "").trim();
  if (name.length < 2 || !isValidPhone(phone)) {
    return res.status(422).json({
      ok: false,
      errors: {
        ...(name.length < 2 ? { name: "Enter your name." } : {}),
        ...(!isValidPhone(phone) ? { phone: "Enter a valid contact number." } : {}),
      },
    });
  }

  const normalized = normalizeEmail(d.email);

  try {
    // 4) Dedupe on the normalised email so gmail dot/plus variants collapse.
    const dup = await query("select 1 from leads where normalized_email = $1 limit 1", [normalized]);
    if (dup.rowCount) return drop(res);

    const { rows } = await query(
      `insert into leads (email, name, phone, source, meta, normalized_email, ip, user_agent)
       values ($1, $2, $3, $4, $5, $6, $7, $8)
       returning id`,
      [d.email, name, phone, d.source || null, d.meta || {}, normalized, req.ip, req.get("user-agent") || null]
    );

    res.status(201).json({ ok: true, id: rows[0].id });

    sendMail({ to: d.email, ...leadConfirmation(d) }).catch((e) =>
      console.error("[email] lead:", e?.message)
    );
  } catch (err) {
    next(err);
  }
});

export default router;
