# SBX Prime — Backend

Node + Express + Postgres API. **Milestone 1:** pledge & lead capture with
confirmation emails. Auth/2FA, KYC, and the asset-management admin are later
milestones (the schema and structure are built to grow into them).

## Prerequisites

- Node 18.11+ (uses the built-in `--env-file` and `--watch` flags)
- PostgreSQL 14+

## Setup

```bash
cd server
cp .env.example .env          # then edit DATABASE_URL (and SMTP_* to send real mail)
createdb sbxprime             # or point DATABASE_URL at any Postgres
npm install
npm run migrate               # creates tables + seeds the investor-number sequence
npm run dev                   # http://localhost:4000
```

Email sends via the **Resend** HTTP API (server-side only — the key never
reaches the browser, and sends fire off the request path, after the HTTP
response). Without `RESEND_API_KEY` set, emails are printed to the console
instead of sent, so the whole flow works locally with zero credentials.

Sender domain must be verified in Resend (Domains → Add `sbxprime.com` or a
send-only subdomain like `mail.sbxprime.com`, add the SPF/DKIM/DMARC DNS
records, wait for "Verified"). Until then you may send from the already-verified
`SUPERBLOCK <no-reply@mail.superblock.ai>`.

## Endpoints

| Method | Path | Body | Purpose |
| --- | --- | --- | --- |
| GET  | `/api/health`  | — | Liveness + DB check |
| POST | `/api/pledges` | `{ name, email, country, assetSlug?, usdcAmount, sqft, eligibilitySelfCertified }` | Capture a pledge; assigns an investor number, emails the pledger + team |
| POST | `/api/leads`   | `{ email, name?, source?, meta? }` | Capture a lead / interest registration |

All write endpoints are rate-limited (30 requests / 15 min / IP) and validated
with zod. Responses are `{ ok, ... }`; validation failures return `422` with a
`{ errors: { field: message } }` map.

## Frontend wiring

The Vite app calls these via `src/lib/api.js`, using `VITE_API_URL` (defaults to
`/api`). In dev, `vite.config.js` proxies `/api` → `http://localhost:4000`.

## Deploy notes

- Set `DATABASE_URL`, `CORS_ORIGIN` (the site's real origin), and `SMTP_*`.
- Set `PGSSLMODE=require` for most managed Postgres providers.
- Run `npm run migrate` on deploy; `npm start` to serve.
