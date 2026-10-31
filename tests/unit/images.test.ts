// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const blob = vi.hoisted(() => ({
  put: vi.fn(),
  del: vi.fn(),
  get: vi.fn(),
}));

vi.mock("@vercel/blob", () => blob);

const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);
const pathname = "projects/screenshot-x1y2.png";
const publicUrl = `https://abc123.public.blob.vercel-storage.com/${pathname}`;

// images.ts remembers whether the store is public or private, so each test
// loads a fresh copy.
async function loadImages() {
  vi.resetModules();
  return import("@/lib/content/images");
}

describe("screenshot storage", () => {
  beforeEach(() => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "test-token");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    blob.put.mockReset();
    blob.del.mockReset();
  });

  it("links files in a public store directly", async () => {
    blob.put.mockResolvedValue({ url: publicUrl, pathname });
    const { saveImage } = await loadImages();

    expect(await saveImage(png)).toEqual({ ok: true, url: publicUrl });
    expect(blob.put).toHaveBeenCalledWith(
      "projects/preview.png",
      expect.any(Buffer),
      expect.objectContaining({
        access: "public",
        contentType: "image/png",
        addRandomSuffix: true,
      }),
    );
  });

  it("falls back to a private store and serves it through the site", async () => {
    blob.put
      .mockRejectedValueOnce(
        new Error("Cannot use public access on a private store"),
      )
      .mockResolvedValue({ url: "ignored", pathname });
    const { saveImage } = await loadImages();

    expect(await saveImage(png)).toEqual({
      ok: true,
      url: `/api/blob/${pathname}`,
    });
    expect(blob.put).toHaveBeenLastCalledWith(
      "projects/preview.png",
      expect.any(Buffer),
      expect.objectContaining({ access: "private" }),
    );

    // The next upload goes straight to the private store.
    blob.put.mockClear();
    await saveImage(png);
    expect(blob.put).toHaveBeenCalledTimes(1);
  });

  it("stores profile photos in their own folder", async () => {
    const photoUrl =
      "https://abc123.public.blob.vercel-storage.com/profile/photo-x1y2.png";
    blob.put.mockResolvedValue({
      url: photoUrl,
      pathname: "profile/photo-x1y2.png",
    });
    const { saveImage, deleteImagesByUrl } = await loadImages();

    expect(await saveImage(png, "profile")).toEqual({
      ok: true,
      url: photoUrl,
    });
    expect(blob.put).toHaveBeenCalledWith(
      "profile/photo.png",
      expect.any(Buffer),
      expect.objectContaining({ access: "public" }),
    );

    await deleteImagesByUrl([photoUrl]);
    expect(blob.del).toHaveBeenCalledWith(["profile/photo-x1y2.png"]);
  });

  it("shows Vercel Blob's reason when every upload fails", async () => {
    blob.put.mockRejectedValue(new Error("This store has been suspended."));
    const { saveImage } = await loadImages();

    expect(await saveImage(png)).toEqual({
      ok: false,
      message:
        "Vercel Blob rejected the upload: This store has been suspended.",
    });
  });

  it("rejects files that are not PNG, JPEG, or WebP", async () => {
    const { saveImage } = await loadImages();
    const svg = new TextEncoder().encode("<svg onload=alert(1)></svg>");

    expect(await saveImage(svg)).toMatchObject({ ok: false });
    expect(await saveImage(new Uint8Array())).toMatchObject({ ok: false });
    expect(blob.put).not.toHaveBeenCalled();
  });

  it("explains when the Blob token is missing", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
    const { saveImage } = await loadImages();

    expect(await saveImage(png)).toMatchObject({
      ok: false,
      message: expect.stringContaining("BLOB_READ_WRITE_TOKEN"),
    });
  });

  it("deletes public and private screenshots by pathname", async () => {
    const { deleteImagesByUrl } = await loadImages();

    await deleteImagesByUrl([
      publicUrl,
      "/api/blob/projects/other-a1b2.webp",
      "https://example.com/not-ours.png",
    ]);

    expect(blob.del).toHaveBeenCalledWith([
      pathname,
      "projects/other-a1b2.webp",
    ]);
  });
});
