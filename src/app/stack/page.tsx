import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SiteNavbar } from "@/components/site-navbar";
import { getSkillItems } from "@/lib/portfolio-content";
import { skillIconMap } from "@/lib/skill-icons";
import { groupStack } from "@/lib/stack-groups";

export const metadata: Metadata = {
  title: "Stack — Kobina",
  description:
    "The frontend, backend, design, and data tools Kobina builds with.",
  alternates: {
    canonical: "/stack",
  },
};

const focusAreas = [
  "Responsive interfaces",
  "Component systems",
  "Interactive experiences",
  "Clean implementation",
] as const;

export default async function StackPage() {
  const skillItems = await getSkillItems();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen"
    >
      <SiteNavbar active="stack" />

      <Container as="section" className="pt-32 pb-20">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.75fr] md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-4 py-2 text-xs text-zinc-600 dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-400">
              <BadgeCheck
                className="text-accent-brand size-3.5"
                aria-hidden="true"
              />
              Technical Stack
            </p>
            <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-6xl">
              The stack behind{" "}
              <span className="text-zinc-500 dark:text-zinc-400">
                what I build.
              </span>
            </h1>
          </div>

          <div className="rounded-[1.5rem] border border-zinc-950/10 bg-white/60 p-5 dark:border-white/12 dark:bg-white/[0.04]">
            <p className="mb-4 text-sm font-semibold">Focus areas</p>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-zinc-950/10 bg-white px-3 py-2 text-xs text-zinc-700 dark:border-white/12 dark:bg-black dark:text-zinc-400"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {groupStack([...skillItems]).map((group) => (
            <section key={group.name} aria-labelledby={`stack-${group.name}`}>
              <h2
                id={`stack-${group.name}`}
                className="mb-5 text-2xl font-black tracking-tight"
              >
                {group.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map(({ label, icon, color, description }) => {
                  const Icon = skillIconMap[icon];

                  return (
                    <article
                      key={label}
                      className="group hover:border-accent-brand/70 rounded-[1.5rem] border border-zinc-950/10 bg-white/70 p-5 transition hover:bg-white dark:border-white/12 dark:bg-white/[0.035] dark:hover:bg-white/[0.055]"
                    >
                      <div className="mb-8 flex size-14 items-center justify-center rounded-2xl border border-zinc-950/10 bg-white dark:border-white/12 dark:bg-black">
                        <Icon
                          className={`size-8 ${color}`}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-xl font-black text-zinc-950 dark:text-white">
                        {label}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-400">
                        {description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-zinc-950/10 bg-gradient-to-br from-white/80 to-transparent p-6 sm:p-8 dark:border-white/12 dark:from-white/[0.06]">
          <h2 className="text-2xl font-black">Need this stack on a project?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700 dark:text-zinc-400">
            I can help shape the interface, implement the application, and
            connect the experience into real product workflows.
          </p>
          <Link
            href="/#contact-me"
            className="hover:border-accent-brand hover:text-accent-brand mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold dark:border-white/15"
          >
            Contact me
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
