import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { CopyEmailButton } from "@/components/copy-email-button";
import { DownloadCvLink } from "@/components/download-cv-link";
import { getExternalLinkAttributes, isExternalHref } from "@/lib/links";
import {
  getNavigationItems,
  getRequiredImageAsset,
  getSiteConfig,
} from "@/lib/portfolio-content";

const mediaLinks = [
  { label: "GitHub", href: "https://github.com/kobina2121" },
  { label: "LinkedIn", href: "/#contact-me" },
  { label: "Mail", href: "mailto:kobinaboakye@gmail.com" },
] as const;

export function SiteFooter() {
  const site = getSiteConfig();
  const siteNavItems = getNavigationItems();
  const loopromptLogo = getRequiredImageAsset("looprompt-logo");

  return (
    <footer className="homepage-font bg-background text-foreground px-5 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-5xl border-t border-zinc-950/20 py-8 dark:border-white/35">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_auto] md:items-start">
          <div>
            <Link href="/" className="text-sm font-bold">
              @ Kobina
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-5 text-zinc-700 dark:text-zinc-500">
              Full stack developer crafting polished, accessible digital
              experiences from Accra, Ghana.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <DownloadCvLink source="footer" />
              <CopyEmailButton source="footer" />
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-sm font-semibold">Pages</h2>
            <ul className="space-y-2">
              {siteNavItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-xs text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold">Media</h2>
            <div className="flex flex-wrap gap-4">
              {mediaLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  {...getExternalLinkAttributes(item.href)}
                  className="text-xs text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  aria-label={
                    isExternalHref(item.href)
                      ? `${item.label} (opens in a new tab)`
                      : item.label
                  }
                >
                  <span className="inline-flex items-center gap-1.5">
                    {item.label}
                    {isExternalHref(item.href) ? (
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    ) : null}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <Link
                href={`mailto:${site.email}`}
                className="flex min-h-11 items-center gap-2 hover:text-zinc-950 dark:hover:text-white"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                {site.email}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-[0.68rem] text-zinc-700 dark:text-zinc-600">
          <p>© Copyright 2026. Made by Kobina.</p>
          <p className="mt-2">
            Product of Loo<span className="text-[#ff4028]">prompt</span>.
          </p>
          <Image
            src={loopromptLogo.src}
            alt={loopromptLogo.alt}
            width={loopromptLogo.width}
            height={loopromptLogo.height}
            className="mx-auto mt-3 size-8"
          />
        </div>
      </div>
    </footer>
  );
}
