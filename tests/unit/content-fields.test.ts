import { describe, expect, it } from "vitest";

import {
  getEmptyValues,
  normalizeValues,
  projectFields,
} from "@/lib/content/fields";
import { defaultPortfolioContent } from "@/lib/content/default-content";
import { projectSchema, slugify } from "@/lib/content/schema";

describe("admin form fields", () => {
  it("normalizes raw form values into schema-ready data", () => {
    const [project] = defaultPortfolioContent.projects;
    const values = normalizeValues(projectFields, {
      ...project,
      title: `  ${project.title}  `,
      stack: ["HTML", "", "  CSS "],
      liveUrl: "   ",
      sourceUrl: "https://github.com/kobina2121/example",
    });

    expect(values.title).toBe(project.title);
    expect(values.stack).toEqual(["HTML", "CSS"]);
    expect(values).not.toHaveProperty("liveUrl");
    expect(values.sourceUrl).toBe("https://github.com/kobina2121/example");
    expect(projectSchema.safeParse(values).success).toBe(true);
  });

  it("generates the slug from the title when it is left empty", () => {
    const [project] = defaultPortfolioContent.projects;
    const values = normalizeValues(projectFields, {
      ...project,
      title: "My Café App 2.0",
      slug: "",
    });

    expect(projectSchema.parse(values).slug).toBe("my-cafe-app-2-0");
    expect(slugify("  Hello,  World!  ")).toBe("hello-world");
  });

  it("keeps only uploaded screenshot URLs", () => {
    const [project] = defaultPortfolioContent.projects;
    const upload =
      "https://abc123.public.blob.vercel-storage.com/projects/screenshot-x1y2.webp";
    const values = normalizeValues(projectFields, {
      ...project,
      screenshots: [upload, "", 42],
    });

    expect(values.screenshots).toEqual([upload]);
    expect(projectSchema.parse(values).screenshots).toEqual([upload]);
    expect(
      projectSchema.safeParse({
        ...project,
        screenshots: ["https://evil.example/x.png"],
      }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        ...project,
        screenshots: ["/api/blob/projects/screenshot-x1y2.webp"],
      }).success,
    ).toBe(true);
  });

  it("rejects link fields that are not full URLs", () => {
    const [project] = defaultPortfolioContent.projects;
    const result = projectSchema.safeParse({ ...project, liveUrl: "my-site" });

    expect(result.success).toBe(false);
  });

  it("builds empty values that fail validation until filled in", () => {
    const empty = getEmptyValues(projectFields);

    expect(empty.stack).toEqual([]);
    expect(
      projectSchema.safeParse(normalizeValues(projectFields, empty)).success,
    ).toBe(false);
  });

  it("round-trips every built-in project through the form shape", () => {
    for (const project of defaultPortfolioContent.projects) {
      expect(
        projectSchema.safeParse(normalizeValues(projectFields, project)),
      ).toMatchObject({ success: true });
    }
  });
});
