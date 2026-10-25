import Image from "next/image";

import { imageAssets } from "@/lib/content/static-content";
import { cn } from "@/lib/utils";

function getMark(key: string) {
  const asset = imageAssets.find((image) => image.key === key);

  if (!asset) {
    throw new Error(`Missing image asset: ${key}`);
  }

  return asset;
}

const darkMark = getMark("kobina-logo");
const lightMark = getMark("kobina-logo-light");

/**
 * The K mark, navy on light backgrounds and white in dark mode. Decorative by
 * default because it usually sits next to the "Kobina" wordmark.
 */
export function BrandMark({
  className,
  alt = "",
  priority = false,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={darkMark.src}
        alt={alt}
        width={darkMark.width}
        height={darkMark.height}
        priority={priority}
        className={cn("w-auto dark:hidden", className)}
      />
      <Image
        src={lightMark.src}
        alt={alt}
        width={lightMark.width}
        height={lightMark.height}
        priority={priority}
        className={cn("hidden w-auto dark:block", className)}
      />
    </>
  );
}
