import type { ContactFormErrors } from "@/lib/contact-schema";

export type ContactApiErrorCode =
  | "VALIDATION_ERROR"
  | "MALFORMED_REQUEST"
  | "PAYLOAD_TOO_LARGE"
  | "INVALID_IDEMPOTENCY_KEY"
  | "EMAIL_NOT_CONFIGURED"
  | "EMAIL_PROVIDER_ERROR"
  | "INTERNAL_ERROR";

export type ContactApiSuccessResponse = {
  ok: true;
  code: "CONTACT_SENT";
  messageId?: string;
};

export type ContactApiErrorResponse = {
  ok: false;
  code: ContactApiErrorCode;
  message: string;
  fieldErrors?: ContactFormErrors;
};

export type ContactApiResponse =
  | ContactApiSuccessResponse
  | ContactApiErrorResponse;

export const contactApiErrorMessages: Record<ContactApiErrorCode, string> = {
  VALIDATION_ERROR: "Please check the highlighted fields.",
  MALFORMED_REQUEST: "The message could not be read. Please try again.",
  PAYLOAD_TOO_LARGE: "That message is too large. Please shorten it and retry.",
  INVALID_IDEMPOTENCY_KEY:
    "The request could not be safely processed. Please refresh and retry.",
  EMAIL_NOT_CONFIGURED:
    "Email delivery is not configured yet. Please use the email draft fallback.",
  EMAIL_PROVIDER_ERROR:
    "Email delivery is temporarily unavailable. Please try again or use the email draft fallback.",
  INTERNAL_ERROR:
    "Something went wrong while sending. Please try again or email directly.",
};

export function getContactApiErrorResponse(
  code: ContactApiErrorCode,
  fieldErrors?: ContactFormErrors,
): ContactApiErrorResponse {
  return {
    ok: false,
    code,
    message: contactApiErrorMessages[code],
    ...(fieldErrors ? { fieldErrors } : {}),
  };
}
