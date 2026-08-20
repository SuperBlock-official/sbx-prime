import { createApp } from "./app.js";
import { config } from "./config.js";
import { healthy } from "./db.js";

const app = createApp();

const server = app.listen(config.port, async () => {
  const db = await healthy();
  console.log(`SBX Prime API on http://localhost:${config.port} (${config.env})`);
  console.log(`  db:   ${db ? "connected" : "NOT connected — set DATABASE_URL and run `npm run migrate`"}`);
  console.log(`  mail: ${config.resend.configured ? `Resend (${config.mail.from})` : "console (dev) — set RESEND_API_KEY to send real email"}`);
});

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    console.log(`\n${sig} received, shutting down.`);
    server.close(() => process.exit(0));
  });
}
