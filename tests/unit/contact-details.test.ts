import { describe, expect, it } from "vitest";

import { getPhoneHref } from "@/lib/contact-details";

describe("getPhoneHref", () => {
  it("dials local numbers starting with 0 as Ghanaian", () => {
    expect(getPhoneHref("0553730959")).toBe("tel:+233553730959");
    expect(getPhoneHref("055 373 0959")).toBe("tel:+233553730959");
  });

  it("keeps numbers that already include a country code", () => {
    expect(getPhoneHref("+44 20 7946 0958")).toBe("tel:+442079460958");
    expect(getPhoneHref("0044 20 7946 0958")).toBe("tel:+442079460958");
  });
});
