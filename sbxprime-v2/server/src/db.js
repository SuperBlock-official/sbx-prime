import pg from "pg";
import { config } from "./config.js";

// Numeric columns come back as strings from pg by default; parse the ones we
// control (numeric OID 1700) to Number so JSON responses are clean.
pg.types.setTypeParser(1700, (v) => (v === null ? null : Number(v)));

let pool = null;

export function getPool() {
  if (!config.db.url) {
    throw new Error("DATABASE_URL is not set — cannot reach the database.");
  }
  if (!pool) {
    pool = new pg.Pool({
      connectionString: config.db.url,
      ssl: config.db.ssl,
      max: 10,
      idleTimeoutMillis: 30_000,
    });
    pool.on("error", (err) => console.error("[db] idle client error:", err.message));
  }
  return pool;
}

export function query(text, params) {
  return getPool().query(text, params);
}

export async function healthy() {
  if (!config.db.url) return false;
  try {
    await query("select 1");
    return true;
  } catch {
    return false;
  }
}
