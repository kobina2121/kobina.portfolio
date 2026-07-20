import { NextRequest, NextResponse } from "next/server";

import {
  ContactApiSuccessResponse,
  getContactApiErrorResponse,
  type ContactApiResponse,
} from "@/lib/contact-api";
import { contactFormSchema, getContactFieldErrors } from "@/lib/contact-schema";
import { sendContactNotificationEmail } from "@/lib/email/resend";

export const runtime = "nodejs";

const maxPayloadBytes = 12_000;
const idempotencyTtlMs = 10 * 60 * 1000;
const idempotencyKeyPattern = /^[A-Za-z0-9._:-]{8,256}$/;

type IdempotencyRecord = {
  expiresAt: number;
  response: ContactApiSuccessResponse;
};

const idempotencyStore = new Map<string, IdempotencyRecord>();

function jsonResponse(response: ContactApiResponse, status: number) {
  return NextResponse.json(response, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function cleanExpiredIdempotencyRecords(now = Date.now()) {
  for (const [key, record] of idempotencyStore.entries()) {
    if (record.expiresAt <= now) {
      idempotencyStore.delete(key);
    }
  }
}

function getIdempotencyKey(request: NextRequest) {
  const value = request.headers.get("Idempotency-Key")?.trim();

  if (!value) {
    return undefined;
  }

  return value;
}

export async function POST(request: NextRequest) {
  cleanExpiredIdempotencyRecords();

  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (Number.isFinite(contentLength) && contentLength > maxPayloadBytes) {
    return jsonResponse(getContactApiErrorResponse("PAYLOAD_TOO_LARGE"), 413);
  }

  const idempotencyKey = getIdempotencyKey(request);

  if (idempotencyKey && !idempotencyKeyPattern.test(idempotencyKey)) {
    return jsonResponse(
      getContactApiErrorResponse("INVALID_IDEMPOTENCY_KEY"),
      400,
    );
  }

  if (idempotencyKey) {
    const replay = idempotencyStore.get(idempotencyKey);

    if (replay && replay.expiresAt > Date.now()) {
      return NextResponse.json(replay.response, {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Idempotency-Status": "replayed",
        },
      });
    }
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(getContactApiErrorResponse("MALFORMED_REQUEST"), 400);
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return jsonResponse(
      getContactApiErrorResponse(
        "VALIDATION_ERROR",
        getContactFieldErrors(parsed.error),
      ),
      422,
    );
  }

  try {
    const result = await sendContactNotificationEmail(parsed.data, {
      idempotencyKey,
    });

    if (!result.ok) {
      return jsonResponse(getContactApiErrorResponse(result.code), 503);
    }

    const response: ContactApiSuccessResponse = {
      ok: true,
      code: "CONTACT_SENT",
      ...(result.messageId ? { messageId: result.messageId } : {}),
    };

    if (idempotencyKey) {
      idempotencyStore.set(idempotencyKey, {
        expiresAt: Date.now() + idempotencyTtlMs,
        response,
      });
    }

    return jsonResponse(response, 200);
  } catch (error) {
    console.error("Contact route failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });

    return jsonResponse(getContactApiErrorResponse("INTERNAL_ERROR"), 500);
  }
}
