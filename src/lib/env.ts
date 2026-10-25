import "server-only";

import { z } from "zod";

const emptyStringToUndefined = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().optional(),
);

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: emptyStringToUndefined,
  TURNSTILE_SECRET_KEY: emptyStringToUndefined,
  ADMIN_EMAIL: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.email().optional(),
  ),
  ADMIN_PASSWORD: emptyStringToUndefined,
  ADMIN_SESSION_SECRET: emptyStringToUndefined,
});

export const env = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
});
