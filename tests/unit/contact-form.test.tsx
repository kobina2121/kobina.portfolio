import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/forms/contact-form";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows feedback before handing the draft to the email app", () => {
    const originalLocation = window.location;
    let openedHref: string | undefined;
    // jsdom can't navigate to mailto:, so record the assignment instead.
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...originalLocation,
        set href(value: string) {
          openedHref = value;
        },
      },
    });

    try {
      const { container } = render(<ContactForm email="owner@example.com" />);

      fireEvent.change(container.querySelector("#contact-name")!, {
        target: { value: "Ama Mensah" },
      });
      fireEvent.change(container.querySelector("#contact-email")!, {
        target: { value: "ama@example.com" },
      });
      fireEvent.change(container.querySelector("#contact-message")!, {
        target: { value: "I'd like help building a portfolio site." },
      });
      fireEvent.click(container.querySelector('input[type="checkbox"]')!);

      fireEvent.click(screen.getByRole("button", { name: /write email/i }));

      // The button reacts immediately, before the email app is opened.
      expect(
        screen.getByRole("button", { name: /opening your email app/i }),
      ).toBeDisabled();
      expect(openedHref).toBeUndefined();

      act(() => {
        vi.runAllTimers();
      });

      expect(openedHref).toMatch(/^mailto:owner@example\.com\?/);
      expect(
        screen.getByRole("button", { name: /write email/i }),
      ).toBeEnabled();
    } finally {
      Object.defineProperty(window, "location", {
        configurable: true,
        value: originalLocation,
      });
    }
  });
});
