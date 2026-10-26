import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/projects/project-card";
import { SiteNavbar } from "@/components/site-navbar";
import { getExternalLinkAttributes, isExternalHref } from "@/lib/links";
import { absoluteUrl } from "@/lib/site-url";
import {
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
  getSiteConfig,
} from "@/lib/portfolio-content";
import { getProjectJsonLd } from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getAllProjects()).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
      description: project.description,
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
      description: project.description,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
  };
}

function ProjectActionLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      {...getExternalLinkAttributes(href)}
      aria-label={
        isExternalHref(href) ? `${label} (opens in a new tab)` : label
      }
      className="hover:border-accent-brand hover:text-accent-brand inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold dark:border-white/15"
    >
      {label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [site, relatedProjects, { previous, next }] = await Promise.all([
    getSiteConfig(),
    getRelatedProjects(project.slug),
    getAdjacentProjects(project.slug),
  ]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen"
    >
      <SiteNavbar active="projects" />
      <JsonLd id="project-json-ld" data={getProjectJsonLd(project, site)} />

      <Container className="pt-32 pb-20">
        <Link
          href="/projects"
          className="hover:text-accent-brand mb-10 inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400"
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
            <p className="text-accent-brand text-xs font-semibold">My role</p>
            <p className="mt-3 text-sm leading-7 text-zinc-800 dark:text-zinc-300">
              {project.role}
            </p>
          </div>
        </section>

        <section
          className={`mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-br ${project.accent} p-8 text-white shadow-2xl`}
          aria-label={`${project.title} visual summary`}
        >
          <div className="max-w-xl rounded-3xl border border-white/20 bg-black/60 p-6 backdrop-blur-sm">
            <p className="text-xs text-zinc-300">{project.category}</p>
            <h2 className="mt-2 text-3xl font-black">{project.title}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            ["Problem", project.problem],
            ["Solution", project.solution],
          ].map(([title, body]) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-zinc-950/10 bg-white/70 p-6 dark:border-white/12 dark:bg-white/[0.04]"
            >
              <h2 className="text-2xl font-black">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {body}
              </p>
            </article>
          ))}
        </section>

        {project.screenshots.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-black">Screenshots</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {project.screenshots.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={1920}
                  height={1080}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`h-auto w-full rounded-[1.5rem] border border-zinc-950/10 dark:border-white/12 ${index === 0 && project.screenshots.length % 2 === 1 ? "md:col-span-2" : ""}`}
                />
              ))}
            </div>
          </section>
        ) : null}

        {project.liveUrl || project.sourceUrl ? (
          <section className="mt-14 flex flex-wrap gap-4">
            {project.liveUrl ? (
              <ProjectActionLink
                label="View live site"
                href={project.liveUrl}
              />
            ) : null}
            {project.sourceUrl ? (
              <ProjectActionLink
                label="View source code"
                href={project.sourceUrl}
              />
            ) : null}
          </section>
        ) : null}

        <nav
          className="mt-14 grid gap-4 border-y border-zinc-950/10 py-6 md:grid-cols-2 dark:border-white/12"
          aria-label="Project navigation"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group hover:text-accent-brand flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-400"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>
                Previous
                <strong className="block text-zinc-950 underline-offset-4 group-hover:underline dark:text-white">
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
              className="group hover:text-accent-brand flex items-center gap-3 text-sm text-zinc-700 md:justify-end dark:text-zinc-400"
            >
              <span className="text-left md:text-right">
                Next
                <strong className="block text-zinc-950 underline-offset-4 group-hover:underline dark:text-white">
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
