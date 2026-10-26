import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content/schema";

type ProjectCardProps = {
  project: Project;
  index?: number;
  variant?: "compact" | "featured";
};

export function ProjectCard({
  project,
  index = 0,
  variant = "featured",
}: ProjectCardProps) {
  const isCompact = variant === "compact";
  const [cover] = project.screenshots;

  return (
    <article
      className={
        isCompact
          ? "group hover:border-accent-brand border border-zinc-950/20 bg-white/70 transition-colors motion-safe:transition-transform motion-safe:duration-300 motion-safe:focus-within:-translate-y-1 motion-safe:hover:-translate-y-1 dark:border-white/35 dark:bg-black"
          : "group hover:border-accent-brand/70 overflow-hidden rounded-[1.75rem] border border-zinc-950/10 bg-white/70 transition hover:bg-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:focus-within:-translate-y-1 motion-safe:hover:-translate-y-1 dark:border-white/12 dark:bg-white/[0.035] dark:hover:bg-white/[0.055]"
      }
    >
      <Link
        href={`/projects/${project.slug}`}
        className="focus-visible:outline-accent-brand block focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <div
          className={`relative flex ${isCompact ? "aspect-[1.55]" : "aspect-[1.35]"} items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}
        >
          {cover ? (
            <>
              <Image
                src={cover}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition duration-500 motion-safe:group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <h3 className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                {project.title}
              </h3>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_30%),linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
              <div className="relative rounded-2xl border border-white/20 bg-black/65 px-6 py-4 text-center text-white shadow-2xl backdrop-blur-sm">
                <p className="text-xs text-zinc-400">0{index + 1}</p>
                <h3
                  className={
                    isCompact
                      ? "mt-1 text-lg font-black"
                      : "mt-1 text-xl font-black"
                  }
                >
                  {project.title}
                </h3>
              </div>
            </>
          )}
        </div>
      </Link>

      <div
        className={
          isCompact
            ? "border-t border-zinc-950/15 p-4 dark:border-white/25"
            : "p-6"
        }
      >
        <div className="mb-5 flex items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-500">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        {!isCompact && (
          <h2 className="text-xl font-black text-zinc-950 dark:text-white">
            {project.title}
          </h2>
        )}

        <p
          className={`${isCompact ? "min-h-16 text-xs" : "mt-3 text-sm"} leading-6 text-zinc-800 dark:text-zinc-300`}
        >
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="text-accent-brand text-xs font-semibold">
            {project.stack.join(", ")}
          </span>
          <Link
            href={`/projects/${project.slug}`}
            className="hover:border-accent-brand hover:text-accent-brand inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-950/15 px-4 py-2 text-xs text-zinc-950 dark:border-white/15 dark:text-white"
          >
            Case study
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
