import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ContactFormValues } from "@/lib/contact-schema";

const sendContactNotificationEmail = vi.fn();

vi.mock("@/lib/email/resend", () => ({
  sendContactNotificationEmail,
}));

const validSubmission: ContactFormValues = {
  name: "Kobina Boakye",
  email: "kobina@example.com",
  subject: "project",
  budget: "1k-3k",
  message: "I want to build a polished product landing page this month.",
  consent: true,
};

function createContactRequest(body: unknown, idempotencyKey: string) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendContactNotificationEmail.mockReset();
  });

  it("sends valid submissions", async () => {
    sendContactNotificationEmail.mockResolvedValueOnce({
      ok: true,
      messageId: "email_123",
    });
    const { POST } = await import("@/app/api/contact/route");

    const response = await POST(
      createContactRequest(validSubmission, "success-key-123") as never,
    );

    await expect(response.json()).resolves.toEqual({
      ok: true,
      code: "CONTACT_SENT",
      messageId: "email_123",
    });
    expect(response.status).toBe(200);
    expect(sendContactNotificationEmail).toHaveBeenCalledWith(validSubmission, {
      idempotencyKey: "success-key-123",
    });
  });

  it("returns field errors for invalid submissions", async () => {
    const { POST } = await import("@/app/api/contact/route");

    const response = await POST(
      createContactRequest(
        {
          ...validSubmission,
          email: "not-an-email",
          message: "too short",
        },
        "validation-key-123",
      ) as never,
    );
    const payload = await response.json();

    expect(response.status).toBe(422);
    expect(payload).toMatchObject({
      ok: false,
      code: "VALIDATION_ERROR",
      fieldErrors: {
        email: "Please enter a valid email address.",
        message: "Share at least 20 characters so I have enough context.",
      },
    });
    expect(sendContactNotificationEmail).not.toHaveBeenCalled();
  });

  it("returns stable provider failures", async () => {
    sendContactNotificationEmail.mockResolvedValueOnce({
      ok: false,
      code: "EMAIL_PROVIDER_ERROR",
    });
    const { POST } = await import("@/app/api/contact/route");

    const response = await POST(
      createContactRequest(validSubmission, "provider-key-123") as never,
    );

    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      code: "EMAIL_PROVIDER_ERROR",
    });
    expect(response.status).toBe(503);
  });

  it("replays successful submissions with the same idempotency key", async () => {
    sendContactNotificationEmail.mockResolvedValueOnce({
      ok: true,
      messageId: "email_replay",
    });
    const { POST } = await import("@/app/api/contact/route");
    const idempotencyKey = "replay-key-123";

    const firstResponse = await POST(
      createContactRequest(validSubmission, idempotencyKey) as never,
    );
    const secondResponse = await POST(
      createContactRequest(validSubmission, idempotencyKey) as never,
    );

    await expect(firstResponse.json()).resolves.toEqual({
      ok: true,
      code: "CONTACT_SENT",
      messageId: "email_replay",
    });
    await expect(secondResponse.json()).resolves.toEqual({
      ok: true,
      code: "CONTACT_SENT",
      messageId: "email_replay",
    });
    expect(secondResponse.headers.get("Idempotency-Status")).toBe("replayed");
    expect(sendContactNotificationEmail).toHaveBeenCalledTimes(1);
  });
});
