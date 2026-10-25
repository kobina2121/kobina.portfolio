import { describe, expect, it } from "vitest";

import {
  getContactMailtoHref,
  getInitialContactFormValues,
} from "@/lib/contact-schema";

describe("getContactMailtoHref", () => {
  it("builds a draft addressed to the site email with the form details", () => {
    const href = getContactMailtoHref("owner@example.com", {
      ...getInitialContactFormValues(),
      name: "Ama Mensah",
      email: "ama@example.com",
      message: "I'd like a portfolio site & a small dashboard.",
    });
    const url = new URL(href);
    const body = url.searchParams.get("body") ?? "";

    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("owner@example.com");
    expect(url.searchParams.get("subject")).toBeTruthy();
    expect(body).toContain("Name: Ama Mensah");
    expect(body).toContain("Email: ama@example.com");
    expect(body).toContain("I'd like a portfolio site & a small dashboard.");
  });
});
