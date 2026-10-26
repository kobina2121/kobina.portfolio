import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Globe, Mail, Phone } from "lucide-react";
import { CopyEmailButton } from "@/components/copy-email-button";
import { DownloadCvLink } from "@/components/download-cv-link";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { SiteNavbar } from "@/components/site-navbar";
import { ProjectCard } from "@/components/projects/project-card";
import { getPhoneHref } from "@/lib/contact-details";
import { getExternalLinkAttributes, isExternalHref } from "@/lib/links";
import {
  getAboutHighlights,
  getCertificationItems,
  getEducationItems,
  getExperienceItems,
  getFeaturedProjects,
  getRequiredImageAsset,
  getServiceItems,
  getSiteConfig,
  getSkillItems,
} from "@/lib/portfolio-content";
import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaJava,
  FaJs,
  FaLinkedinIn,
  FaNodeJs,
  FaReact,
  FaXTwitter,
} from "react-icons/fa6";
import { SiFirebase, SiMysql } from "react-icons/si";

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

// Picks an icon from the link's label or URL, e.g. "LinkedIn" or github.com.
function getSocialIcon({ label, href }: { label: string; href: string }) {
  const text = `${label} ${href}`.toLowerCase();

  if (href.startsWith("mailto:")) return Mail;
  if (text.includes("github")) return FaGithub;
  if (text.includes("linkedin")) return FaLinkedinIn;
  if (text.includes("twitter") || /\bx\b|x\.com/.test(text)) return FaXTwitter;
  if (text.includes("instagram")) return FaInstagram;
  return Globe;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
        <span className="text-accent-brand">#</span>
        {children}
      </h2>
      <div className="from-accent-brand h-px flex-1 bg-gradient-to-r via-zinc-950/20 to-transparent dark:via-white/25" />
    </div>
  );
}

function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none grid grid-cols-3 gap-2 opacity-70 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <span key={index} className="size-1 bg-zinc-950/40 dark:bg-white/65" />
      ))}
    </div>
  );
}

