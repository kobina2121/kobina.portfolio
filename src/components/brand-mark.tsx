import { cn } from "@/lib/utils";

/**
 * The Split K mark: a straight stem in the text color (black in light mode,
 * white in dark mode) and a chevron in the accent color. Decorative by
 * default; pass `alt` when it stands alone as a link or image.
 */
export function BrandMark({
  className,
  alt,
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <svg
      viewBox="16 6 76 88"
      className={cn("w-auto text-zinc-950 dark:text-white", className)}
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
    >
      <rect x="22" y="14" width="14" height="72" fill="currentColor" />
      <polyline
        points="80,14 46,50 80,86"
        fill="none"
        stroke="var(--accent-brand)"
        strokeWidth="14"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
