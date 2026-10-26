import { describe, expect, it } from "vitest";

import {
  getAllProjects,
  getContentStrategy,
  getNavigationItems,
  getRequiredImageAsset,
  getSiteConfig,
} from "@/lib/portfolio-content";

// MONGODB_URI is unset in unit tests, so these exercise the built-in fallback.
describe("portfolio content repository", () => {
  it("exposes validated site and navigation content", async () => {
    expect((await getSiteConfig()).title).toBe("Full Stack Developer");
    expect(getNavigationItems().map((item) => item.key)).toEqual([
      "home",
      "about",
      "projects",
      "skills",
    ]);
  });

  it("keeps project slugs unique and addressable", async () => {
    const projects = await getAllProjects();
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(projects.map((project) => project.title)).toContain("CrypTrack");
  });

  it("organizes reusable image assets by purpose", () => {
    expect(getRequiredImageAsset("formal-portrait")).toMatchObject({
      purpose: "portrait",
      src: "/images/kobina-formal-portrait-background-removed.png",
    });
  });

  it("records content strategy decisions", () => {
    expect(getContentStrategy()).toEqual({
      adapter: "mongodb",
      blogEnabled: false,
      caseStudiesUseMdx: false,
    });
  });
});
