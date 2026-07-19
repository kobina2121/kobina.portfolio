"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { trackPortfolioEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > 640);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    trackPortfolioEvent("back_to_top");
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed right-5 bottom-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-zinc-950/15 bg-white/90 text-zinc-950 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-200 hover:border-[#d76bff] hover:text-[#d76bff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d76bff] dark:border-white/15 dark:bg-black/90 dark:text-white",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="size-4" aria-hidden="true" />
    </button>
  );
}
