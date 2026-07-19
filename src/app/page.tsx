import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail, Phone } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { projects, skillItems } from "@/lib/portfolio-content";
import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaReact,
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

const mediaLinks = ["GitHub", "LinkedIn", "Mail"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
        <span className="text-[#d76bff]">#</span>
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-[#d76bff] via-zinc-950/20 to-transparent dark:via-white/25" />
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

export default function Home() {
  return (
    <main className="homepage-font bg-background text-foreground min-h-screen overflow-hidden">
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
          <aside className="absolute top-28 -left-16 hidden flex-col items-center gap-5 text-zinc-500 md:flex dark:text-zinc-400">
            <FaGithub className="size-4" aria-hidden="true" />
            <Mail className="size-4" aria-hidden="true" />
            <span className="h-12 w-px bg-zinc-950/25 dark:bg-white/35" />
          </aside>

          <div>
            <h1
              id="home-heading"
              className="max-w-xl text-3xl leading-tight font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
            >
              Hi, I&apos;m a{" "}
              <span className="bg-gradient-to-r from-[#d76bff] to-[#ff79c6] bg-clip-text text-transparent">
                web designer
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-[#ff79c6] to-[#9d7dff] bg-clip-text text-transparent">
                front-end developer
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-700 dark:text-zinc-500">
              I craft responsive websites where technologies meet creativity.
            </p>
            <Link
              href="#projects"
              className="mt-6 inline-flex items-center gap-2 border border-zinc-950/45 px-4 py-2 text-xs font-semibold text-zinc-950 hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/45 dark:text-white"
            >
              Scroll Down
              <ArrowDown className="size-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative mx-auto min-h-72 w-full max-w-md">
            <CornerFrame className="absolute top-20 left-4 h-20 w-24" />
            <CornerFrame className="absolute top-8 right-10 h-28 w-28" />
            <DotGrid className="absolute right-2 bottom-16" />

            <div className="absolute right-3 bottom-8 left-12 border border-zinc-950/25 bg-white/75 px-3 py-1 text-[0.65rem] text-zinc-950 dark:border-white/40 dark:bg-black/70 dark:text-white">
              <span className="mr-2 inline-block size-2 bg-[#d76bff]" />
              currently working on <span className="font-bold">Portfolio</span>
            </div>

            <div className="relative mx-auto aspect-[0.84] w-64 overflow-hidden bg-gradient-to-b from-zinc-200 to-white md:w-72 dark:from-zinc-900 dark:to-black">
              <Image
                src="/images/kobina-formal-portrait-background-removed.png"
                alt="Portrait of Kobina Boakye"
                fill
                priority
                sizes="(min-width: 768px) 288px, 70vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </section>

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

        <section id="projects" className="relative scroll-mt-24 pt-24">
          <SectionTitle>projects</SectionTitle>
          <Link
            href="/projects"
            className="absolute top-24 right-0 hidden items-center gap-2 text-xs text-zinc-950 hover:text-[#d76bff] sm:inline-flex dark:text-white"
          >
            View all <ArrowUpRight className="size-3" aria-hidden="true" />
          </Link>

          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group border border-zinc-950/20 bg-white/70 transition-colors hover:border-[#d76bff] dark:border-white/35 dark:bg-black"
              >
                <div
                  className={`relative flex aspect-[1.55] items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}
                >
                  {index === 0 ? (
                    <div className="rounded-full border border-black/30 bg-white/80 px-5 py-3 text-center text-xs font-black text-zinc-800 shadow-xl">
                      Search
                      <br />
                      Portfolio
                    </div>
                  ) : index === 1 ? (
                    <div className="w-32 rounded-sm border border-white/15 bg-black p-3 shadow-xl">
                      <div className="mb-3 h-2 w-16 bg-white/70" />
                      <div className="space-y-2">
                        <div className="h-1.5 bg-white/20" />
                        <div className="h-1.5 w-2/3 bg-white/20" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid w-40 grid-cols-4 gap-2">
                      {Array.from({ length: 16 }).map((_, dot) => (
                        <span
                          key={dot}
                          className="h-2 rounded-full bg-[#d76bff]/60"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="border-t border-zinc-950/15 p-4 dark:border-white/25">
                  <p className="mb-3 text-[0.68rem] text-zinc-600 dark:text-zinc-500">
                    {project.stack}
                  </p>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 min-h-16 text-xs leading-5 text-zinc-700 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <Link
                    href="/projects"
                    className="mt-4 inline-flex items-center gap-2 border border-zinc-950/25 px-3 py-2 text-xs hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/35"
                  >
                    Live <ArrowUpRight className="size-3" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="relative scroll-mt-24 pt-20">
          <SectionTitle>skills</SectionTitle>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {skillItems.map(({ label, icon, color }) => {
              const Icon = skillIconMap[icon];

              return (
                <div
                  key={label}
                  className="flex aspect-square flex-col items-center justify-center gap-3 border border-zinc-950/20 bg-white/75 text-center transition-colors hover:border-[#d76bff] dark:border-white/35 dark:bg-black/80"
                >
                  <Icon className={`size-10 ${color}`} aria-hidden="true" />
                  <p className="text-xs text-zinc-700 dark:text-zinc-300">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

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
                I&apos;m a self-taught front-end developer based in Ghana. I
                transform ideas into responsive websites with clean interfaces,
                careful interaction design, and modern front-end foundations.
              </p>
              <p>
                I work comfortably across design and development, creating
                experiences that feel simple to use and polished enough to ship.
              </p>
            </div>
            <Link
              href="#contact-me"
              className="mt-6 inline-flex border border-zinc-950/25 px-4 py-2 text-xs font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/35"
            >
              Resume
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-xs">
            <DotGrid className="absolute -top-8 -left-6" />
            <Image
              src="/images/developer-character.png"
              alt="Developer avatar with laptop"
              width={420}
              height={614}
              sizes="(min-width: 768px) 260px, 70vw"
              className="mx-auto w-56 object-contain drop-shadow-[0_0_35px_rgba(215,107,255,0.2)]"
            />
            <CornerFrame className="absolute right-2 bottom-6 h-24 w-24" />
          </div>
        </section>

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
          </div>

          <div className="border border-zinc-950/20 p-4 dark:border-white/35">
            <h3 className="mb-4 text-sm font-bold">Message me here</h3>
            <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-400">
              <Link
                href="tel:+233000000000"
                className="flex items-center gap-3 hover:text-zinc-950 dark:hover:text-white"
              >
                <Phone className="size-4" aria-hidden="true" />
                +233 000 000 000
              </Link>
              <Link
                href="mailto:kobinaboakye@gmail.com"
                className="flex items-center gap-3 hover:text-zinc-950 dark:hover:text-white"
              >
                <Mail className="size-4" aria-hidden="true" />
                kobinaboakye@gmail.com
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-950/20 py-8 dark:border-white/35">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <Link href="/" className="text-sm font-bold">
              @ Kobina
            </Link>
            <div>
              <h2 className="mb-4 text-sm font-semibold">Media</h2>
              <div className="flex gap-4">
                {mediaLinks.map((item) => (
                  <Link
                    key={item}
                    href="#contact-me"
                    className="text-xs text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-10 text-center text-[0.68rem] text-zinc-700 dark:text-zinc-600">
            © Copyright 2026. Made by Kobina.
          </p>
          <p className="mt-2 text-center text-[0.68rem] text-zinc-700 dark:text-zinc-600">
            Product of Loo<span className="text-[#ff4028]">prompt</span>.
          </p>
          <Image
            src="/images/looprompt-logo.png"
            alt="Looprompt logo"
            width={32}
            height={32}
            className="mx-auto mt-3 size-8"
          />
        </footer>
      </div>
    </main>
  );
}
