import { useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TagsField } from "@/components/admin/tags-field";

function Harness({
  initial,
  onSubmit = () => {},
}: {
  initial: string[];
  onSubmit?: () => void;
}) {
  const [tags, setTags] = useState<string[]>(initial);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <TagsField
        id="stack"
        value={tags}
        suggestions={["Next.js", "React", "MongoDB"]}
        invalid={false}
        onChange={setTags}
      />
      <output data-testid="value">{JSON.stringify(tags)}</output>
    </form>
  );
}

const value = () => JSON.parse(screen.getByTestId("value").textContent ?? "");

describe("TagsField", () => {
  afterEach(() => {
    cleanup();
  });

  it("adds a suggestion with one click and hides it from the list", () => {
    render(<Harness initial={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Add React" }));

    expect(value()).toEqual(["React"]);
    expect(screen.queryByRole("button", { name: "Add React" })).toBeNull();
    expect(screen.getByRole("button", { name: "Remove React" })).toBeVisible();
  });

  it("adds a typed technology on Enter without submitting the form", () => {
    const onSubmit = vi.fn();
    render(<Harness initial={["React"]} onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText("Add a technology");

    fireEvent.change(input, { target: { value: "Paystack API" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(value()).toEqual(["React", "Paystack API"]);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveValue("");
  });

  it("ignores repeats and removes tags", () => {
    render(<Harness initial={["React"]} />);
    const input = screen.getByPlaceholderText("Add a technology");

    fireEvent.change(input, { target: { value: "react" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(value()).toEqual(["React"]);

    fireEvent.click(screen.getByRole("button", { name: "Remove React" }));
    expect(value()).toEqual([]);
  });

  it("splits an older comma-separated stack into separate tags", () => {
    render(<Harness initial={["TypeScript, PayStack API, MongoDB,"]} />);

    for (const tag of ["TypeScript", "PayStack API", "MongoDB"]) {
      expect(
        screen.getByRole("button", { name: `Remove ${tag}` }),
      ).toBeVisible();
    }
    // Already-selected suggestions aren't offered again.
    expect(screen.queryByRole("button", { name: "Add MongoDB" })).toBeNull();
  });
});
