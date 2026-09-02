import { Router } from "express";
import { query } from "../db.js";
import { pledgeSchema, fieldErrors } from "../lib/validation.js";
import { sendMail, pledgeConfirmation, pledgeTeamNotice } from "../lib/email.js";
import { config } from "../config.js";

const router = Router();

router.post("/", async (req, res, next) => {
  // Honeypot: real users never fill the hidden `company` field; bots do.
  // Pretend success and store nothing so bots don't retry.
  if (req.body?.company) return res.status(201).json({ ok: true });

  const parsed = pledgeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: fieldErrors(parsed.error) });
  }
  const d = parsed.data;
  try {
    const { rows } = await query(
      `insert into pledges
         (name, email, country, asset_slug, usdc_amount, sqft, wallet_address, no_wallet,
          eligibility_self_certified, ip, user_agent)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       returning id, investor_number`,
      [d.name, d.email, d.country, d.assetSlug || null, d.usdcAmount, d.sqft,
       d.walletAddress || null, d.noWallet, d.eligibilitySelfCertified, req.ip, req.get("user-agent") || null]
    );

    const rec = { ...d, id: rows[0].id, investorNumber: Number(rows[0].investor_number) };

    // Respond first, then fire the emails off the request path — a slow or
    // failed send must never slow or fail a captured pledge.
    res.status(201).json({ ok: true, id: rec.id, investorNumber: rec.investorNumber });

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
  } catch (err) {
    next(err);
  }
});

export default router;
