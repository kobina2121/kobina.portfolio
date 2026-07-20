import {
  getContactEmailHtml,
  getContactEmailSubject,
  getContactEmailText,
} from "@/emails/contact-notification";
import type { ContactApiErrorCode } from "@/lib/contact-api";
import type { ContactFormValues } from "@/lib/contact-schema";
import { env } from "@/lib/env";

type SendContactEmailOptions = {
  idempotencyKey?: string;
  submittedAt?: Date;
};

type SendContactEmailResult =
  | {
      ok: true;
      messageId?: string;
    }
  | {
      ok: false;
      code: Extract<
        ContactApiErrorCode,
        "EMAIL_NOT_CONFIGURED" | "EMAIL_PROVIDER_ERROR"
      >;
    };

type ResendSendResponse = {
  id?: string;
};

const resendEndpoint = "https://api.resend.com/emails";

function isEmailConfigured() {
  return Boolean(
    env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL && env.CONTACT_TO_EMAIL,
  );
}

export async function sendContactNotificationEmail(
  submission: ContactFormValues,
  options: SendContactEmailOptions = {},
): Promise<SendContactEmailResult> {
  if (!isEmailConfigured()) {
    return {
      ok: false,
      code: "EMAIL_NOT_CONFIGURED",
    };
  }

  const submittedAt = options.submittedAt ?? new Date();
  const submittedAtIso = submittedAt.toISOString();
  const subject = getContactEmailSubject(submission);
  const text = getContactEmailText({
    submission,
    submittedAt: submittedAtIso,
    idempotencyKey: options.idempotencyKey,
  });
  const html = getContactEmailHtml({
    submission,
    submittedAt: submittedAtIso,
    idempotencyKey: options.idempotencyKey,
  });

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(options.idempotencyKey
        ? { "Idempotency-Key": options.idempotencyKey }
        : {}),
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: submission.email,
      subject,
      html,
      text,
      headers: {
        "X-Portfolio-Contact-Type": submission.subject,
      },
    }),
  });

  if (!response.ok) {
    console.error("Contact email provider failed", {
      status: response.status,
      statusText: response.statusText,
    });

    return {
      ok: false,
      code: "EMAIL_PROVIDER_ERROR",
    };
  }

  const payload = (await response
    .json()
    .catch(() => ({}))) as ResendSendResponse;

  return {
    ok: true,
    messageId: payload.id,
  };
}
