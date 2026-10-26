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
  | (BaseField & { kind: "images"; max: number })
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
  "from-[#f4f4f5] via-[#d4d4d8] to-[#fafafa]",
  "from-[#0a0a0a] via-[#52525b] to-[#d4d4d8]",
  "from-[#050505] via-[#151515] to-[#343434]",
  "from-[#151515] via-[#1d1d1d] to-[#090909]",
  "from-[#151515] via-[#2a2a2a] to-[#090909]",
  "from-[#171717] via-[#27272a] to-[#52525b]",
  "from-[#111827] via-[#020617] to-[#050505]",
  "from-[#1f2937] via-[#111827] to-[#030712]",
  "from-[#18181b] via-[#3f3f46] to-[#09090b]",
  "from-[#262626] via-[#171717] to-[#0a0a0a]",
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

const periodHelp = "A year, Ongoing, or a range like 2024 — Present.";

export const settingsFields: FieldConfig[] = [
  { kind: "text", name: "name", label: "Site name" },
  { kind: "text", name: "owner", label: "Owner" },
  { kind: "text", name: "title", label: "Professional title" },
  { kind: "text", name: "email", label: "Email" },
  {
    kind: "text",
    name: "phone",
    label: "Phone",
    help: "Numbers starting with 0 are dialed as +233. For other countries, include the country code, e.g. +44 20 7946 0958.",
  },
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
    help: "Shown in the hero and footer. GitHub, LinkedIn, X, Instagram, and email links get their own icons.",
    itemLabel: "Link",
    fields: linkFields,
  },
  {
    kind: "textarea",
    name: "heroIntro",
    label: "Hero intro",
    help: "The short paragraph under the headline on the home page.",
  },
  {
    kind: "list",
    name: "aboutHighlights",
    label: "About highlights",
    help: "One highlight per line.",
  },
  {
    kind: "repeater",
    name: "aboutStats",
    label: "About page cards",
    itemLabel: "Card",
    help: "Short facts shown as cards on the about page, e.g. Base: Accra.",
    fields: [
      { kind: "text", name: "label", label: "Label" },
      { kind: "text", name: "value", label: "Value" },
    ],
  },
  {
    kind: "text",
    name: "metaTitle",
    label: "Browser and search title",
    help: "Shown in the browser tab and search results for the home page.",
  },
  {
    kind: "textarea",
    name: "metaDescription",
    label: "Search description",
    help: "Shown under the title in search results and link previews.",
  },
];

export const projectFields: FieldConfig[] = [
  { kind: "text", name: "title", label: "Title" },
  { kind: "text", name: "category", label: "Category" },
  { kind: "text", name: "year", label: "Year" },
  {
    kind: "textarea",
    name: "description",
    label: "Description",
    help: "One or two sentences shown on the project card.",
  },
  {
    kind: "images",
    name: "screenshots",
    label: "Preview",
    max: 8,
    help: "Images of the website. PNG, JPEG, or WebP. The first one is used as the project's cover image.",
  },
  {
    kind: "list",
    name: "stack",
    label: "Stack",
    help: "Tools and technologies, one per line.",
  },
  {
    kind: "select",
    name: "accent",
    label: "Accent gradient",
    options: accentOptions,
  },
  {
    kind: "text",
    name: "liveUrl",
    label: "Live site URL",
    optional: true,
    help: "Leave empty if there is no public version.",
  },
  {
    kind: "text",
    name: "sourceUrl",
    label: "Source code URL",
    optional: true,
    help: "Leave empty if the code is private.",
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
        case "images":
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
      case "images":
        result[field.name] = (Array.isArray(value) ? value : []).filter(
          (url): url is string => typeof url === "string" && url.length > 0,
        );
        break;
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
