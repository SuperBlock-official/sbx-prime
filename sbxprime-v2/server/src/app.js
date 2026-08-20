import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { config } from "./config.js";
import health from "./routes/health.js";
import pledges from "./routes/pledges.js";
import leads from "./routes/leads.js";
import assets from "./routes/assets.js";
import admin from "./routes/admin.js";
import { UPLOAD_ROOT } from "./lib/uploads.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1); // correct req.ip behind a proxy/load balancer
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cookieParser());
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin/server-to-server (no Origin header) and the allowlist.
        if (!origin || config.corsOrigins.includes(origin)) return cb(null, true);
        cb(new Error("Not allowed by CORS"));
      },
    })
  );
  app.use(express.json({ limit: "16kb" }));
  app.use(morgan(config.isProd ? "combined" : "dev"));

  // Throttle the public write endpoints.
  const writeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: "Too many requests, please try again shortly." },
  });

  // Uploaded images, served read-only.
  app.use("/uploads", express.static(UPLOAD_ROOT, { maxAge: "7d", index: false }));

  app.use("/api/health", health);
  app.use("/api/pledges", writeLimiter, pledges);
  app.use("/api/leads", writeLimiter, leads);
  app.use("/api/assets", assets);
  app.use("/api/admin", admin);

  app.use((_req, res) => res.status(404).json({ ok: false, error: "Not found" }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error("[error]", err.message);
    if (err.message === "Not allowed by CORS") {
      return res.status(403).json({ ok: false, error: "Origin not allowed" });
    }
    if (err instanceof multer.MulterError || err.message === "Only image files are allowed") {
      return res.status(400).json({ ok: false, error: err.message });
    }
    res.status(500).json({ ok: false, error: "Something went wrong" });
  });

  return app;
}
