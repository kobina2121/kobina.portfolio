"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { SiteNavbar } from "@/components/site-navbar";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen"
    >
      <SiteNavbar active="home" />
      <Container className="flex min-h-[80vh] items-center justify-center pt-32 pb-20">
        <EmptyState
          title="Something broke softly."
          description="The page hit an unexpected issue. Try again, or head back home while I smooth it out."
        />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-[#d76bff] dark:bg-white dark:text-zinc-950"
          >
            <RefreshCcw className="size-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15"
          >
            Back home
          </Link>
        </div>
      </Container>
    </main>
  );
}
