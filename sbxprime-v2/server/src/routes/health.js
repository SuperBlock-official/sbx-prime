import { Router } from "express";
import { healthy } from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  const db = await healthy();
  res.json({ ok: true, db, time: new Date().toISOString() });
});

export default router;
