import { Router } from "express";
import { query } from "../db.js";
import { pledgeSchema, fieldErrors } from "../lib/validation.js";
import { sendMail, pledgeConfirmation, pledgeTeamNotice } from "../lib/email.js";
import { isExcludedCountry } from "../lib/eligibility.js";
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

  // Eligibility is server-authoritative: excluded (US/UK/EEA-EU) residents are
  // recorded but get no allocation. Self-certification is required only when eligible.
  const eligible = d.eligible !== false && !isExcludedCountry(d.country);
  if (eligible && !d.eligibilitySelfCertified) {
    return res.status(422).json({ ok: false, errors: { eligibilitySelfCertified: "Eligibility self-certification is required." } });
  }
  const status = eligible ? "pending" : "ineligible";

  try {
    const { rows } = await query(
      `insert into pledges
         (name, email, phone, country, asset_slug, usdc_amount, sqft, wallet_address, no_wallet,
          eligibility_self_certified, status, ip, user_agent)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       returning id, investor_number`,
      [d.name, d.email, d.phone, d.country, d.assetSlug || null, d.usdcAmount, d.sqft,
       d.walletAddress || null, d.noWallet, d.eligibilitySelfCertified, status, req.ip, req.get("user-agent") || null]
    );

    const rec = { ...d, eligible, status, id: rows[0].id, investorNumber: Number(rows[0].investor_number) };

    // Respond first, then fire the emails off the request path — a slow or
    // failed send must never slow or fail a captured pledge. Excluded pledgers
    // get no investor number back.
    res.status(201).json({ ok: true, id: rec.id, eligible, investorNumber: eligible ? rec.investorNumber : null });

    Promise.allSettled([
      // Only confirm an allocation to eligible pledgers.
      eligible ? sendMail({ to: rec.email, ...pledgeConfirmation(rec) }) : Promise.resolve({ skipped: true }),
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
