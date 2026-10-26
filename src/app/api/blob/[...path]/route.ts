import { NextResponse } from "next/server";

import { getPrivateImage, isBlobConfigured } from "@/lib/content/images";
import { getBlobPathname, getPrivateBlobUrl } from "@/lib/content/schema";

export const runtime = "nodejs";

// Serves screenshots from a private Vercel Blob store. Only uploaded project
// screenshots (projects/...) can be read through this route.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathname = getBlobPathname(getPrivateBlobUrl(path.join("/")));
  const image =
    pathname && isBlobConfigured() ? await getPrivateImage(pathname) : null;

  if (!image) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(image.stream, {
    headers: {
      "Content-Type": image.blob.contentType,
      // Every upload gets a unique pathname, so the bytes never change.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
