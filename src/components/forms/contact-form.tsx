"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackPortfolioEvent } from "@/lib/analytics/events";
import { contactEmail } from "@/lib/contact-details";
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  contactBudgetOptions,
  contactFormSchema,
  contactSubjectOptions,
  getContactMailtoHref,
  getContactFieldErrors,
  getInitialContactFormValues,
  type ContactFormErrors,
  type ContactFormField,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

function getFieldErrors(values: ContactFormValues): ContactFormErrors {
  const parsed = contactFormSchema.safeParse(values);

  if (parsed.success) {
    return {};
  }

  return getContactFieldErrors(parsed.error);
}

function getDescriptionIds(field: ContactFormField, hasError: boolean) {
  return cn(`${field}-description`, hasError && `${field}-error`);
}

export function ContactForm({ email = contactEmail }: { email?: string }) {
  const [values, setValues] = useState<ContactFormValues>(() =>
    getInitialContactFormValues(),
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [draftState, setDraftState] = useState<"idle" | "opening" | "opened">(
    "idle",
  );
  const hasOpenedDraft = draftState !== "idle";
  const messageCharactersRemaining =
    CONTACT_MESSAGE_MAX_LENGTH - values.message.length;

  const mailtoHref = getContactMailtoHref(email, values);

  function updateField<Field extends ContactFormField>(
    field: Field,
    value: ContactFormValues[Field],
  ) {
    const nextValues = {
      ...values,
      [field]: value,
    };

    setValues(nextValues);

    if (errors[field]) {
      const nextErrors = getFieldErrors(nextValues);
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: nextErrors[field],
      }));
    }
  }

  function validateField(field: ContactFormField) {
    const nextErrors = getFieldErrors(values);
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: nextErrors[field],
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactFormSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(getFieldErrors(values));
      toast.error("Please check the highlighted fields.");
      return;
    }

    setValues(parsed.data);
    setErrors({});
    setDraftState("opening");
    trackPortfolioEvent("contact_draft_opened", {
      source: "homepage-contact",
    });

    // Handing the draft to the email app can take a moment and blocks the
    // page meanwhile, so paint the confirmation first, then open the draft.
    const draftHref = getContactMailtoHref(email, parsed.data);
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        window.location.href = draftHref;
        window.setTimeout(() => setDraftState("opened"), 1500);
      }, 0);
    });
  }

  return (
    <div className="border border-zinc-950/20 bg-white/85 p-4 shadow-[0_22px_60px_rgba(24,24,27,0.08)] dark:border-white/35 dark:bg-black/80">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
            Message me here
          </h3>
          <p className="mt-2 text-xs leading-5 text-zinc-700 dark:text-zinc-400">
            Fill this in and your email app opens with the message ready to
            send.
          </p>
        </div>
      </div>

      {hasOpenedDraft ? (
        <p
          role="status"
          className="mb-4 border border-zinc-950/20 bg-zinc-950/[0.04] px-3 py-2 text-xs leading-5 text-zinc-800 dark:border-white/25 dark:bg-white/[0.06] dark:text-zinc-200"
        >
          Your email app should open with the message ready to send. If it
          didn&apos;t, email me directly at {email}.
        </p>
      ) : null}

      <form noValidate className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="contact-name"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Your name
            </Label>
            <Input
              id="contact-name"
              name="name"
              value={values.name}
              maxLength={80}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={getDescriptionIds("name", Boolean(errors.name))}
              placeholder="Your full name"
              className="h-11 rounded-none border-zinc-950/20 bg-white text-xs text-zinc-950 dark:border-white/20 dark:bg-black dark:text-white"
              onBlur={() => validateField("name")}
              onChange={(event) => updateField("name", event.target.value)}
            />
            <p
              id="name-description"
              className="text-[11px] text-zinc-600 dark:text-zinc-500"
            >
              Use the name I should reply to.
            </p>
            {errors.name ? (
              <p
                id="name-error"
                role="alert"
                className="text-[11px] text-red-600 dark:text-red-300"
              >
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact-email"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Email address
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              maxLength={120}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={getDescriptionIds(
                "email",
                Boolean(errors.email),
              )}
              placeholder="you@example.com"
              className="h-11 rounded-none border-zinc-950/20 bg-white text-xs text-zinc-950 dark:border-white/20 dark:bg-black dark:text-white"
              onBlur={() => validateField("email")}
              onChange={(event) => updateField("email", event.target.value)}
            />
            <p
              id="email-description"
              className="text-[11px] text-zinc-600 dark:text-zinc-500"
            >
              I’ll only use this to respond to your message.
            </p>
            {errors.email ? (
              <p
                id="email-error"
                role="alert"
                className="text-[11px] text-red-600 dark:text-red-300"
              >
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="contact-subject"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Message type
            </Label>
            <select
              id="contact-subject"
              name="subject"
              value={values.subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={getDescriptionIds(
                "subject",
                Boolean(errors.subject),
              )}
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 h-11 w-full border border-zinc-950/20 bg-white px-3 py-1 text-xs text-zinc-950 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] dark:border-white/20 dark:bg-black dark:text-white"
              onBlur={() => validateField("subject")}
              onChange={(event) =>
                updateField(
                  "subject",
                  event.target.value as ContactFormValues["subject"],
                )
              }
            >
              {contactSubjectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p
              id="subject-description"
              className="text-[11px] text-zinc-600 dark:text-zinc-500"
            >
              Helps route the conversation.
            </p>
            {errors.subject ? (
              <p
                id="subject-error"
                role="alert"
                className="text-[11px] text-red-600 dark:text-red-300"
              >
                {errors.subject}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact-budget"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Budget range
              <span className="font-normal text-zinc-500"> optional</span>
            </Label>
            <select
              id="contact-budget"
              name="budget"
              value={values.budget}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={getDescriptionIds(
                "budget",
                Boolean(errors.budget),
              )}
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 h-11 w-full border border-zinc-950/20 bg-white px-3 py-1 text-xs text-zinc-950 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] dark:border-white/20 dark:bg-black dark:text-white"
              onBlur={() => validateField("budget")}
              onChange={(event) =>
                updateField(
                  "budget",
                  event.target.value as ContactFormValues["budget"],
                )
              }
            >
              {contactBudgetOptions.map((option) => (
                <option key={option.value || "unset"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p
              id="budget-description"
              className="text-[11px] text-zinc-600 dark:text-zinc-500"
            >
              A rough range is enough if you have one.
            </p>
            {errors.budget ? (
              <p
                id="budget-error"
                role="alert"
                className="text-[11px] text-red-600 dark:text-red-300"
              >
                {errors.budget}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="contact-message"
            className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Project details
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            value={values.message}
            maxLength={CONTACT_MESSAGE_MAX_LENGTH}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={getDescriptionIds(
              "message",
              Boolean(errors.message),
            )}
            placeholder="Tell me what you want to build, the timeline, and any links that help..."
            className="min-h-36 resize-none rounded-none border-zinc-950/20 bg-white text-xs text-zinc-950 dark:border-white/20 dark:bg-black dark:text-white"
            onBlur={() => validateField("message")}
            onChange={(event) => updateField("message", event.target.value)}
          />
          <div className="flex items-center justify-between gap-3 text-[11px] text-zinc-600 dark:text-zinc-500">
            <p id="message-description">
              Minimum 20 characters. Keep sensitive details out for now.
            </p>
            <p aria-live="polite">{messageCharactersRemaining} left</p>
          </div>
          {errors.message ? (
            <p
              id="message-error"
              role="alert"
              className="text-[11px] text-red-600 dark:text-red-300"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="flex items-start gap-3 text-xs leading-5 text-zinc-700 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={values.consent}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={getDescriptionIds(
                "consent",
                Boolean(errors.consent),
              )}
              className="accent-accent-brand mt-1 size-4 shrink-0"
              onBlur={() => validateField("consent")}
              onChange={(event) => updateField("consent", event.target.checked)}
            />
            <span id="consent-description">
              I agree that Kobina can use these details to respond to this
              message. No mailing list, no resale, no funny business.
            </span>
          </label>
          {errors.consent ? (
            <p
              id="consent-error"
              role="alert"
              className="text-[11px] text-red-600 dark:text-red-300"
            >
              {errors.consent}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="submit"
            disabled={draftState === "opening"}
            className="h-11 flex-1 rounded-none bg-zinc-950 text-xs font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            {draftState === "opening"
              ? "Opening your email app…"
              : "Write email"}
            <Send className="size-3.5" aria-hidden="true" />
          </Button>

          {hasOpenedDraft ? (
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-none border-zinc-950/25 text-xs dark:border-white/25"
            >
              <a href={mailtoHref}>
                Open draft again
                <Mail className="size-3.5" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
      </form>

      <div className="mt-5 space-y-3 border-t border-zinc-950/15 pt-5 text-xs text-zinc-700 dark:border-white/20 dark:text-zinc-400">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 hover:text-zinc-950 dark:hover:text-white"
        >
          <Mail className="size-4" aria-hidden="true" />
          {email}
        </a>
      </div>
    </div>
  );
}
