import type { Metadata } from "next";
import { Suspense } from "react";
import { Layers3 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProjectDiscovery } from "@/components/projects/project-discovery";
import { SiteNavbar } from "@/components/site-navbar";
import { getAllProjects } from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "Projects — Kobina",
  description:
    "Selected portfolio projects by Kobina, including full-stack, dashboard, and product interface work.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen"
    >
      <SiteNavbar active="projects" />

      <Container as="section" className="pt-32 pb-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-4 py-2 text-xs text-zinc-600 dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-400">
            <Layers3 className="size-3.5 text-[#d76bff]" aria-hidden="true" />
            Selected Work
          </p>
          <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-6xl">
            Projects built with{" "}
            <span className="bg-gradient-to-r from-[#d76bff] to-[#ff79c6] bg-clip-text text-transparent">
              taste, clarity, and purpose.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-700 dark:text-zinc-400">
            A focused collection of interfaces, dashboards, and product ideas
            shaped around clean visuals, strong hierarchy, and practical user
            flows.
          </p>
        </div>

        <Suspense fallback={null}>
          <ProjectDiscovery projects={projects} />
        </Suspense>
      </Container>
    </main>
  );
}
