import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPool } from "../src/db.js";
import { config } from "../src/config.js";

const here = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const pool = getPool();
  const sql = await readFile(path.join(here, "../db/schema.sql"), "utf8");
  await pool.query(sql);
  console.log("schema applied");

  // Seed the investor-number sequence only on a fresh install.
  const { rows } = await pool.query("select count(*)::int as n from pledges");
  if (rows[0].n === 0) {
    const start = Math.max(1, Math.trunc(config.investorNumberStart));
    await pool.query(`alter sequence investor_number_seq restart with ${start}`);
    console.log(`investor_number_seq starts at ${start}`);
  }

  console.log("migration complete");
  await pool.end();
}

main().catch((err) => {
  console.error("migration failed:", err.message);
  process.exit(1);
});
