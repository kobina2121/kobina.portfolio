import { z } from "zod";

const routeHrefSchema = z.string().refine(
  (href) => {
    if (
      href.startsWith("/") ||
      href.startsWith("#") ||
      href.startsWith("mailto:")
    ) {
      return true;
    }

    return z.url().safeParse(href).success;
  },
  {
    message: "Links must be relative, anchor, mailto, or absolute URLs.",
  },
);

const nonEmptyString = z.string().trim().min(1);
const yearSchema = z.string().regex(/^\d{4}$/, "Expected a four-digit year.");
const periodSchema = z
  .string()
  .regex(
    /^(\d{4}|Ongoing)( — (\d{4}|Present))?$/,
    "Expected a year, Ongoing, or a year range.",
  );

export const siteNavKeySchema = z.enum(["home", "about", "projects", "skills"]);
export const skillIconSchema = z.enum([
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
]);

export const imageAssetSchema = z.object({
  key: nonEmptyString,
  src: z.string().startsWith("/images/"),
  alt: nonEmptyString,
  purpose: z.enum(["portrait", "illustration", "brand"]),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const navigationItemSchema = z.object({
  key: siteNavKeySchema,
  label: nonEmptyString,
  href: routeHrefSchema,
});

export const contentStrategySchema = z.object({
  caseStudiesUseMdx: z.boolean(),
  blogEnabled: z.boolean(),
  adapter: z.enum(["typed-local", "mongodb"]),
});

const linkSchema = z.object({
  label: nonEmptyString,
  href: routeHrefSchema,
});

export const siteSettingsSchema = z.object({
  name: nonEmptyString,
  owner: nonEmptyString,
  title: nonEmptyString,
  email: z.email(),
  phone: nonEmptyString,
  location: nonEmptyString,
  availability: nonEmptyString,
  primaryCta: linkSchema,
  secondaryCta: linkSchema,
  socialLinks: z.array(linkSchema),
  aboutHighlights: z.array(nonEmptyString).min(1),
  aboutStats: z.array(
    z.object({ label: nonEmptyString, value: nonEmptyString }),
  ),
  heroIntro: nonEmptyString,
  metaTitle: nonEmptyString,
  metaDescription: nonEmptyString,
});

export const projectSlugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and single hyphens.",
  );

// Turns a title into a URL slug, e.g. "My App 2.0" -> "my-app-2-0".
export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const optionalUrl = z.url("Enter a full URL starting with https://").optional();

// Uploaded screenshots live in Vercel Blob. Files in a public store are linked
// directly, e.g. https://abc123.public.blob.vercel-storage.com/projects/x.webp;
// files in a private store are served by this site at /api/blob/projects/x.webp.
const publicBlobUrlPattern =
  /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/(projects\/[\w.-]+)$/i;
const privateBlobPathPattern = /^\/api\/blob\/(projects\/[\w.-]+)$/;

/** The Blob pathname of an uploaded screenshot, or null for other URLs. */
export function getBlobPathname(url: string) {
  return (
    publicBlobUrlPattern.exec(url)?.[1] ??
    privateBlobPathPattern.exec(url)?.[1] ??
    null
  );
}

export function getPrivateBlobUrl(pathname: string) {
  return `/api/blob/${pathname}`;
}

export const MAX_PROJECT_SCREENSHOTS = 8;

export const projectSchema = z.preprocess(
  (input) => {
    // An empty slug is generated from the title.
    if (typeof input === "object" && input !== null && !("slug" in input)) {
      const title = (input as { title?: unknown }).title;
      return {
        ...input,
        slug: typeof title === "string" ? slugify(title) : undefined,
      };
    }

    return input;
  },
  z.object({
    title: nonEmptyString,
    slug: projectSlugSchema,
    category: nonEmptyString,
    year: yearSchema,
    description: nonEmptyString,
    stack: z.array(nonEmptyString).min(1),
    accent: nonEmptyString,
    role: nonEmptyString,
    problem: nonEmptyString,
    solution: nonEmptyString,
    liveUrl: optionalUrl,
    sourceUrl: optionalUrl,
    screenshots: z
      .array(
        z
          .string()
          .refine(
            (url) => getBlobPathname(url) !== null,
            "Upload preview images here.",
          ),
      )
      .max(
        MAX_PROJECT_SCREENSHOTS,
        `Add up to ${MAX_PROJECT_SCREENSHOTS} preview images.`,
      )
      .default([]),
  }),
);

export const skillSchema = z.object({
  label: nonEmptyString,
  icon: skillIconSchema,
  color: nonEmptyString,
  category: nonEmptyString,
  description: nonEmptyString,
});

export const serviceSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  deliverables: z.array(nonEmptyString).min(1),
});

export const experienceSchema = z.object({
  role: nonEmptyString,
  company: nonEmptyString,
  period: periodSchema,
  location: nonEmptyString,
  highlights: z.array(nonEmptyString).min(1),
});

export const educationSchema = z.object({
  institution: nonEmptyString,
  qualification: nonEmptyString,
  period: periodSchema,
  detail: nonEmptyString,
});

export const certificationSchema = z.object({
  name: nonEmptyString,
  provider: nonEmptyString,
  status: nonEmptyString,
});

export const testimonialSchema = z.object({
  quote: nonEmptyString,
  name: nonEmptyString,
  role: nonEmptyString,
});

export const portfolioContentSchema = z
  .object({
    settings: siteSettingsSchema,
    projects: z.array(projectSchema),
    skills: z.array(skillSchema),
    services: z.array(serviceSchema),
    experience: z.array(experienceSchema),
    education: z.array(educationSchema),
    certifications: z.array(certificationSchema),
    testimonials: z.array(testimonialSchema),
  })
  .superRefine((content, context) => {
    const projectSlugs = new Set<string>();

    content.projects.forEach((project, index) => {
      if (projectSlugs.has(project.slug)) {
        context.addIssue({
          code: "custom",
          path: ["projects", index, "slug"],
          message: `Duplicate project slug: ${project.slug}`,
        });
      }

      projectSlugs.add(project.slug);
    });
  });

export type SiteNavKey = z.infer<typeof siteNavKeySchema>;
export type NavigationItem = z.infer<typeof navigationItemSchema>;
export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type ContentStrategy = z.infer<typeof contentStrategySchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type SkillIcon = z.infer<typeof skillIconSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
