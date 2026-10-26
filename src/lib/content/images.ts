import "server-only";

import { del, get, put } from "@vercel/blob";

import { getBlobPathname, getPrivateBlobUrl } from "@/lib/content/schema";

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

type ImageContentType = "image/webp" | "image/jpeg" | "image/png";
type BlobAccess = "public" | "private";

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

// A Blob store is either public or private and rejects the other kind of
// upload. Remember which one worked so later uploads go straight there.
let storeAccess: BlobAccess | undefined;

async function upload(
  access: BlobAccess,
  bytes: Uint8Array,
  contentType: ImageContentType,
) {
  const blob = await put(
    `projects/screenshot.${extensions[contentType]}`,
    Buffer.from(bytes),
    {
      access,
      contentType,
      addRandomSuffix: true,
      // Each upload gets a unique URL, so it can be cached for a year.
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    },
  );

  return access === "public" ? blob.url : getPrivateBlobUrl(blob.pathname);
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

  const attempts: BlobAccess[] = storeAccess
    ? [storeAccess]
    : ["public", "private"];
  let lastError: unknown;

  for (const access of attempts) {
    try {
      const url = await upload(access, bytes, contentType);
      storeAccess = access;
      return { ok: true, url };
    } catch (error) {
      lastError = error;
    }
  }

  console.error("Vercel Blob upload failed", lastError);
  return {
    ok: false,
    message: `Vercel Blob rejected the upload: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`,
  };
}

/** Streams a screenshot from a private Blob store, or null if it's missing. */
export async function getPrivateImage(pathname: string) {
  const result = await get(pathname, { access: "private" });

  return result?.statusCode === 200 ? result : null;
}

/** Deletes uploaded screenshots from Vercel Blob. */
export async function deleteImagesByUrl(urls: string[]) {
  const pathnames = urls
    .map(getBlobPathname)
    .filter((pathname): pathname is string => pathname !== null);

  if (pathnames.length === 0 || !isBlobConfigured()) {
    return;
  }

  try {
    await del(pathnames);
  } catch (error) {
    // A leftover file only costs storage, so don't fail the save over it.
    console.error("Could not delete images from Vercel Blob", error);
  }
}
