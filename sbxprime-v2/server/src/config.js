// Centralised, validated configuration. Fails fast on obvious misconfig.
const {
  PORT = "4000",
  NODE_ENV = "development",
  CORS_ORIGIN = "http://localhost:3005",
  DATABASE_URL = "",
  PGSSLMODE = "disable",
  INVESTOR_NUMBER_START = "121",
  SMTP_HOST = "",
  SMTP_PORT = "587",
  SMTP_SECURE = "false",
  SMTP_USER = "",
  SMTP_PASS = "",
  MAIL_FROM = "SBX Prime <hello@sbxprime.com>",
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
  smtp: {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    user: SMTP_USER,
    pass: SMTP_PASS,
    configured: Boolean(SMTP_HOST),
  },
  mail: { from: MAIL_FROM, team: MAIL_TEAM },
};

if (config.isProd && !config.db.url) {
  throw new Error("DATABASE_URL is required in production.");
}
