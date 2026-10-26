const MAX_WIDTH = 1920;
const QUALITY = 0.85;

function toBlob(canvas: HTMLCanvasElement, type: string) {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, QUALITY),
  );
}

/**
 * Shrinks a screenshot in the browser before upload: at most 1920px wide,
 * saved as WebP (or JPEG where the browser can't write WebP). Keeps uploads
 * well under the server's request size limit.
 */
export async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");

  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const webp = await toBlob(canvas, "image/webp");

  if (webp?.type === "image/webp") {
    return webp;
  }

  return (await toBlob(canvas, "image/jpeg")) ?? file;
}
