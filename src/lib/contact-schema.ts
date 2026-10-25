import { z } from "zod";

export const CONTACT_MESSAGE_MAX_LENGTH = 1200;

export const contactSubjectOptions = [
  {
    value: "project",
    label: "Project inquiry",
  },
  {
    value: "collaboration",
    label: "Collaboration",
  },
  {
    value: "question",
    label: "General question",
  },
] as const;

export const contactBudgetOptions = [
  {
    value: "",
    label: "Not sure yet",
  },
  {
    value: "under-1k",
    label: "Under $1,000",
  },
  {
    value: "1k-3k",
    label: "$1,000 – $3,000",
  },
  {
    value: "3k-plus",
    label: "$3,000+",
  },
] as const;

const contactSubjectValues = contactSubjectOptions.map(
  (option) => option.value,
) as [ContactSubject, ...ContactSubject[]];

const contactBudgetValues = contactBudgetOptions.map(
  (option) => option.value,
) as [ContactBudget, ...ContactBudget[]];

export type ContactSubject = (typeof contactSubjectOptions)[number]["value"];
export type ContactBudget = (typeof contactBudgetOptions)[number]["value"];

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Names should stay under 80 characters."),
  email: z
    .email("Please enter a valid email address.")
    .max(120, "Email addresses should stay under 120 characters."),
  subject: z.enum(contactSubjectValues, {
    error: "Choose the reason for your message.",
  }),
  budget: z.enum(contactBudgetValues, {
    error: "Choose a valid budget range.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Share at least 20 characters so I have enough context.")
    .max(
      CONTACT_MESSAGE_MAX_LENGTH,
      `Keep the message under ${CONTACT_MESSAGE_MAX_LENGTH} characters.`,
    ),
  consent: z.boolean().refine((value) => value, {
    message: "Please confirm you agree to be contacted about this message.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormField = keyof ContactFormValues;
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export function getContactFieldErrors(
  result: z.ZodError<ContactFormValues>,
): ContactFormErrors {
  return result.issues.reduce<ContactFormErrors>((errors, issue) => {
    const field = issue.path[0] as ContactFormField | undefined;

    if (field && !errors[field]) {
      errors[field] = issue.message;
    }

    return errors;
  }, {});
}

export function getInitialContactFormValues(): ContactFormValues {
  return {
    name: "",
    email: "",
    subject: "project",
    budget: "",
    message: "",
    consent: false,
  };
}

// Messages go out from the visitor's own email app, so the site needs no
// email service.
export function getContactMailtoHref(email: string, values: ContactFormValues) {
  const subjectLabel =
    contactSubjectOptions.find((option) => option.value === values.subject)
      ?.label ?? "Portfolio inquiry";
  const budgetLabel =
    contactBudgetOptions.find((option) => option.value === values.budget)
      ?.label ?? "Not sure yet";
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Inquiry type: ${subjectLabel}`,
    `Budget: ${budgetLabel}`,
    "",
    values.message,
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(
    subjectLabel,
  )}&body=${encodeURIComponent(body)}`;
}
