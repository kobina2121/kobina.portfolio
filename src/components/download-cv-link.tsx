"use client";

import { Download } from "lucide-react";
import { trackPortfolioEvent } from "@/lib/analytics/events";
import { CV_FILE_NAME, CV_PUBLIC_PATH, CV_VERSION } from "@/lib/cv";
import { cn } from "@/lib/utils";

type DownloadCvLinkProps = {
  className?: string;
  label?: string;
  source?: string;
};

export function DownloadCvLink({
  className,
  label = "Download CV",
  source = "portfolio",
}: DownloadCvLinkProps) {
  return (
    <a
      href={CV_PUBLIC_PATH}
      download={CV_FILE_NAME}
      onClick={() =>
        trackPortfolioEvent("download_cv", {
          cvVersion: CV_VERSION,
          source,
        })
      }
      className={cn(
        "hover:border-accent-brand hover:text-accent-brand focus-visible:outline-accent-brand inline-flex min-h-11 items-center gap-2 border border-zinc-950/25 px-4 py-2 text-xs font-semibold text-zinc-950 transition focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-white/35 dark:text-white",
        className,
      )}
      aria-label={`${label} as PDF, version ${CV_VERSION}`}
    >
      {label}
      <Download className="size-3.5" aria-hidden="true" />
    </a>
  );
}
