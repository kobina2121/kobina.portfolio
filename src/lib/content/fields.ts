// Plain, serializable form descriptions for the admin editor. Kept free of
// zod and server code so they can be passed to client components.

type BaseField = {
  name: string;
  label: string;
  help?: string;
};

export type FieldConfig =
  | (BaseField & { kind: "text"; optional?: boolean; nullable?: boolean })
  | (BaseField & { kind: "textarea"; optional?: boolean })
  | (BaseField & { kind: "list" })
  | (BaseField & { kind: "select"; options: readonly string[] })
  | (BaseField & { kind: "group"; fields: FieldConfig[] })
  | (BaseField & {
      kind: "repeater";
      itemLabel: string;
      fields: FieldConfig[];
    });

export type FormValues = Record<string, unknown>;

// Tailwind only generates classes it finds in source files, so colors and
// gradients are picked from these lists instead of typed freely.
export const accentOptions = [
  "from-[#dcecff] via-[#b9d6ff] to-[#fff6e9]",
  "from-[#2b1055] via-[#7597de] to-[#d76bff]",
  "from-[#050505] via-[#151515] to-[#343434]",
  "from-[#151515] via-[#1d1d1d] to-[#090909]",
  "from-[#151515] via-[#2d1745] to-[#090909]",
  "from-[#171717] via-[#27272a] to-[#52525b]",
  "from-[#111827] via-[#020617] to-[#050505]",
  "from-[#1f2937] via-[#111827] to-[#030712]",
  "from-[#1e1b4b] via-[#312e81] to-[#020617]",
  "from-[#064e3b] via-[#022c22] to-[#020617]",
] as const;

export const skillColorOptions = [
  "text-orange-500",
  "text-blue-500",
  "text-yellow-300",
  "text-sky-500",
  "text-lime-400",
  "text-pink-400",
  "text-red-500",
  "text-red-400",
  "text-amber-400",
  "text-cyan-400",
] as const;

const linkFields: FieldConfig[] = [
  { kind: "text", name: "label", label: "Label" },
  {
    kind: "text",
    name: "href",
    label: "Link",
    help: "A path like /about, an anchor like #contact-me, mailto:, or a full URL.",
  },
];

const projectLinkFields: FieldConfig[] = [
  { kind: "text", name: "label", label: "Label" },
  {
    kind: "text",
    name: "href",
    label: "Link",
    nullable: true,
    help: "Leave empty when the link is unavailable.",
  },
  {
    kind: "text",
    name: "unavailableReason",
    label: "Reason it is unavailable",
    optional: true,
    help: "Required when the link is empty.",
  },
];

const periodHelp = "A year, Ongoing, or a range like 2024 — Present.";

export const settingsFields: FieldConfig[] = [
  { kind: "text", name: "name", label: "Site name" },
  { kind: "text", name: "owner", label: "Owner" },
  { kind: "text", name: "title", label: "Professional title" },
  { kind: "text", name: "email", label: "Email" },
  { kind: "text", name: "phone", label: "Phone" },
  { kind: "text", name: "location", label: "Location" },
  { kind: "text", name: "availability", label: "Availability" },
  {
    kind: "group",
    name: "primaryCta",
    label: "Primary call to action",
    fields: linkFields,
  },
  {
    kind: "group",
    name: "secondaryCta",
    label: "Secondary call to action",
    fields: linkFields,
  },
  {
    kind: "repeater",
    name: "socialLinks",
    label: "Social links",
    itemLabel: "Link",
    fields: linkFields,
  },
  {
    kind: "list",
    name: "aboutHighlights",
    label: "About highlights",
    help: "One highlight per line.",
  },
];

export const projectFields: FieldConfig[] = [
  { kind: "text", name: "title", label: "Title" },
  {
    kind: "text",
    name: "slug",
    label: "Slug",
    help: "Used in the URL: /projects/<slug>. Lowercase letters, numbers, and hyphens.",
  },
  { kind: "text", name: "category", label: "Category" },
  { kind: "text", name: "type", label: "Type" },
  { kind: "text", name: "year", label: "Year" },
  { kind: "textarea", name: "description", label: "Card description" },
  { kind: "textarea", name: "outcome", label: "Outcome" },
  {
    kind: "select",
    name: "accent",
    label: "Accent gradient",
    options: accentOptions,
  },
  { kind: "list", name: "stack", label: "Stack", help: "One per line." },
  { kind: "list", name: "tags", label: "Tags", help: "One per line." },
  { kind: "textarea", name: "context", label: "Context" },
  { kind: "textarea", name: "role", label: "Role" },
  { kind: "textarea", name: "problem", label: "Problem" },
  {
    kind: "list",
    name: "constraints",
    label: "Constraints",
    help: "One per line.",
  },
  { kind: "list", name: "process", label: "Process", help: "One per line." },
  { kind: "textarea", name: "solution", label: "Solution" },
  { kind: "list", name: "impact", label: "Impact", help: "One per line." },
  { kind: "list", name: "lessons", label: "Lessons", help: "One per line." },
  {
    kind: "repeater",
    name: "gallery",
    label: "Gallery",
    itemLabel: "Gallery item",
    fields: [
      { kind: "text", name: "title", label: "Title" },
      { kind: "textarea", name: "caption", label: "Caption" },
      {
        kind: "select",
        name: "accent",
        label: "Accent gradient",
        options: accentOptions,
      },
    ],
  },
  {
    kind: "group",
    name: "live",
    label: "Live link",
    fields: projectLinkFields,
  },
  {
    kind: "group",
    name: "source",
    label: "Source link",
    fields: projectLinkFields,
  },
  {
    kind: "textarea",
    name: "confidentiality",
    label: "Confidentiality note",
    optional: true,
  },
];

