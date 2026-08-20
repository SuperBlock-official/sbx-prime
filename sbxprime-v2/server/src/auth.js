import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config.js";

const TOKEN_TTL = "12h";

export function hashPassword(plain) {
  return bcrypt.hash(plain, 12);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function signToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email }, config.auth.jwtSecret, {
    expiresIn: TOKEN_TTL,
  });
}

export function setAuthCookie(res, token) {
  res.cookie(config.auth.cookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.isProd,
    maxAge: 12 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(config.auth.cookie, { path: "/" });
}

// Guard for /api/admin/* — accepts the httpOnly cookie or a Bearer token.
export function requireAdmin(req, res, next) {
  const bearer = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  const token = req.cookies?.[config.auth.cookie] || bearer;
  if (!token) return res.status(401).json({ ok: false, error: "Not authenticated" });
  try {
    req.admin = jwt.verify(token, config.auth.jwtSecret);
    next();
  } catch {
    res.status(401).json({ ok: false, error: "Session expired" });
  }
}
