import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("project foundation", () => {
  it("merges Tailwind utility classes predictably", () => {
    expect(cn("px-2", "px-4", { hidden: false })).toBe("px-4");
  });
});
