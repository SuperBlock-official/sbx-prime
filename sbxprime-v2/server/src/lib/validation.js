import { z } from "zod";

// Shared primitives
const email = z.string().trim().toLowerCase().email().max(254);
const name = z.string().trim().min(1).max(120);
const country = z.string().trim().min(2).max(80);

export const pledgeSchema = z.object({
  name,
  email,
  country,
  assetSlug: z.string().trim().max(80).optional().nullable(),
  usdcAmount: z.coerce.number().nonnegative().max(1_000_000_000).default(0),
  sqft: z.coerce.number().int().nonnegative().max(10_000_000).default(0),
  eligibilitySelfCertified: z.coerce.boolean().refine((v) => v === true, {
    message: "Eligibility self-certification is required.",
  }),
});

export const leadSchema = z.object({
  email,
  name: name.optional().nullable(),
  source: z.string().trim().max(80).optional().nullable(),
  meta: z.record(z.any()).optional().default({}),
});

// Turns a ZodError into a compact { field: message } map for the client.
export function fieldErrors(err) {
  const out = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
