import nodemailer from "nodemailer";
import { config } from "../config.js";

// Real SMTP when configured; otherwise a JSON transport that just logs the
// message — so the whole flow works in dev without any credentials.
const transporter = config.smtp.configured
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    })
  : nodemailer.createTransport({ jsonTransport: true });

export async function sendMail({ to, subject, text, html, replyTo }) {
  if (!to) return { skipped: true };
  const info = await transporter.sendMail({ from: config.mail.from, to, replyTo, subject, text, html });
  if (!config.smtp.configured) {
    console.log(`[email:dev] would send "${subject}" -> ${to}`);
  }
  return info;
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
    "Questions? Just reply to this email.",
    "",
    "— The SBX Prime team",
  ].join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0F1F17;line-height:1.6">
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
      <p>Questions? Just reply to this email.</p>
      <p style="color:#5b6b62">— The SBX Prime team</p>
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

export function leadConfirmation(l) {
  const subject = "You're on the SBX Prime list";
  const text = [
    "Thanks for registering your interest in SBX Prime.",
    "",
    "We'll email you when the Central London launch opens for pledges.",
    "",
    "— The SBX Prime team",
  ].join("\n");
  return { subject, text };
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
