import { Router } from "express";
import { query } from "../db.js";
import { leadSchema, fieldErrors } from "../lib/validation.js";
import { sendMail, leadConfirmation } from "../lib/email.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: fieldErrors(parsed.error) });
  }
  const d = parsed.data;
  try {
    const { rows } = await query(
      `insert into leads (email, name, source, meta)
       values ($1, $2, $3, $4)
       returning id`,
      [d.email, d.name || null, d.source || null, d.meta || {}]
    );

    // Respond first, then send off the request path.
    res.status(201).json({ ok: true, id: rows[0].id });

    sendMail({ to: d.email, ...leadConfirmation(d) }).catch((e) =>
      console.error("[email] lead:", e?.message)
    );
  } catch (err) {
    next(err);
  }
});

export default router;
