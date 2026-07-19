import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { aboutHighlights } from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "About — Kobina",
  description:
    "Learn more about Kobina, a Ghana-based developer creating polished web experiences.",
};

const stats = [
  { label: "Focus", value: "Frontend" },
  { label: "Base", value: "Accra" },
  { label: "Style", value: "Premium UI" },
] as const;

export default function AboutPage() {
  return (
    <main className="homepage-font bg-background text-foreground min-h-screen overflow-hidden">
      <SiteNavbar active="about" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pt-32 pb-20 sm:px-8 md:grid-cols-[0.95fr_1.05fr] md:items-center lg:px-10">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[2rem] border border-zinc-950/10 bg-white/50 dark:border-white/10 dark:bg-white/[0.03]" />
          <div className="relative aspect-[0.82] overflow-hidden rounded-[1.75rem] border border-zinc-950/10 bg-gradient-to-b from-zinc-200 to-white dark:border-white/15 dark:from-zinc-900 dark:to-black">
            <Image
              src="/images/kobina-formal-portrait-background-removed.png"
              alt="Portrait of Kobina Boakye"
              fill
              priority
              sizes="(min-width: 768px) 360px, 80vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute right-5 bottom-5 rounded-full border border-zinc-950/10 bg-white/75 px-4 py-2 text-xs text-zinc-700 backdrop-blur-md dark:border-white/15 dark:bg-black/75 dark:text-zinc-300">
            <span className="mr-2 inline-block size-2 rounded-full bg-emerald-400" />
            Available for work
          </div>
        </div>

        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-4 py-2 text-xs text-zinc-600 dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-400">
            <MapPin className="size-3.5 text-emerald-400" aria-hidden="true" />
            Based in Accra, Ghana
          </p>
          <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-6xl">
            I build interfaces that feel{" "}
            <span className="bg-gradient-to-r from-[#d76bff] to-[#ff79c6] bg-clip-text text-transparent">
              sharp, calm, and useful.
            </span>
          </h1>
          <div className="mt-6 max-w-2xl space-y-5 text-sm leading-7 text-zinc-700 dark:text-zinc-400">
            <p>
              Hello, I&apos;m Kobina — a front-end developer with a strong eye
              for visual systems, interaction details, and responsive product
              experiences.
            </p>
            <p>
              I like building websites that are simple to understand, polished
              enough to remember, and practical enough to ship.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
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
                <Sparkles
                  className="mt-0.5 size-4 shrink-0 text-[#d76bff]"
                  aria-hidden="true"
                />
                {highlight}
              </div>
            ))}
          </div>

          <Link
            href="/#contact-me"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-950/15 px-5 py-3 text-sm font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15"
          >
            Start a conversation
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
