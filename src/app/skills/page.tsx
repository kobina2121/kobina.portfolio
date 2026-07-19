import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";
import { SiFirebase, SiMysql } from "react-icons/si";
import { SiteNavbar } from "@/components/site-navbar";
import { skillItems } from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "Skills — Kobina",
  description:
    "Explore Kobina's frontend, backend, design, database, and workflow skills.",
};

const skillIconMap = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJs,
  react: FaReact,
  node: FaNodeJs,
  figma: FaFigma,
  git: FaGitAlt,
  mysql: SiMysql,
  firebase: SiFirebase,
  java: FaJava,
};

const focusAreas = [
  "Responsive interfaces",
  "Component systems",
  "Interactive experiences",
  "Clean implementation",
] as const;

export default function SkillsPage() {
  return (
    <main className="homepage-font bg-background text-foreground min-h-screen">
      <SiteNavbar active="skills" />

      <section className="mx-auto w-full max-w-6xl px-5 pt-32 pb-20 sm:px-8 lg:px-10">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.75fr] md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-4 py-2 text-xs text-zinc-600 dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-400">
              <BadgeCheck
                className="size-3.5 text-[#d76bff]"
                aria-hidden="true"
              />
              Technical Stack
            </p>
            <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-6xl">
              Skills for building{" "}
              <span className="bg-gradient-to-r from-[#d76bff] to-[#ff79c6] bg-clip-text text-transparent">
                modern web experiences.
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillItems.map(({ label, icon, color, category, description }) => {
            const Icon = skillIconMap[icon];

            return (
              <article
                key={label}
                className="group rounded-[1.5rem] border border-zinc-950/10 bg-white/70 p-5 transition hover:border-[#d76bff]/70 hover:bg-white dark:border-white/12 dark:bg-white/[0.035] dark:hover:bg-white/[0.055]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-zinc-950/10 bg-white dark:border-white/12 dark:bg-black">
                    <Icon className={`size-8 ${color}`} aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-zinc-950/10 px-3 py-1.5 text-xs text-zinc-700 dark:border-white/12 dark:text-zinc-500">
                    {category}
                  </span>
                </div>
                <h2 className="text-xl font-black text-zinc-950 dark:text-white">
                  {label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-400">
                  {description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-zinc-950/10 bg-gradient-to-br from-white/80 to-transparent p-6 sm:p-8 dark:border-white/12 dark:from-white/[0.06]">
          <h2 className="text-2xl font-black">
            Need these skills on a project?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700 dark:text-zinc-400">
            I can help shape the interface, implement the frontend, and connect
            the experience into real product workflows.
          </p>
          <Link
            href="/#contact-me"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15"
          >
            Contact me
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
