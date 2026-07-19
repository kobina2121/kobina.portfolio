import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { SiteNavbar } from "@/components/site-navbar";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen"
    >
      <SiteNavbar active="home" />
      <Container className="flex min-h-[80vh] items-center justify-center pt-32 pb-20">
        <div className="space-y-6 text-center">
          <EmptyState
            title="This page slipped out of frame."
            description="The page you’re looking for does not exist, moved, or is still being shaped."
          />
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