function CornerFrame({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none border border-zinc-950/30 dark:border-white/40 ${className}`}
      aria-hidden="true"
    />
  );
}

export default async function Home() {
  const [
    site,
    featuredProjects,
    skillItems,
    aboutHighlights,
    serviceItems,
    experienceItems,
    educationItems,
    certificationItems,
  ] = await Promise.all([
    getSiteConfig(),
    getFeaturedProjects(),
    getSkillItems(),
    getAboutHighlights(),
    getServiceItems(),
    getExperienceItems(),
    getEducationItems(),
    getCertificationItems(),
  ]);
  const heroSocialLinks = site.socialLinks.map((link) => ({
    ...link,
    icon: getSocialIcon(link),
  }));
  const phoneHref = getPhoneHref(site.phone);
  const formalPortrait = getRequiredImageAsset("formal-portrait");
  const developerCharacter = getRequiredImageAsset("developer-character");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen overflow-hidden"
    >
      <div className="pointer-events-none fixed inset-y-0 left-4 hidden w-px bg-zinc-950/20 md:block dark:bg-white/30" />
      <div className="pointer-events-none fixed top-0 right-[5%] hidden h-28 w-px bg-zinc-950/10 lg:block dark:bg-white/20" />
      <DotGrid className="fixed bottom-48 left-0 hidden md:grid" />
      <DotGrid className="fixed right-8 bottom-80 hidden lg:grid" />

      <SiteNavbar active="home" />

      <div className="mx-auto w-full max-w-5xl px-5 pt-24 pb-7 sm:px-8 lg:px-10">
        <section
          id="home"
          className="relative grid min-h-[460px] scroll-mt-24 items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20"
          aria-labelledby="home-heading"
        >
          <aside
            className="absolute top-28 -left-16 hidden flex-col items-center gap-5 text-zinc-500 md:flex dark:text-zinc-400"
            aria-label="Social links"
          >
            {heroSocialLinks.map((item) => {
              const Icon = item.icon;
              const isExternal = isExternalHref(item.href);

              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="hover:text-accent-brand relative inline-flex size-11 items-center justify-center"
                  {...getExternalLinkAttributes(item.href)}
                  aria-label={
                    isExternal
                      ? `${item.label} (opens in a new tab)`
                      : `${item.label} contact link`
                  }
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {isExternal ? (
                    <ArrowUpRight
                      className="absolute top-2 right-2 size-2.5"
                      aria-hidden="true"
                    />
                  ) : null}
                </Link>
              );
            })}
            <span className="h-12 w-px bg-zinc-950/25 dark:bg-white/35" />
          </aside>

          <div>
            <p className="mb-5 inline-flex items-center gap-2 border border-zinc-950/20 bg-white/70 px-3 py-2 text-[0.68rem] font-semibold tracking-wide text-zinc-700 uppercase dark:border-white/20 dark:bg-black/70 dark:text-zinc-300">
              <span className="size-2 bg-emerald-400" aria-hidden="true" />
              {site.availability}
            </p>
            <h1
              id="home-heading"
              className="max-w-xl text-3xl leading-tight font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
            >
              Hi, I&apos;m Kobina — a{" "}
              <span className="text-zinc-500 dark:text-zinc-400">
                web designer
              </span>{" "}
              and{" "}
              <span className="text-zinc-500 dark:text-zinc-400">
                full stack developer
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-700 dark:text-zinc-500">
              {site.heroIntro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={site.primaryCta.href}
                className="inline-flex min-h-11 items-center gap-2 bg-zinc-950 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
              >
                {site.primaryCta.label}
                <ArrowDown className="size-3" aria-hidden="true" />
              </Link>
              <Link
                href={site.secondaryCta.href}
                className="hover:border-accent-brand hover:text-accent-brand inline-flex min-h-11 items-center gap-2 border border-zinc-950/45 px-4 py-2 text-xs font-semibold text-zinc-950 dark:border-white/45 dark:text-white"
              >
                {site.secondaryCta.label}
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </Link>
              <DownloadCvLink
                source="hero"
                className="border-zinc-950/45 dark:border-white/45"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:hidden">
              {heroSocialLinks.map((item) => {
                const Icon = item.icon;
                const isExternal = isExternalHref(item.href);

                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className="hover:border-accent-brand hover:text-accent-brand relative inline-flex size-11 items-center justify-center border border-zinc-950/20 text-zinc-700 dark:border-white/25 dark:text-zinc-300"
                    {...getExternalLinkAttributes(item.href)}
                    aria-label={
                      isExternal
                        ? `${item.label} (opens in a new tab)`
                        : `${item.label} contact link`
                    }
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {isExternal ? (
                      <ArrowUpRight
                        className="absolute top-1 right-1 size-2.5"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto min-h-72 w-full max-w-md">
            <CornerFrame className="absolute top-20 left-4 h-20 w-24" />
            <CornerFrame className="absolute top-8 right-10 h-28 w-28" />
            <DotGrid className="absolute right-2 bottom-16" />

            <div className="absolute right-3 bottom-8 left-12 border border-zinc-950/25 bg-white/75 px-3 py-1 text-[0.65rem] text-zinc-950 dark:border-white/40 dark:bg-black/70 dark:text-white">
              <span className="bg-accent-brand mr-2 inline-block size-2" />
              currently working on <span className="font-bold">Portfolio</span>
            </div>

            <div className="relative mx-auto aspect-[0.84] w-64 overflow-hidden bg-gradient-to-b from-zinc-200 to-white md:w-72 dark:from-zinc-900 dark:to-black">
              <Image
                src={formalPortrait.src}
                alt={formalPortrait.alt}
                fill
                priority
                sizes="(min-width: 768px) 288px, 70vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </section>

        <Reveal>
          <section className="relative mx-auto my-4 max-w-2xl border border-zinc-950/40 p-4 text-sm leading-6 dark:border-white/50">
            <span className="bg-background absolute -top-4 left-4 px-2 text-3xl leading-none text-zinc-950 dark:text-white">
              “
            </span>
            <p>
              Control can sometimes be an illusion. But sometimes you need
              illusion to gain control.
            </p>
            <p className="bg-background absolute right-0 -bottom-8 border border-zinc-950/40 px-4 py-2 dark:border-white/50">
              - Mr. Who
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section id="projects" className="relative scroll-mt-24 pt-24">
            <SectionTitle>projects</SectionTitle>
            <Link
              href="/projects"
              className="absolute top-24 right-0 hidden items-center gap-2 text-xs text-zinc-950 underline-offset-4 hover:underline sm:inline-flex dark:text-white"
            >
              View all <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>

            <div className="grid gap-4 md:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  total={featuredProjects.length}
                />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="skills" className="relative scroll-mt-24 pt-20">
            <SectionTitle>skills</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillItems.map(
                ({ label, icon, color, category, description }) => {
                  const Icon = skillIconMap[icon];

                  return (
                    <article
                      key={label}
                      className="hover:border-accent-brand border border-zinc-950/20 bg-white/75 p-5 transition-colors dark:border-white/35 dark:bg-black/80"
                    >
                      <div className="mb-7 flex items-center justify-between gap-4">
                        <Icon
                          className={`size-9 ${color}`}
                          aria-hidden="true"
                        />
                        <span className="border border-zinc-950/15 px-3 py-1 text-[0.65rem] text-zinc-600 dark:border-white/20 dark:text-zinc-400">
                          {category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                        {label}
                      </h3>
                      <p className="mt-3 text-xs leading-6 text-zinc-700 dark:text-zinc-400">
                        {description}
                      </p>
                    </article>
                  );
                },
              )}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="about-me"
            className="relative grid scroll-mt-24 gap-10 pt-20 md:grid-cols-[1fr_0.8fr] md:items-center"
          >
            <div>
              <SectionTitle>about-me</SectionTitle>
              <p className="mb-5 text-sm text-zinc-700 dark:text-zinc-300">
                Hello, I&apos;m Kobina!
              </p>
              <div className="max-w-xl space-y-4 text-xs leading-6 text-zinc-700 dark:text-zinc-400">
                <p>
                  I&apos;m a self-taught full stack developer based in Ghana. I
                  transform ideas into responsive websites with clean
                  interfaces, careful interaction design, and reliable product
                  foundations.
                </p>
                <p>
                  I work comfortably across design and development, creating
                  experiences that feel simple to use and polished enough to
                  ship.
                </p>
              </div>
              <ul className="mt-6 grid gap-3">
                {aboutHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-xs leading-6 text-zinc-800 dark:text-zinc-300"
                  >
                    <span
                      className="bg-accent-brand mt-2 size-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
              <DownloadCvLink source="about-section" className="mt-6" />
            </div>

            <div className="relative mx-auto w-full max-w-xs">
              <DotGrid className="absolute -top-8 -left-6" />
              <Image
                src={developerCharacter.src}
                alt={developerCharacter.alt}
                width={developerCharacter.width}
                height={developerCharacter.height}
                sizes="(min-width: 768px) 260px, 70vw"
                className="mx-auto w-56 object-contain drop-shadow-[0_0_35px_rgba(0,0,0,0.18)]"
              />
              <CornerFrame className="absolute right-2 bottom-6 h-24 w-24" />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="services" className="relative scroll-mt-24 pt-20">
            <SectionTitle>services</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              {serviceItems.map((service, index) => (
                <article
                  key={service.title}
                  className="group hover:border-accent-brand border border-zinc-950/20 bg-white/75 p-5 transition-colors dark:border-white/35 dark:bg-black/80"
                >
                  <p className="text-accent-brand mb-8 text-xs font-semibold">
                    0{index + 1}
                  </p>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 min-h-24 text-xs leading-6 text-zinc-700 dark:text-zinc-400">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <span
                          className="bg-accent-brand size-1.5"
                          aria-hidden="true"
                        />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="experience" className="relative scroll-mt-24 pt-20">
            <SectionTitle>experience</SectionTitle>
            <div className="space-y-4">
              {experienceItems.map((item) => (
                <article
                  key={`${item.role}-${item.company}`}
                  className="grid gap-5 border border-zinc-950/20 bg-white/75 p-5 md:grid-cols-[0.32fr_1fr] dark:border-white/35 dark:bg-black/80"
                >
                  <div>
                    <p className="text-accent-brand text-xs font-semibold">
                      {item.period}
                    </p>
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-500">
                      {item.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
                      {item.company}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-xs leading-6 text-zinc-700 dark:text-zinc-300"
                        >
                          <span
                            className="bg-accent-brand mt-2 size-1.5 shrink-0"
                            aria-hidden="true"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="credentials"
            className="relative grid scroll-mt-24 gap-8 pt-20 md:grid-cols-2"
          >
            <div>
              <SectionTitle>education</SectionTitle>
              <div className="space-y-4">
                {educationItems.map((item) => (
                  <article
                    key={item.institution}
                    className="border border-zinc-950/20 bg-white/75 p-5 dark:border-white/35 dark:bg-black/80"
                  >
                    <p className="text-accent-brand text-xs font-semibold">
                      {item.period}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-zinc-950 dark:text-white">
                      {item.institution}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      {item.qualification}
                    </p>
                    <p className="mt-4 text-xs leading-6 text-zinc-700 dark:text-zinc-400">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div id="certifications" className="scroll-mt-24">
              <SectionTitle>certifications</SectionTitle>
              <div className="space-y-4">
                {certificationItems.map((item) => (
                  <article
                    key={item.name}
                    className="border border-zinc-950/20 bg-white/75 p-5 dark:border-white/35 dark:bg-black/80"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
                          {item.provider}
                        </p>
                      </div>
                      <span className="border-accent-brand/50 text-accent-brand shrink-0 border px-3 py-1 text-[0.65rem] font-semibold">
                        {item.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="contact-me"
            className="relative grid scroll-mt-24 gap-10 pt-24 pb-20 md:grid-cols-[1fr_0.75fr] md:items-start"
          >
            <div>
              <SectionTitle>contacts</SectionTitle>
              <p className="max-w-xl text-xs leading-6 text-zinc-700 dark:text-zinc-400">
                I&apos;m interested in freelance opportunities. However, if you
                have another request or question, don&apos;t hesitate to contact
                me.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center gap-2 bg-zinc-950 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
                >
                  Email me
                  <Mail className="size-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href={phoneHref}
                  className="hover:border-accent-brand hover:text-accent-brand inline-flex min-h-11 items-center gap-2 border border-zinc-950/25 px-4 py-2 text-xs font-semibold dark:border-white/35"
                >
                  {site.phone}
                  <Phone className="size-3.5" aria-hidden="true" />
                </Link>
                <CopyEmailButton email={site.email} source="homepage-contact" />
                <Link
                  href="/projects"
                  className="hover:border-accent-brand hover:text-accent-brand inline-flex min-h-11 items-center gap-2 border border-zinc-950/25 px-4 py-2 text-xs font-semibold dark:border-white/35"
                >
                  See work
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ContactForm email={site.email} />
          </section>
        </Reveal>
      </div>
    </main>
  );
}
