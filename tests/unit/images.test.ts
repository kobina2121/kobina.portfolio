// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const blob = vi.hoisted(() => ({
  put: vi.fn(),
  del: vi.fn(),
}));

vi.mock("@vercel/blob", () => blob);

import { deleteImagesByUrl, saveImage } from "@/lib/content/images";

const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);
const blobUrl =
  "https://abc123.public.blob.vercel-storage.com/projects/screenshot-x1y2.png";

describe("screenshot storage", () => {
  beforeEach(() => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "test-token");
    blob.put.mockResolvedValue({ url: blobUrl });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("uploads real images to Vercel Blob as public files", async () => {
    expect(await saveImage(png)).toEqual({ ok: true, url: blobUrl });
    expect(blob.put).toHaveBeenCalledWith(
      "projects/screenshot.png",
      expect.any(Buffer),
      expect.objectContaining({
        access: "public",
        contentType: "image/png",
        addRandomSuffix: true,
      }),
    );
  });

  it("rejects files that are not PNG, JPEG, or WebP", async () => {
    const svg = new TextEncoder().encode("<svg onload=alert(1)></svg>");

    expect(await saveImage(svg)).toMatchObject({ ok: false });
    expect(await saveImage(new Uint8Array())).toMatchObject({ ok: false });
    expect(blob.put).not.toHaveBeenCalled();
  });

  it("explains when the Blob token is missing", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");

    expect(await saveImage(png)).toMatchObject({
      ok: false,
      message: expect.stringContaining("BLOB_READ_WRITE_TOKEN"),
    });
  });

  it("reports a failed upload instead of crashing", async () => {
    blob.put.mockRejectedValue(new Error("network down"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(await saveImage(png)).toMatchObject({ ok: false });
  });

  it("deletes only Vercel Blob URLs", async () => {
    await deleteImagesByUrl([blobUrl, "https://example.com/other.png"]);

    expect(blob.del).toHaveBeenCalledWith([blobUrl]);
  });
});
