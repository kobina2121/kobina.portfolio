"use client";

import { type KeyboardEvent, useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { splitStack } from "@/lib/tech-stack";

type TagsFieldProps = {
  id: string;
  value: unknown;
  suggestions: string[];
  describedBy?: string;
  invalid: boolean;
  onChange: (tags: string[]) => void;
};

const chipClassName =
  "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors";

export function TagsField({
  id,
  value,
  suggestions,
  describedBy,
  invalid,
  onChange,
}: TagsFieldProps) {
  // Older projects may hold a whole stack in one comma-separated entry.
  const tags = splitStack(
    Array.isArray(value)
      ? value.filter((tag): tag is string => typeof tag === "string")
      : [],
  );
  const [draft, setDraft] = useState("");
  const selected = new Set(tags.map((tag) => tag.toLowerCase()));
  const query = draft.trim().toLowerCase();
  const available = suggestions.filter(
    (tag) =>
      !selected.has(tag.toLowerCase()) &&
      (!query || tag.toLowerCase().includes(query)),
  );

  function add(input: string) {
    const next = splitStack([...tags, input]);

    if (next.length !== tags.length) {
      onChange(next);
    }
    setDraft("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      // Enter would otherwise submit the whole form.
      event.preventDefault();
      if (draft.trim()) add(draft);
    } else if (event.key === "Backspace" && !draft && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="space-y-3">
      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="Selected technologies">
          {tags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                className={`${chipClassName} border-foreground bg-foreground text-background hover:opacity-80`}
                aria-label={`Remove ${tag}`}
                onClick={() =>
                  onChange(tags.filter((current) => current !== tag))
                }
              >
                {tag}
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex gap-2">
        <Input
          id={id}
          value={draft}
          placeholder="Add a technology"
          autoComplete="off"
          aria-describedby={describedBy}
          aria-invalid={invalid}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          variant="outline"
          disabled={!draft.trim()}
          onClick={() => add(draft)}
        >
          <Plus />
          Add
        </Button>
      </div>

      {available.length > 0 ? (
        <div>
          <p className="text-muted-foreground mb-2 text-xs">Suggestions</p>
          <ul className="flex flex-wrap gap-2">
            {available.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  className={`${chipClassName} border-border text-muted-foreground hover:border-accent-brand hover:text-accent-brand`}
                  aria-label={`Add ${tag}`}
                  onClick={() => add(tag)}
                >
                  <Plus className="size-3.5" aria-hidden="true" />
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
