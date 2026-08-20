import { Router } from "express";
import { query } from "../db.js";
import { pledgeSchema, fieldErrors } from "../lib/validation.js";
import { sendMail, pledgeConfirmation, pledgeTeamNotice } from "../lib/email.js";
import { config } from "../config.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const parsed = pledgeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: fieldErrors(parsed.error) });
  }
  const d = parsed.data;
  try {
    const { rows } = await query(
      `insert into pledges
         (name, email, country, asset_slug, usdc_amount, sqft, eligibility_self_certified, ip, user_agent)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       returning id, investor_number`,
      [d.name, d.email, d.country, d.assetSlug || null, d.usdcAmount, d.sqft,
       d.eligibilitySelfCertified, req.ip, req.get("user-agent") || null]
    );

    const rec = { ...d, id: rows[0].id, investorNumber: Number(rows[0].investor_number) };

    // Emails are best-effort — a mail hiccup must never fail a captured pledge.
    Promise.allSettled([
      sendMail({ to: rec.email, ...pledgeConfirmation(rec) }),
      config.mail.team
        ? sendMail({ to: config.mail.team, replyTo: rec.email, ...pledgeTeamNotice(rec) })
        : Promise.resolve({ skipped: true }),
    ]).then((results) =>
      results
        .filter((r) => r.status === "rejected")
        .forEach((r) => console.error("[email] pledge:", r.reason?.message))
    );

    res.status(201).json({ ok: true, id: rec.id, investorNumber: rec.investorNumber });
  } catch (err) {
    next(err);
  }
});

export default router;
