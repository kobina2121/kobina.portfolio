import "server-only";

import { del, put } from "@vercel/blob";

import { isBlobImageUrl } from "@/lib/content/schema";

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

type ImageContentType = "image/webp" | "image/jpeg" | "image/png";

const extensions: Record<ImageContentType, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Checks the file's first bytes rather than trusting the browser's label, so
// only real raster images are uploaded.
function detectContentType(bytes: Uint8Array): ImageContentType | null {
  const ascii = (start: number, end: number) =>
    String.fromCharCode(...bytes.subarray(start, end));

  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (ascii(1, 4) === "PNG" && bytes[0] === 0x89) return "image/png";

  return null;
}

/** Uploads use the token Vercel adds when a Blob store is connected. */
export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export type SaveImageResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

export async function saveImage(bytes: Uint8Array): Promise<SaveImageResult> {
  if (bytes.byteLength === 0) {
    return { ok: false, message: "That file is empty." };
  }

  if (bytes.byteLength > MAX_IMAGE_BYTES) {
    return { ok: false, message: "Images must be smaller than 4 MB." };
  }

  const contentType = detectContentType(bytes);

  if (!contentType) {
    return { ok: false, message: "Upload a PNG, JPEG, or WebP image." };
  }

  if (!isBlobConfigured()) {
    return {
      ok: false,
      message:
        "Image uploads need BLOB_READ_WRITE_TOKEN. Connect a Vercel Blob store and add its token.",
    };
  }

  try {
    const blob = await put(
      `projects/screenshot.${extensions[contentType]}`,
      Buffer.from(bytes),
      {
        access: "public",
        contentType,
        addRandomSuffix: true,
        // Each upload gets a unique URL, so it can be cached for a year.
        cacheControlMaxAge: 60 * 60 * 24 * 365,
      },
    );

    return { ok: true, url: blob.url };
  } catch (error) {
    console.error("Vercel Blob upload failed", error);
    return {
      ok: false,
      message: "The upload to Vercel Blob failed. Please try again.",
    };
  }
}

/** Deletes uploaded screenshots from Vercel Blob by URL. */
export async function deleteImagesByUrl(urls: string[]) {
  const blobUrls = urls.filter(isBlobImageUrl);

  if (blobUrls.length === 0 || !isBlobConfigured()) {
    return;
  }

  try {
    await del(blobUrls);
  } catch (error) {
    // A leftover file only costs storage, so don't fail the save over it.
    console.error("Could not delete images from Vercel Blob", error);
  }
}
