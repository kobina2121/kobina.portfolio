import {
  contentStrategySchema,
  imageAssetSchema,
  navigationItemSchema,
} from "@/lib/content/schema";

// Navigation and images point at routes and files that live in the codebase,
// so they stay in code rather than in the database.

const rawSiteNavItems = [
  { key: "home", label: "home", href: "/" },
  { key: "about", label: "about", href: "/about" },
  { key: "projects", label: "projects", href: "/projects" },
  { key: "skills", label: "skills", href: "/skills" },
] as const;

const rawImageAssets = [
  {
    key: "formal-portrait",
    src: "/images/kobina-formal-portrait-background-removed.png",
    alt: "Portrait of Kobina Kyereboah",
    purpose: "portrait",
    width: 1024,
    height: 1024,
  },
  {
    key: "developer-character",
    src: "/images/developer-character.png",
    alt: "Developer avatar with laptop",
    purpose: "illustration",
    width: 420,
    height: 614,
  },
  {
    key: "kobina-logo",
    src: "/images/kobina-logo.png",
    alt: "Kobina logo",
    purpose: "brand",
    width: 739,
    height: 512,
  },
  {
    key: "kobina-logo-light",
    src: "/images/kobina-logo-light.png",
    alt: "Kobina logo",
    purpose: "brand",
    width: 739,
    height: 512,
  },
] as const;

export const navigationItems = navigationItemSchema
  .array()
  .min(1)
  .parse(rawSiteNavItems);

export const imageAssets = imageAssetSchema.array().parse(rawImageAssets);

export const contentStrategy = contentStrategySchema.parse({
  caseStudiesUseMdx: false,
  blogEnabled: false,
  adapter: "mongodb",
});
