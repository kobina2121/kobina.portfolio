import { describe, expect, it } from "vitest";

import {
  getTechName,
  getUniqueTechNames,
  splitStack,
  usesTech,
} from "@/lib/tech-stack";

// Stacks as they were typed into the admin for real projects.
const stacks = [
  [
    "Next.js 14+ (App Router), Tailwind CSS + shadcn/ui, TypeScript, MongoDB, PayStack API",
  ],
  ["Electron"],
  ["TypeScript, PayStack API, MongoDB,"],
  ["Electron, React, SQLite, TypeScript, Node.js"],
  ["Next.js 16, React 19, TypeScript 5.9, MongoDB, Tailwind CSS 4"],
  ["React"],
].map(splitStack);

describe("tech stacks", () => {
  it("splits comma and plus separated entries into separate tools", () => {
    expect(stacks[0]).toEqual([
      "Next.js 14+ (App Router)",
      "Tailwind CSS",
      "shadcn/ui",
      "TypeScript",
      "MongoDB",
      "PayStack API",
    ]);
    expect(stacks[2]).toEqual(["TypeScript", "PayStack API", "MongoDB"]);
    expect(splitStack(["React", "react", " ", "Vue"])).toEqual([
      "React",
      "Vue",
    ]);
  });

  it("names tools without versions or notes", () => {
    expect(getTechName("Next.js 14+ (App Router)")).toBe("Next.js");
    expect(getTechName("TypeScript 5.9")).toBe("TypeScript");
    expect(getTechName("Tailwind CSS 4")).toBe("Tailwind CSS");
    expect(getTechName("Node.js")).toBe("Node.js");
    expect(getTechName("shadcn/ui")).toBe("shadcn/ui");
  });

  it("lists each technology once for the filter", () => {
    expect(getUniqueTechNames(stacks)).toEqual([
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "TypeScript",
      "MongoDB",
      "PayStack API",
      "Electron",
      "React",
      "SQLite",
      "Node.js",
    ]);
  });

  it("matches projects by technology regardless of version", () => {
    expect(usesTech(stacks[4], "React")).toBe(true);
    expect(usesTech(stacks[0], "next.js")).toBe(true);
    expect(usesTech(stacks[1], "React")).toBe(false);
  });
});
