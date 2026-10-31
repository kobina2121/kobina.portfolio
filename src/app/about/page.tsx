import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PhotoFrame } from "@/components/photo-frame";
import { SiteNavbar } from "@/components/site-navbar";
import {
  getAboutHighlights,
  getRequiredImageAsset,
  getSiteConfig,
} from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "About — Kobina",
  description:
    "Learn more about Kobina, a Ghana-based developer creating polished web experiences.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const [site, aboutHighlights] = await Promise.all([
    getSiteConfig(),
    getAboutHighlights(),
  ]);
  const formalPortrait = getRequiredImageAsset("formal-portrait");
  // An uploaded profile photo replaces the built-in portrait.
  const portraitSrc = site.profilePhoto[0] ?? formalPortrait.src;

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen overflow-hidden"
    >
      <SiteNavbar active="about" />

      <Container
        as="section"
        className="relative grid gap-12 pt-32 pb-20 md:grid-cols-[0.95fr_1.05fr] md:items-center"
      >
        <PhotoFrame className="mx-auto w-full max-w-sm">
          <div className="relative aspect-[0.82] overflow-hidden bg-gradient-to-b from-zinc-200 to-white dark:from-zinc-900 dark:to-black">
            <Image
              src={portraitSrc}
              alt={formalPortrait.alt}
              fill
              priority
              sizes="(min-width: 768px) 360px, 80vw"
              className="object-cover object-top"
            />
          </div>
        </PhotoFrame>

        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-4 py-2 text-xs text-zinc-600 dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-400">
            <MapPin className="text-accent-brand size-3.5" aria-hidden="true" />
            Based in {site.location}
          </p>
          <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-6xl">
            I build interfaces that feel{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              sharp, calm, and useful.
            </span>
          </h1>
          <div className="mt-6 max-w-2xl space-y-5 text-sm leading-7 text-zinc-700 dark:text-zinc-400">
            <p>
              Hello, I&apos;m Kobina — a full stack developer with a strong eye
              for visual systems, interaction details, and responsive product
              experiences.
            </p>
            <p>
              I like building websites that are simple to understand, polished
              enough to remember, and practical enough to ship.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {site.aboutStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-zinc-950/10 bg-white/60 p-4 dark:border-white/12 dark:bg-white/[0.04]"
              >
                <p className="text-xs text-zinc-600 dark:text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {aboutHighlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 text-sm text-zinc-800 dark:text-zinc-300"
              >
                <span
                  className="bg-accent-brand mt-[7px] size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                {highlight}
              </div>
            ))}
          </div>

          <Link
            href="/#contact-me"
            className="hover:border-accent-brand hover:text-accent-brand mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold dark:border-white/15"
          >
            Start a conversation
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
