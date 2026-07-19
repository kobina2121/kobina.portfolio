import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/projects/project-card";
import { SiteNavbar } from "@/components/site-navbar";
import { absoluteUrl } from "@/lib/site-url";
import {
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
  type ProjectLink,
} from "@/lib/portfolio-content";
import { getProjectJsonLd } from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found — Kobina",
    };
  }

  return {
    title: `${project.title} Case Study — Kobina`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study — Kobina`,
      description: project.outcome,
      url: absoluteUrl(`/projects/${project.slug}`),
      type: "article",
      images: [
        {
          url: `/projects/${project.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} case study preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study — Kobina`,
      description: project.outcome,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
  };
}

function ProjectActionLink({ link }: { link: ProjectLink }) {
  if (!link.href) {
    return (
      <div className="rounded-2xl border border-zinc-950/10 bg-zinc-950/[0.04] p-4 text-sm text-zinc-700 dark:border-white/12 dark:bg-white/[0.04] dark:text-zinc-400">
        <p className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-white">
          <Lock className="size-4" aria-hidden="true" />
          {link.label}
        </p>
        <p className="mt-2 text-xs leading-5">
          {link.unavailableReason ?? "This link is not available yet."}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15"
    >
      {link.label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug);
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen"
    >
      <SiteNavbar active="projects" />
      <JsonLd id="project-json-ld" data={getProjectJsonLd(project)} />

      <Container className="pt-32 pb-20">
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[#d76bff] dark:text-zinc-400"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-4 py-2 text-xs text-zinc-600 dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-400">
              {project.category} · {project.year}
            </p>
            <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-700 dark:text-zinc-400">
              {project.description}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-zinc-950/10 bg-white/70 p-5 dark:border-white/12 dark:bg-white/[0.04]">
            <p className="text-xs font-semibold text-[#d76bff]">Outcome</p>
            <p className="mt-3 text-sm leading-7 text-zinc-800 dark:text-zinc-300">
              {project.outcome}
            </p>
          </div>
        </section>

        <section
          className={`mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-br ${project.accent} p-8 text-white shadow-2xl`}
          aria-label={`${project.title} visual summary`}
        >
          <div className="max-w-xl rounded-3xl border border-white/20 bg-black/60 p-6 backdrop-blur-sm">
            <p className="text-xs text-zinc-300">{project.type}</p>
            <h2 className="mt-2 text-3xl font-black">{project.title}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            ["Context", project.context],
            ["Role", project.role],
            ["Problem", project.problem],
          ].map(([title, body]) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-zinc-950/10 bg-white/70 p-5 dark:border-white/12 dark:bg-white/[0.04]"
            >
              <h2 className="text-sm font-black text-zinc-950 dark:text-white">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-400">
                {body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <h2 className="text-2xl font-black">Constraints</h2>
            <ul className="mt-5 space-y-3">
              {project.constraints.map((constraint) => (
                <li
                  key={constraint}
                  className="flex gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300"
                >
                  <span
                    className="mt-3 size-1.5 shrink-0 bg-[#d76bff]"
                    aria-hidden="true"
                  />
                  {constraint}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-zinc-950/10 bg-white/70 p-6 dark:border-white/12 dark:bg-white/[0.04]">
            <h2 className="text-2xl font-black">Process</h2>
            <ol className="mt-6 space-y-5">
              {project.process.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-black text-white dark:bg-white dark:text-zinc-950">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-14 rounded-[1.75rem] border border-zinc-950/10 bg-white/70 p-6 dark:border-white/12 dark:bg-white/[0.04]">
          <h2 className="text-2xl font-black">Solution</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            {project.solution}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-black">Gallery</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {project.gallery.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden rounded-[1.5rem] border border-zinc-950/10 bg-white/70 dark:border-white/12 dark:bg-white/[0.04]"
              >
                <div
                  className={`flex aspect-[1.35] items-center justify-center bg-gradient-to-br ${item.accent} p-5`}
                >
                  <div className="rounded-2xl border border-white/20 bg-black/60 px-5 py-3 text-center text-sm font-black text-white shadow-2xl backdrop-blur-sm">
                    {item.title}
                  </div>
                </div>
                <figcaption className="p-5">
                  <p className="text-sm font-bold text-zinc-950 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-zinc-700 dark:text-zinc-400">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">Impact</h2>
            <ul className="mt-5 space-y-3">
              {project.impact.map((impact) => (
                <li
                  key={impact}
                  className="flex gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300"
                >
                  <span
                    className="mt-3 size-1.5 shrink-0 bg-[#d76bff]"
                    aria-hidden="true"
                  />
                  {impact}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-black">Lessons learned</h2>
            <ul className="mt-5 space-y-3">
              {project.lessons.map((lesson) => (
                <li
                  key={lesson}
                  className="flex gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300"
                >
                  <span
                    className="mt-3 size-1.5 shrink-0 bg-[#d76bff]"
                    aria-hidden="true"
                  />
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          <ProjectActionLink link={project.live} />
          <ProjectActionLink link={project.source} />
        </section>

        <nav
          className="mt-14 grid gap-4 border-y border-zinc-950/10 py-6 md:grid-cols-2 dark:border-white/12"
          aria-label="Project navigation"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex items-center gap-3 text-sm text-zinc-700 hover:text-[#d76bff] dark:text-zinc-400"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>
                Previous
                <strong className="block text-zinc-950 group-hover:text-[#d76bff] dark:text-white">
                  {previous.title}
                </strong>
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-3 text-sm text-zinc-700 hover:text-[#d76bff] md:justify-end dark:text-zinc-400"
            >
              <span className="text-left md:text-right">
                Next
                <strong className="block text-zinc-950 group-hover:text-[#d76bff] dark:text-white">
                  {next.title}
                </strong>
              </span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <section className="mt-14">
          <h2 className="text-2xl font-black">Related projects</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {relatedProjects.map((relatedProject, index) => (
              <ProjectCard
                key={relatedProject.slug}
                project={relatedProject}
                index={index}
              />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
