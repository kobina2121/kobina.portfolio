import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { Project } from "@/lib/content/schema";
import { getExternalLinkAttributes } from "@/lib/links";

type ProjectCardProps = {
  project: Project;
  index?: number;
  total?: number;
};

const linkClassName =
  "hover:text-accent-brand inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-zinc-700 transition-colors dark:text-zinc-300";

export function ProjectCard({ project, index = 0, total }: ProjectCardProps) {
  const [cover] = project.screenshots;
  const primaryUrl = project.liveUrl ?? project.sourceUrl;

  return (
    <article className="group hover:border-accent-brand flex h-full flex-col overflow-hidden border border-zinc-950/15 bg-white/70 transition-colors dark:border-white/20 dark:bg-white/[0.03]">
      <div
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-zinc-950/15 bg-gradient-to-br dark:border-white/20 ${project.accent}`}
      >
        {cover ? (
          <Image
            src={cover}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <span className="rounded-2xl border border-white/20 bg-black/65 px-5 py-3 text-lg font-black text-white backdrop-blur-sm">
            {project.title}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-center justify-between font-mono text-[0.68rem] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-3">
            {project.liveUrl ? (
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Live
              </span>
            ) : null}
            <span className="text-zinc-500">{project.year}</span>
          </span>
          {total ? (
            <span className="text-zinc-500">
              {index + 1}/{total}
            </span>
          ) : null}
        </div>

        <h3 className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">
          {primaryUrl ? (
            <Link
              href={primaryUrl}
              {...getExternalLinkAttributes(primaryUrl)}
              className="hover:text-accent-brand inline-flex items-center gap-1.5 transition-colors"
            >
              {project.title}
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-1 font-mono text-xs text-zinc-500">
          {project.category}
        </p>
        <p className="mt-4 flex-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {project.description}
        </p>

        <div className="mt-5 border-t border-zinc-950/15 pt-4 dark:border-white/15">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.map((tool) => (
              <li
                key={tool}
                className="border border-zinc-950/20 px-2 py-1 font-mono text-[0.62rem] tracking-wide text-zinc-700 uppercase dark:border-white/20 dark:text-zinc-300"
              >
                {tool}
              </li>
            ))}
          </ul>

          {project.sourceUrl || project.liveUrl ? (
            <div className="mt-3 flex justify-end gap-4">
              {project.sourceUrl ? (
                <Link
                  href={project.sourceUrl}
                  {...getExternalLinkAttributes(project.sourceUrl)}
                  aria-label={`${project.title} source code (opens in a new tab)`}
                  className={linkClassName}
                >
                  <FaGithub className="size-4" aria-hidden="true" />
                  Code
                </Link>
              ) : null}
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  {...getExternalLinkAttributes(project.liveUrl)}
                  aria-label={`${project.title} live site (opens in a new tab)`}
                  className={linkClassName}
                >
                  <Globe className="size-4" aria-hidden="true" />
                  Live
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
