import { getPool } from "../src/db.js";
import { hashPassword } from "../src/auth.js";

const [, , email, password, name] = process.argv;
if (!email || !password) {
  console.error("usage: node --env-file=.env scripts/create-admin.js <email> <password> [name]");
  process.exit(1);
}

const pool = getPool();
const hash = await hashPassword(password);
await pool.query(
  `insert into admin_users (email, password_hash, name)
   values ($1, $2, $3)
   on conflict (email) do update set password_hash = excluded.password_hash, name = excluded.name`,
  [email.toLowerCase(), hash, name || null]
);
console.log("admin ready:", email.toLowerCase());
await pool.end();
