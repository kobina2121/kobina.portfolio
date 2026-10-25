import { describe, expect, it } from "vitest";

import {
  getEmptyValues,
  normalizeValues,
  projectFields,
} from "@/lib/content/fields";
import { defaultPortfolioContent } from "@/lib/content/default-content";
import { projectSchema } from "@/lib/content/schema";

describe("admin form fields", () => {
  it("normalizes raw form values into schema-ready data", () => {
    const [project] = defaultPortfolioContent.projects;
    const values = normalizeValues(projectFields, {
      ...project,
      title: `  ${project.title}  `,
      stack: ["HTML", "", "  CSS "],
      live: { label: "Live", href: "", unavailableReason: "Private build" },
      confidentiality: "   ",
    });

    expect(values.title).toBe(project.title);
    expect(values.stack).toEqual(["HTML", "CSS"]);
    expect(values.live).toEqual({
      label: "Live",
      href: null,
      unavailableReason: "Private build",
    });
    expect(values).not.toHaveProperty("confidentiality");
    expect(projectSchema.safeParse(values).success).toBe(true);
  });

  it("builds empty values that fail validation until filled in", () => {
    const empty = getEmptyValues(projectFields);

    expect(empty.gallery).toEqual([]);
    expect(empty.live).toEqual({ label: "", href: "", unavailableReason: "" });
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
