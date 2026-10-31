import { cn } from "@/lib/utils";

/**
 * A picture frame for the profile photo: a thin border with a little padding,
 * and an accent outline offset behind it.
 */
export function PhotoFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="border-accent-brand absolute inset-0 translate-x-3 translate-y-3 border"
      />
      <div className="relative border border-zinc-950/25 bg-white/80 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.12)] dark:border-white/30 dark:bg-zinc-950/80 dark:shadow-[0_18px_45px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  );
}
