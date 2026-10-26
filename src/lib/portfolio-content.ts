import { cache } from "react";

import { defaultPortfolioContent } from "@/lib/content/default-content";
import { loadPortfolioContent } from "@/lib/content/repository";
import type { PortfolioContent } from "@/lib/content/schema";
import {
  contentStrategy,
  imageAssets,
  navigationItems,
} from "@/lib/content/static-content";
import { getDb, isMongoConfigured } from "@/lib/db/mongodb";

export type {
  ImageAsset,
  Project,
  SiteNavKey,
  SiteSettings,
  Skill,
  SkillIcon,
} from "@/lib/content/schema";

/**
 * Loads portfolio content from MongoDB once per request. Falls back to the
 * built-in content when MONGODB_URI is unset, the database has not been
 * seeded, or MongoDB cannot be reached.
 */
export const getPortfolioContent = cache(
  async (): Promise<PortfolioContent> => {
    if (!isMongoConfigured()) {
      return defaultPortfolioContent;
    }

    try {
      const content = await loadPortfolioContent(await getDb());

      if (content) {
        return content;
      }

      console.warn(
        "MongoDB has no portfolio content yet, so the built-in content is being served. Seed it from /admin or with `npm run db:seed`.",
      );
    } catch (error) {
      console.error(
        "Could not load portfolio content from MongoDB, so the built-in content is being served.",
        error,
      );
    }

    return defaultPortfolioContent;
  },
);

export async function getSiteConfig() {
  return (await getPortfolioContent()).settings;
}

export function getNavigationItems() {
  return navigationItems;
}

export function getImageAsset(key: string) {
  return imageAssets.find((image) => image.key === key);
}

export function getRequiredImageAsset(key: string) {
  const asset = getImageAsset(key);

  if (!asset) {
    throw new Error(`Missing image asset: ${key}`);
  }

  return asset;
}

export async function getAllProjects() {
  return (await getPortfolioContent()).projects;
}

export async function getFeaturedProjects() {
  return (await getAllProjects()).slice(0, 3);
}

export async function getSkillItems() {
  return (await getPortfolioContent()).skills;
}

export async function getAboutHighlights() {
  return (await getPortfolioContent()).settings.aboutHighlights;
}

export async function getServiceItems() {
  return (await getPortfolioContent()).services;
}

export async function getExperienceItems() {
  return (await getPortfolioContent()).experience;
}

export async function getEducationItems() {
  return (await getPortfolioContent()).education;
}

export async function getCertificationItems() {
  return (await getPortfolioContent()).certifications;
}

export async function getTestimonialItems() {
  return (await getPortfolioContent()).testimonials;
}

export function getContentStrategy() {
  return contentStrategy;
}
