import type { z } from "zod";

import {
  certificationFields,
  experienceFields,
  type FieldConfig,
  projectFields,
  serviceFields,
  settingsFields,
  skillFields,
} from "@/lib/content/fields";
import {
  certificationSchema,
  experienceSchema,
  projectSchema,
  serviceSchema,
  siteSettingsSchema,
  skillSchema,
} from "@/lib/content/schema";

export const listCollectionKeys = [
  "projects",
  "skills",
  "services",
  "experience",
  "certifications",
] as const;

export type ListCollectionKey = (typeof listCollectionKeys)[number];

export type ListCollectionConfig = {
  key: ListCollectionKey;
  label: string;
  singular: string;
  description: string;
  schema: z.ZodType<Record<string, unknown>>;
  fields: FieldConfig[];
  titleField: string;
  subtitleField: string;
};

/**
 * Each list collection maps to a MongoDB collection of the same name. Documents
 * hold the validated item fields plus an `order` number used for sorting.
 */
export const listCollections: Record<ListCollectionKey, ListCollectionConfig> =
  {
    projects: {
      key: "projects",
      label: "Projects",
      singular: "project",
      description: "Case studies shown on the home page and /projects.",
      schema: projectSchema,
      fields: projectFields,
      titleField: "title",
      subtitleField: "category",
    },
    skills: {
      key: "skills",
      label: "Stack",
      singular: "technology",
      description:
        "Technologies on the home page and /stack, grouped by category.",
      schema: skillSchema,
      fields: skillFields,
      titleField: "label",
      subtitleField: "category",
    },
    services: {
      key: "services",
      label: "Services",
      singular: "service",
      description: "What you offer, with deliverables.",
      schema: serviceSchema,
      fields: serviceFields,
      titleField: "title",
      subtitleField: "description",
    },
    experience: {
      key: "experience",
      label: "Experience",
      singular: "role",
      description: "Work history shown on the home page.",
      schema: experienceSchema,
      fields: experienceFields,
      titleField: "role",
      subtitleField: "company",
    },
    certifications: {
      key: "certifications",
      label: "Certifications",
      singular: "certification",
      description: "Certifications and learning tracks.",
      schema: certificationSchema,
      fields: certificationFields,
      titleField: "name",
      subtitleField: "provider",
    },
  };

/** Site settings live in a single document: settings/{_id: "site"}. */
export const settingsCollection = {
  name: "settings",
  documentId: "site",
  label: "Site settings",
  description: "Name, contact details, calls to action, and about highlights.",
  schema: siteSettingsSchema,
  fields: settingsFields,
} as const;

export function isListCollectionKey(value: string): value is ListCollectionKey {
  return (listCollectionKeys as readonly string[]).includes(value);
}
