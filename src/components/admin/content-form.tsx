"use client";

import { type FormEvent, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import type { AdminFormResult } from "@/app/admin/actions";
import { ImagesField } from "@/components/admin/images-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type FieldConfig,
  type FormValues,
  getEmptyValues,
} from "@/lib/content/fields";
import { cn } from "@/lib/utils";

type ContentFormProps = {
  fields: FieldConfig[];
  initialValues: FormValues;
  action: (values: FormValues) => Promise<AdminFormResult>;
  submitLabel: string;
  cancelHref: string;
};

type FieldProps<T extends FieldConfig = FieldConfig> = {
  field: T;
  path: string;
  value: unknown;
  errors: Record<string, string>;
  onChange: (value: unknown) => void;
};

const selectClassName =
  "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] aria-invalid:border-destructive";

function asRecord(value: unknown): FormValues {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as FormValues)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function FieldMessage({
  id,
  help,
  error,
}: {
  id: string;
  help?: string;
  error?: string;
}) {
  return (
    <>
      {help ? (
        <p id={`${id}-help`} className="text-muted-foreground text-xs">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-destructive text-xs font-medium">
          {error}
        </p>
      ) : null}
    </>
  );
}

function describedBy(id: string, help?: string, error?: string) {
  return cn(help && `${id}-help`, error && `${id}-error`) || undefined;
}

function ListField({ field, path, value, errors, onChange }: FieldProps) {
  // Keep the raw text locally so blank lines survive while typing.
  const [text, setText] = useState(() =>
    Array.isArray(value) ? value.join("\n") : "",
  );
  const error = errors[path];

  return (
    <Textarea
      id={path}
      rows={Math.max(3, text.split("\n").length + 1)}
      value={text}
      aria-invalid={Boolean(error)}
      aria-describedby={describedBy(path, field.help, error)}
      onChange={(event) => {
        setText(event.target.value);
        onChange(event.target.value.split("\n"));
      }}
    />
  );
}

function RepeaterField({
  field,
  path,
  value,
  errors,
  onChange,
}: FieldProps<Extract<FieldConfig, { kind: "repeater" }>>) {
  const items = Array.isArray(value) ? value : [];
  const [keys, setKeys] = useState(() => items.map(() => crypto.randomUUID()));

  function update(nextItems: unknown[], nextKeys: string[]) {
    setKeys(nextKeys);
    onChange(nextItems);
  }

  function move(index: number, offset: number) {
    const target = index + offset;
    const nextItems = [...items];
    const nextKeys = [...keys];

    [nextItems[index], nextItems[target]] = [
      nextItems[target],
      nextItems[index],
    ];
    [nextKeys[index], nextKeys[target]] = [nextKeys[target], nextKeys[index]];
    update(nextItems, nextKeys);
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <fieldset
          key={keys[index]}
          aria-label={`${field.itemLabel} ${index + 1}`}
          className="border-border space-y-4 rounded-xl border p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">
              {field.itemLabel} {index + 1}
            </p>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={index === 0}
                aria-label={`Move ${field.itemLabel} ${index + 1} up`}
                onClick={() => move(index, -1)}
              >
                <ArrowUp />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={index === items.length - 1}
                aria-label={`Move ${field.itemLabel} ${index + 1} down`}
                onClick={() => move(index, 1)}
              >
                <ArrowDown />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${field.itemLabel} ${index + 1}`}
                onClick={() =>
                  update(
                    items.filter((_, itemIndex) => itemIndex !== index),
                    keys.filter((_, keyIndex) => keyIndex !== index),
                  )
                }
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          <FieldList
            fields={field.fields}
            pathPrefix={`${path}.${index}`}
            values={asRecord(item)}
            errors={errors}
            onChange={(nextItem) =>
              onChange(
                items.map((current, itemIndex) =>
                  itemIndex === index ? nextItem : current,
                ),
              )
            }
          />
        </fieldset>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          update(
            [...items, getEmptyValues(field.fields)],
            [...keys, crypto.randomUUID()],
          )
        }
      >
        <Plus />
        Add {field.itemLabel.toLowerCase()}
      </Button>
    </div>
  );
}

function FieldControl(props: FieldProps) {
  const { field, path, value, errors, onChange } = props;
  const error = errors[path];
  const ariaProps = {
    id: path,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy(path, field.help, error),
  };

  switch (field.kind) {
    case "text":
      return (
        <Input
          {...ariaProps}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "textarea":
      return (
        <Textarea
          {...ariaProps}
          rows={4}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "select": {
      const current = asString(value);
      const options = field.options.includes(current)
        ? field.options
        : [current, ...field.options].filter(Boolean);

      return (
        <select
          {...ariaProps}
          className={selectClassName}
          value={current}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
    case "list":
      return <ListField {...props} />;
    case "images":
      return (
        <ImagesField
          id={path}
          label={field.label}
          max={field.max}
          value={value}
          describedBy={ariaProps["aria-describedby"]}
          invalid={Boolean(error)}
          onChange={onChange}
        />
      );
    case "repeater":
      return <RepeaterField {...props} field={field} />;
    case "group":
      return (
        <div className="border-border rounded-xl border p-4">
          <FieldList
            fields={field.fields}
            pathPrefix={path}
            values={asRecord(value)}
            errors={errors}
            onChange={onChange}
          />
        </div>
      );
  }
}

function FieldList({
  fields,
  pathPrefix,
  values,
  errors,
  onChange,
}: {
  fields: FieldConfig[];
  pathPrefix?: string;
  values: FormValues;
  errors: Record<string, string>;
  onChange: (values: FormValues) => void;
}) {
  return (
    <div className="space-y-5">
      {fields.map((field) => {
        const path = pathPrefix ? `${pathPrefix}.${field.name}` : field.name;
        const isGroup = field.kind === "group" || field.kind === "repeater";

        return (
          <div key={field.name} className="space-y-2">
            {isGroup ? (
              <p className="text-sm font-semibold">{field.label}</p>
            ) : (
              <Label htmlFor={path}>
                {field.label}
                {"optional" in field && field.optional ? (
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                ) : null}
              </Label>
            )}
            <FieldControl
              field={field}
              path={path}
              value={values[field.name]}
              errors={errors}
              onChange={(next) => onChange({ ...values, [field.name]: next })}
            />
            <FieldMessage id={path} help={field.help} error={errors[path]} />
          </div>
        );
      })}
    </div>
  );
}

export function ContentForm({
  fields,
  initialValues,
  action,
  submitLabel,
  cancelHref,
}: ContentFormProps) {
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState<AdminFormResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      // On success the action redirects, so a return value means it failed.
      setResult(await action(values));
    });
  }

  const unmatchedErrors = Object.entries(result?.fieldErrors ?? {}).filter(
    ([path]) => !path.includes(".") && !fields.some((f) => f.name === path),
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {result ? (
        <div
          role="alert"
          className="border-destructive/40 bg-destructive/10 text-destructive rounded-xl border px-4 py-3 text-sm"
        >
          <p className="font-semibold">{result.message}</p>
          {unmatchedErrors.map(([path, message]) => (
            <p key={path}>{message}</p>
          ))}
        </div>
      ) : null}

      <FieldList
        fields={fields}
        values={values}
        errors={result?.fieldErrors ?? {}}
        onChange={setValues}
      />

      <div className="bg-background/90 border-border sticky bottom-0 flex flex-wrap gap-3 border-t py-4 backdrop-blur">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : submitLabel}
        </Button>
        <Button asChild variant="outline">
          <Link href={cancelHref}>Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
