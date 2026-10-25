// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

async function loadAuth(env: Record<string, string>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    vi.stubEnv(key, value);
  }
  return import("@/lib/admin/auth");
}

const configuredEnv = {
  ADMIN_EMAIL: "owner@example.com",
  ADMIN_PASSWORD: "correct horse battery staple",
  ADMIN_SESSION_SECRET: "a".repeat(32),
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("admin credentials", () => {
  it("accepts only the configured admin email and password", async () => {
    const { verifyAdminCredentials } = await loadAuth(configuredEnv);

    expect(
      verifyAdminCredentials(
        " Owner@Example.com ",
        configuredEnv.ADMIN_PASSWORD,
      ),
    ).toBe(true);
    expect(
      verifyAdminCredentials(
        "someone@example.com",
        configuredEnv.ADMIN_PASSWORD,
      ),
    ).toBe(false);
    expect(verifyAdminCredentials("owner@example.com", "wrong")).toBe(false);
  });

  it("stays locked until email, password, and secret are all set", async () => {
    const { isAdminAuthConfigured, verifyAdminCredentials } = await loadAuth({
      ...configuredEnv,
      ADMIN_EMAIL: "",
    });

    expect(isAdminAuthConfigured()).toBe(false);
    expect(verifyAdminCredentials("", configuredEnv.ADMIN_PASSWORD)).toBe(
      false,
    );
  });

  it("rejects a session secret that is too short", async () => {
    const { isAdminAuthConfigured } = await loadAuth({
      ...configuredEnv,
      ADMIN_SESSION_SECRET: "short",
    });

    expect(isAdminAuthConfigured()).toBe(false);
  });
});
