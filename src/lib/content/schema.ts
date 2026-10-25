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
});

const projectMediaSchema = z.object({
  title: nonEmptyString,
  caption: nonEmptyString,
  accent: nonEmptyString,
});

const projectLinkSchema = z
  .object({
    label: nonEmptyString,
    href: routeHrefSchema.nullable(),
    unavailableReason: nonEmptyString.optional(),
  })
  .refine((link) => link.href || link.unavailableReason, {
    message: "Unavailable project links need a reason.",
    path: ["unavailableReason"],
  });

export const projectSlugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and single hyphens.",
  );

export const projectSchema = z.object({
  title: nonEmptyString,
  slug: projectSlugSchema,
  stack: z.array(nonEmptyString).min(1),
  tags: z.array(nonEmptyString).min(1),
  category: nonEmptyString,
  description: nonEmptyString,
  accent: nonEmptyString,
  type: nonEmptyString,
  year: yearSchema,
  outcome: nonEmptyString,
  context: nonEmptyString,
  role: nonEmptyString,
  problem: nonEmptyString,
  constraints: z.array(nonEmptyString).min(1),
  process: z.array(nonEmptyString).min(1),
  solution: nonEmptyString,
  impact: z.array(nonEmptyString).min(1),
  lessons: z.array(nonEmptyString).min(1),
  gallery: z.array(projectMediaSchema).min(1),
  live: projectLinkSchema,
  source: projectLinkSchema,
  confidentiality: nonEmptyString.optional(),
});

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
export type ProjectMedia = z.infer<typeof projectMediaSchema>;
export type ProjectLink = z.infer<typeof projectLinkSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type SkillIcon = z.infer<typeof skillIconSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
