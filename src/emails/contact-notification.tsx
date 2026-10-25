import type { ContactFormValues } from "@/lib/contact-schema";

const subjectLabels: Record<ContactFormValues["subject"], string> = {
  project: "Project inquiry",
  collaboration: "Collaboration",
  question: "General question",
};

const budgetLabels: Record<ContactFormValues["budget"], string> = {
  "": "Not sure yet",
  "under-1k": "Under $1,000",
  "1k-3k": "$1,000 – $3,000",
  "3k-plus": "$3,000+",
};

type ContactNotificationEmailProps = {
  submission: ContactFormValues;
  submittedAt: string;
  idempotencyKey?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getContactEmailSubject(submission: ContactFormValues) {
  return `Portfolio contact: ${subjectLabels[submission.subject]} from ${submission.name}`;
}

export function getContactEmailText({
  submission,
  submittedAt,
  idempotencyKey,
}: ContactNotificationEmailProps) {
  return [
    "New portfolio contact submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Type: ${subjectLabels[submission.subject]}`,
    `Budget: ${budgetLabels[submission.budget]}`,
    `Submitted: ${submittedAt}`,
    idempotencyKey ? `Idempotency key: ${idempotencyKey}` : null,
    "",
    "Message:",
    submission.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function getContactEmailHtml({
  submission,
  submittedAt,
  idempotencyKey,
}: ContactNotificationEmailProps) {
  return `<!doctype html>
<main style="background-color:#050505;color:#f8fafc;font-family:Montserrat,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:32px;">
  <section style="border:1px solid rgba(255,255,255,0.18);border-radius:24px;margin:0 auto;max-width:640px;padding:28px;">
    <p style="color:#a1a1aa;font-size:12px;font-weight:700;letter-spacing:0.08em;margin:0 0 12px;text-transform:uppercase;">Portfolio contact</p>
    <h1 style="font-size:28px;line-height:1.2;margin:0 0 24px;">${escapeHtml(
      submission.name,
    )} sent a ${escapeHtml(subjectLabels[submission.subject])}.</h1>
    <dl style="display:grid;gap:14px;margin:0;">
      <div>
        <dt style="color:#a1a1aa;font-size:12px;">Reply to</dt>
        <dd style="margin:4px 0 0;">${escapeHtml(submission.email)}</dd>
      </div>
      <div>
        <dt style="color:#a1a1aa;font-size:12px;">Budget</dt>
        <dd style="margin:4px 0 0;">${escapeHtml(
          budgetLabels[submission.budget],
        )}</dd>
      </div>
      <div>
        <dt style="color:#a1a1aa;font-size:12px;">Submitted</dt>
        <dd style="margin:4px 0 0;">${escapeHtml(submittedAt)}</dd>
      </div>
      ${
        idempotencyKey
          ? `<div>
        <dt style="color:#a1a1aa;font-size:12px;">Idempotency key</dt>
        <dd style="margin:4px 0 0;">${escapeHtml(idempotencyKey)}</dd>
      </div>`
          : ""
      }
    </dl>
    <div style="background-color:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:18px;margin-top:26px;padding:20px;white-space:pre-wrap;">${escapeHtml(
      submission.message,
    )}</div>
  </section>
</main>`;
}

export function ContactNotificationEmail({
  submission,
  submittedAt,
  idempotencyKey,
}: ContactNotificationEmailProps) {
  return (
    <main
      style={{
        backgroundColor: "#050505",
        color: "#f8fafc",
        fontFamily:
          'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: "32px",
      }}
    >
      <section
        style={{
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "24px",
          margin: "0 auto",
          maxWidth: "640px",
          padding: "28px",
        }}
      >
        <p
          style={{
            color: "#a1a1aa",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            margin: "0 0 12px",
            textTransform: "uppercase",
          }}
        >
          Portfolio contact
        </p>
        <h1 style={{ fontSize: "28px", lineHeight: 1.2, margin: "0 0 24px" }}>
          {submission.name} sent a {subjectLabels[submission.subject]}.
        </h1>

        <dl style={{ display: "grid", gap: "14px", margin: 0 }}>
          <div>
            <dt style={{ color: "#a1a1aa", fontSize: "12px" }}>Reply to</dt>
            <dd style={{ margin: "4px 0 0" }}>{submission.email}</dd>
          </div>
          <div>
            <dt style={{ color: "#a1a1aa", fontSize: "12px" }}>Budget</dt>
            <dd style={{ margin: "4px 0 0" }}>
              {budgetLabels[submission.budget]}
            </dd>
          </div>
          <div>
            <dt style={{ color: "#a1a1aa", fontSize: "12px" }}>Submitted</dt>
            <dd style={{ margin: "4px 0 0" }}>{submittedAt}</dd>
          </div>
          {idempotencyKey ? (
            <div>
              <dt style={{ color: "#a1a1aa", fontSize: "12px" }}>
                Idempotency key
              </dt>
              <dd style={{ margin: "4px 0 0" }}>{idempotencyKey}</dd>
            </div>
          ) : null}
        </dl>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "18px",
            marginTop: "26px",
            padding: "20px",
            whiteSpace: "pre-wrap",
          }}
        >
          {submission.message}
        </div>
      </section>
    </main>
  );
}
