import { describe, expect, it } from "vitest";

import {
  getAdjacentProjects,
  getAllProjects,
  getContentStrategy,
  getNavigationItems,
  getProjectBySlug,
  getRequiredImageAsset,
  getSiteConfig,
} from "@/lib/portfolio-content";

describe("portfolio content repository", () => {
  it("exposes validated site and navigation content", () => {
    expect(getSiteConfig().title).toBe("Full Stack Developer");
    expect(getNavigationItems().map((item) => item.key)).toEqual([
      "home",
      "about",
      "projects",
      "skills",
    ]);
  });

  it("keeps project slugs unique and addressable", () => {
    const projects = getAllProjects();
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getProjectBySlug("cryptrack")?.title).toBe("CrypTrack");
    expect(getAdjacentProjects("projectx").previous?.slug).toBe("1111afolio");
  });

  it("organizes reusable image assets by purpose", () => {
    expect(getRequiredImageAsset("formal-portrait")).toMatchObject({
      purpose: "portrait",
      src: "/images/kobina-formal-portrait-background-removed.png",
    });
  });

  it("records content strategy decisions for future adapters", () => {
    expect(getContentStrategy()).toEqual({
      adapter: "typed-local",
      blogEnabled: false,
      caseStudiesUseMdx: false,
    });
  });
});