export const skillFields: FieldConfig[] = [
  { kind: "text", name: "label", label: "Label" },
  {
    kind: "select",
    name: "icon",
    label: "Icon",
    options: [
      "html",
      "css",
      "javascript",
      "react",
      "node",
      "figma",
      "git",
      "mysql",
      "firebase",
      "java",
    ],
  },
  {
    kind: "select",
    name: "color",
    label: "Icon color",
    options: skillColorOptions,
  },
  { kind: "text", name: "category", label: "Category" },
  { kind: "textarea", name: "description", label: "Description" },
];

export const serviceFields: FieldConfig[] = [
  { kind: "text", name: "title", label: "Title" },
  { kind: "textarea", name: "description", label: "Description" },
  {
    kind: "list",
    name: "deliverables",
    label: "Deliverables",
    help: "One per line.",
  },
];

export const experienceFields: FieldConfig[] = [
  { kind: "text", name: "role", label: "Role" },
  { kind: "text", name: "company", label: "Company" },
  { kind: "text", name: "period", label: "Period", help: periodHelp },
  { kind: "text", name: "location", label: "Location" },
  {
    kind: "list",
    name: "highlights",
    label: "Highlights",
    help: "One per line.",
  },
];

export const educationFields: FieldConfig[] = [
  { kind: "text", name: "institution", label: "Institution" },
  { kind: "text", name: "qualification", label: "Qualification" },
  { kind: "text", name: "period", label: "Period", help: periodHelp },
  { kind: "textarea", name: "detail", label: "Detail" },
];

export const certificationFields: FieldConfig[] = [
  { kind: "text", name: "name", label: "Name" },
  { kind: "text", name: "provider", label: "Provider" },
  { kind: "text", name: "status", label: "Status" },
];

export const testimonialFields: FieldConfig[] = [
  { kind: "textarea", name: "quote", label: "Quote" },
  { kind: "text", name: "name", label: "Name" },
  { kind: "text", name: "role", label: "Role" },
];

/** Blank values for a new document, shaped like the fields. */
export function getEmptyValues(fields: FieldConfig[]): FormValues {
  return Object.fromEntries(
    fields.map((field) => {
      switch (field.kind) {
        case "list":
        case "repeater":
          return [field.name, []];
        case "select":
          return [field.name, field.options[0] ?? ""];
        case "group":
          return [field.name, getEmptyValues(field.fields)];
        default:
          return [field.name, ""];
      }
    }),
  );
}

/**
 * Turns raw form values into the shape the content schemas expect: trims
 * text, drops blank list lines, and maps empty optional fields to
 * undefined (or null for nullable links).
 */
export function normalizeValues(
  fields: FieldConfig[],
  raw: unknown,
): FormValues {
  const source = isRecord(raw) ? raw : {};
  const result: FormValues = {};

  for (const field of fields) {
    const value = source[field.name];

    switch (field.kind) {
      case "text":
      case "textarea": {
        const text = typeof value === "string" ? value.trim() : "";

        if (text) {
          result[field.name] = text;
        } else if (field.kind === "text" && field.nullable) {
          result[field.name] = null;
        } else if (!field.optional) {
          result[field.name] = "";
        }
        break;
      }
      case "select":
        result[field.name] = typeof value === "string" ? value : "";
        break;
      case "list": {
        const lines = Array.isArray(value)
          ? value
          : typeof value === "string"
            ? value.split("\n")
            : [];

        result[field.name] = lines
          .filter((line): line is string => typeof line === "string")
          .map((line) => line.trim())
          .filter(Boolean);
        break;
      }
      case "group":
        result[field.name] = normalizeValues(field.fields, value);
        break;
      case "repeater":
        result[field.name] = (Array.isArray(value) ? value : []).map((item) =>
          normalizeValues(field.fields, item),
        );
        break;
    }
  }

  return result;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
