import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { projects } from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "Projects — Kobina",
  description:
    "Selected portfolio projects by Kobina, including frontend, dashboard, and product interface work.",
};

export default function ProjectsPage() {
  return (
    <main className="homepage-font bg-background text-foreground min-h-screen">
      <SiteNavbar active="projects" />

      <section className="mx-auto w-full max-w-6xl px-5 pt-32 pb-20 sm:px-8 lg:px-10">
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

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[1.75rem] border border-zinc-950/10 bg-white/70 transition hover:border-[#d76bff]/70 hover:bg-white dark:border-white/12 dark:bg-white/[0.035] dark:hover:bg-white/[0.055]"
            >
              <div
                className={`relative flex aspect-[1.35] items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_30%),linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
                <div className="relative rounded-2xl border border-white/20 bg-black/65 px-6 py-4 text-center text-white shadow-2xl backdrop-blur-sm">
                  <p className="text-xs text-zinc-400">0{index + 1}</p>
                  <h2 className="mt-1 text-xl font-black">{project.title}</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5 flex items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-500">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
                <p className="text-sm leading-6 text-zinc-800 dark:text-zinc-300">
                  {project.description}
                </p>
                <p className="mt-4 text-xs leading-5 text-zinc-700 dark:text-zinc-500">
                  {project.outcome}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#d76bff]">
                    {project.stack}
                  </span>
                  <Link
                    href="/#contact-me"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-950/15 px-3 py-2 text-xs text-zinc-950 hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15 dark:text-white"
                  >
                    Discuss
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
