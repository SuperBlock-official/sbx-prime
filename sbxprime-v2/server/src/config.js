// Centralised, validated configuration. Fails fast on obvious misconfig.
const {
  PORT = "4000",
  NODE_ENV = "development",
  CORS_ORIGIN = "http://localhost:3005",
  DATABASE_URL = "",
  PGSSLMODE = "disable",
  INVESTOR_NUMBER_START = "121",
  RESEND_API_KEY = "",
  MAIL_FROM = "SBX Prime <no-reply@mail.sbxprime.com>",
  MAIL_REPLY_TO = "",
  MAIL_TEAM = "",
} = process.env;

export const config = {
  port: Number(PORT),
  env: NODE_ENV,
  isProd: NODE_ENV === "production",
  corsOrigins: CORS_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean),
  db: {
    url: DATABASE_URL,
    ssl: PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
  },
  investorNumberStart: Number(INVESTOR_NUMBER_START) || 121,
  resend: {
    key: RESEND_API_KEY,
    configured: Boolean(RESEND_API_KEY),
  },
  mail: { from: MAIL_FROM, replyTo: MAIL_REPLY_TO, team: MAIL_TEAM },
};

if (config.isProd && !config.db.url) {
  throw new Error("DATABASE_URL is required in production.");
}
