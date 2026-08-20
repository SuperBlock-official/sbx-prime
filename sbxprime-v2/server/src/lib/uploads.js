import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { config } from "../config.js";

const uploadRoot = path.resolve(config.uploads.dir);
fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadRoot),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, "");
    const base = path
      .basename(file.originalname, path.extname(file.originalname))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
    cb(null, `${Date.now()}-${base || "image"}${ext || ".jpg"}`);
  },
});

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export const uploadImage = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (_req, file, cb) =>
    IMAGE_TYPES.has(file.mimetype) ? cb(null, true) : cb(new Error("Only image files are allowed")),
});

export const UPLOAD_ROOT = uploadRoot;

// Public URL for a stored file — absolute if PUBLIC_URL is set, else relative.
export function fileUrl(filename) {
  const base = config.uploads.publicUrl.replace(/\/$/, "");
  return `${base}/uploads/${filename}`;
}
