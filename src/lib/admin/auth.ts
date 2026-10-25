import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";

const SESSION_COOKIE = "portfolio_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const ADMIN_SESSION_SECRET_MIN_LENGTH = 32;

export function isAdminAuthConfigured() {
  return Boolean(
    env.ADMIN_EMAIL &&
    env.ADMIN_PASSWORD &&
    env.ADMIN_SESSION_SECRET &&
    env.ADMIN_SESSION_SECRET.length >= ADMIN_SESSION_SECRET_MIN_LENGTH,
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// Signing the admin email too means changing ADMIN_EMAIL signs everyone out.
function sign(expiresAt: string) {
  return createHmac("sha256", env.ADMIN_SESSION_SECRET ?? "")
    .update(`${expiresAt}.${normalizeEmail(env.ADMIN_EMAIL ?? "")}`)
    .digest("base64url");
}

// Hashing both sides first gives equal-length buffers for timingSafeEqual.
function safeEqual(a: string, b: string) {
  return timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );
}

/** Only the single ADMIN_EMAIL account, with ADMIN_PASSWORD, can sign in. */
export function verifyAdminCredentials(email: string, password: string) {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  // Compare both before deciding so timing does not reveal which was wrong.
  const emailMatches = safeEqual(
    normalizeEmail(email),
    normalizeEmail(env.ADMIN_EMAIL ?? ""),
  );
  const passwordMatches = safeEqual(password, env.ADMIN_PASSWORD ?? "");

  return emailMatches && passwordMatches;
}

/**
 * Sessions are a signed expiry timestamp. Rotating ADMIN_SESSION_SECRET or
 * changing ADMIN_EMAIL signs everyone out.
 */
export async function createAdminSession() {
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  (await cookies()).set(SESSION_COOKIE, `${expiresAt}.${sign(expiresAt)}`, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
}

export async function isAdminAuthenticated() {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  const [expiresAt, signature] = value?.split(".") ?? [];

  if (!expiresAt || !signature) {
    return false;
  }

  return (
    safeEqual(signature, sign(expiresAt)) && Number(expiresAt) > Date.now()
  );
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
