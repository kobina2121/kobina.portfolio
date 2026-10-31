"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ImagePlus, Trash2 } from "lucide-react";

import { uploadImageAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/admin/compress-image";
import type { ImageFolder } from "@/lib/content/schema";

type ImagesFieldProps = {
  id: string;
  label: string;
  max: number;
  folder: ImageFolder;
  /** What one image is called, e.g. "preview image" or "photo". */
  itemLabel: string;
  value: unknown;
  describedBy?: string;
  invalid: boolean;
  onChange: (urls: string[]) => void;
};

function asUrls(value: unknown) {
  return Array.isArray(value)
    ? value.filter((url): url is string => typeof url === "string")
    : [];
}

export function ImagesField({
  id,
  label,
  max,
  folder,
  itemLabel,
  value,
  describedBy,
  invalid,
  onChange,
}: ImagesFieldProps) {
  const urls = asUrls(value);
  // A single-image field (like the profile photo) replaces its image instead
  // of filling up.
  const isSingle = max === 1;
  const isFull = !isSingle && urls.length >= max;
  const [uploadingCount, setUploadingCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Uploads finish after later renders, so keep the newest value and
  // onChange around instead of the ones captured when the upload started.
  const latest = useRef({ urls, onChange });

  useEffect(() => {
    latest.current = { urls, onChange };
  });

  async function handleFiles(files: File[]) {
    const room = isSingle ? 1 : max - latest.current.urls.length;
    const chosen = files.slice(0, Math.max(room, 0));

    setMessage(
      files.length > chosen.length
        ? `You can add up to ${max} ${itemLabel}s.`
        : null,
    );
    setUploadingCount(chosen.length);

    for (const file of chosen) {
      try {
        const formData = new FormData();
        formData.append("file", await compressImage(file), file.name);
        formData.append("folder", folder);

        const result = await uploadImageAction(formData);

        if (result.ok) {
          const next = isSingle
            ? [result.url]
            : [...latest.current.urls, result.url];
          latest.current.urls = next;
          latest.current.onChange(next);
        } else {
          setMessage(result.message);
        }
      } catch {
        setMessage(`Couldn't upload ${file.name}. Try a PNG or JPEG.`);
      }

      setUploadingCount((count) => count - 1);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function move(index: number, offset: number) {
    const next = [...urls];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {urls.length > 0 ? (
        <ul
          className={
            isSingle ? "w-40" : "grid grid-cols-2 gap-3 sm:grid-cols-3"
          }
        >
          {urls.map((url, index) => (
            <li
              key={url}
              className="border-border overflow-hidden rounded-xl border"
            >
              <div
                className={`bg-muted relative ${isSingle ? "aspect-square" : "aspect-video"}`}
              >
                <Image
                  src={url}
                  alt={`${label} ${index + 1}`}
                  fill
                  sizes="240px"
                  className="object-cover object-top"
                />
                {!isSingle && index === 0 ? (
                  <span className="absolute top-2 left-2 rounded-full bg-black/75 px-2 py-0.5 text-[0.65rem] font-semibold text-white">
                    Cover
                  </span>
                ) : null}
              </div>
              <div className="flex justify-end gap-1 p-1.5">
                {!isSingle ? (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={index === 0}
                      aria-label={`Move ${itemLabel} ${index + 1} earlier`}
                      onClick={() => move(index, -1)}
                    >
                      <ArrowLeft />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={index === urls.length - 1}
                      aria-label={`Move ${itemLabel} ${index + 1} later`}
                      onClick={() => move(index, 1)}
                    >
                      <ArrowRight />
                    </Button>
                  </>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={
                    isSingle
                      ? `Remove ${itemLabel}`
                      : `Remove ${itemLabel} ${index + 1}`
                  }
                  onClick={() =>
                    onChange(urls.filter((_, urlIndex) => urlIndex !== index))
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={!isSingle}
        className="sr-only"
        aria-describedby={describedBy}
        aria-invalid={invalid}
        disabled={uploadingCount > 0 || isFull}
        onChange={(event) => handleFiles(Array.from(event.target.files ?? []))}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploadingCount > 0 || isFull}
        onClick={() => inputRef.current?.click()}
      >
        <ImagePlus />
        {uploadingCount > 0
          ? "Uploading…"
          : isSingle
            ? urls.length > 0
              ? `Replace ${itemLabel}`
              : `Upload ${itemLabel}`
            : isFull
              ? `${max} ${itemLabel}s added`
              : `Upload ${itemLabel}s`}
      </Button>
      {message ? (
        <p role="alert" className="text-destructive text-xs font-medium">
          {message}
        </p>
      ) : null}
    </div>
  );
}
