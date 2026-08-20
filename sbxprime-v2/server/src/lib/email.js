import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.js";

// The company's physical postal address — required in the footer of every email.
export const POSTAL_ADDRESS =
  "SBX Prime by SUPERBLOCK · 85 Great Portland Street, First Floor, London W1W 7LT, United Kingdom";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Load the logo once and embed it inline via CID (Gmail/Outlook strip data:
// URIs and inline SVG, but render cid: attachments). Referenced as
// <img src="cid:sbx-logo"> in the HTML templates below.
const LOGO_CID = "sbx-logo";
const logoAttachment = loadLogo();

function loadLogo() {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const content = readFileSync(path.join(here, "../../assets/email-logo.png")).toString("base64");
    return { filename: "sbx-prime.png", content, content_id: LOGO_CID, content_type: "image/png" };
  } catch (err) {
    console.warn("[email] logo not loaded:", err.message);
    return null;
  }
}

/**
 * Send one transactional email via the Resend HTTP API (server-side only —
 * the API key lives in env and never reaches the browser). Returns the Resend
 * message id on success. Only ever call with an address the user submitted.
 *
 * When RESEND_API_KEY is unset (local dev), it logs instead of sending, so the
 * whole flow works with zero credentials.
 */
export async function sendMail({ to, subject, text, html, replyTo }) {
  if (!to) return { skipped: true };

  if (!config.resend.configured) {
    console.log(`[email:dev] would send "${subject}" -> ${to}`);
    return { skipped: true, dev: true };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.resend.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.mail.from,
        to,
        subject,
        html,
        text,
        ...(replyTo || config.mail.replyTo ? { reply_to: replyTo || config.mail.replyTo } : {}),
        // Inline the logo only when there's an HTML body that references it.
        ...(html && logoAttachment ? { attachments: [logoAttachment] } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[email] resend failed ${res.status} for "${subject}" -> ${to}: ${body}`);
      return { ok: false, status: res.status };
    }

    const data = await res.json().catch(() => ({}));
    console.log(`[email] sent "${subject}" -> ${to} (resend id ${data.id || "?"})`);
    return { ok: true, id: data.id };
  } catch (err) {
    console.error(`[email] resend error for "${subject}" -> ${to}: ${err.message}`);
    return { ok: false, error: err.message };
  }
}

const money = (n) => "$" + Math.round(Number(n || 0)).toLocaleString("en-US");

// ---- Templates -------------------------------------------------------------

export function pledgeConfirmation(p) {
  const sqft = Number(p.sqft || 0).toLocaleString("en-US");
  const subject = "Your SBX Prime pledge is reserved";
  const text = [
    `Hi ${p.name.split(" ")[0] || "there"},`,
    "",
    `Your pledge is in. You've reserved ${sqft} sq ft (~${money(p.usdcAmount)} USDC) in the Central London launch as investor #${p.investorNumber}.`,
    "",
    "What happens next:",
    "• Nothing moves today — this reserves your allocation only.",
    "• Verification (KYC) opens before the raise closes; we'll email you when it does.",
    "• You can amend or withdraw any time before allocation closes.",
    "",
    "Questions? Visit sbxprime.com.",
    "",
    "— The SBX Prime team",
    "",
    "—",
    "This message was sent from a send-only address; please do not reply.",
    POSTAL_ADDRESS,
  ].join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0F1F17;line-height:1.6">
      ${headerHtml()}
      <p>Hi ${escapeHtml(p.name.split(" ")[0] || "there")},</p>
      <p>Your pledge is in. You've reserved <strong>${sqft} sq ft</strong>
      (~${money(p.usdcAmount)} USDC) in the Central London launch as
      <strong>investor #${p.investorNumber}</strong>.</p>
      <p><strong>What happens next</strong></p>
      <ul>
        <li>Nothing moves today — this reserves your allocation only.</li>
        <li>Verification (KYC) opens before the raise closes; we'll email you when it does.</li>
        <li>You can amend or withdraw any time before allocation closes.</li>
      </ul>
      <p>Questions? Visit <a href="https://www.sbxprime.com" style="color:#0F8746">sbxprime.com</a>.</p>
      <p style="color:#5b6b62">— The SBX Prime team</p>
      ${footerHtml()}
    </div>`;
  return { subject, text, html };
}

export function pledgeTeamNotice(p) {
  const sqft = Number(p.sqft || 0).toLocaleString("en-US");
  const subject = `New pledge · #${p.investorNumber} · ${p.name}`;
  const text = [
    `New pledge received (investor #${p.investorNumber})`,
    "",
    `Name:    ${p.name}`,
    `Email:   ${p.email}`,
    `Country: ${p.country}`,
    `Asset:   ${p.assetSlug || "—"}`,
    `Amount:  ${money(p.usdcAmount)} USDC`,
    `Sq ft:   ${sqft}`,
    `Pledge id: ${p.id}`,
  ].join("\n");
  return { subject, text };
}

export function leadConfirmation(_l) {
  const subject = "You're on the SBX Prime list";
  const text = [
    "Thanks for registering your interest in SBX Prime.",
    "",
    "We'll email you when the Central London launch opens for pledges.",
    "",
    "— The SBX Prime team",
    "",
    "—",
    "This message was sent from a send-only address; please do not reply.",
    POSTAL_ADDRESS,
  ].join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0F1F17;line-height:1.6">
      ${headerHtml()}
      <p>Thanks for registering your interest in SBX Prime.</p>
      <p>We'll email you when the Central London launch opens for pledges.</p>
      <p style="color:#5b6b62">— The SBX Prime team</p>
      ${footerHtml()}
    </div>`;
  return { subject, text, html };
}

function headerHtml() {
  // Falls back to the alt text if the client blocks the inline image.
  return logoAttachment
    ? `<img src="cid:${LOGO_CID}" alt="SBX Prime" width="104" style="display:block;height:auto;margin:0 0 20px" />`
    : `<p style="font-weight:700;color:#0F8746;margin:0 0 20px">SBX Prime</p>`;
}

function footerHtml() {
  return `<hr style="border:none;border-top:1px solid #e2ece7;margin:20px 0" />
      <p style="font-size:12px;color:#8a988f">This message was sent from a send-only address; please do not reply.<br />${escapeHtml(POSTAL_ADDRESS)}</p>`;
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
