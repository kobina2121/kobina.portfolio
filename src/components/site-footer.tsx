import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { CopyEmailButton } from "@/components/copy-email-button";
import { DownloadCvLink } from "@/components/download-cv-link";
import { getPhoneHref } from "@/lib/contact-details";
import { getExternalLinkAttributes, isExternalHref } from "@/lib/links";
import { getNavigationItems, getSiteConfig } from "@/lib/portfolio-content";

// The footer renders on every page, so home-page anchors need the / prefix.
function toSiteWideHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export async function SiteFooter() {
  const site = await getSiteConfig();
  const mediaLinks = site.socialLinks.map((link) => ({
    ...link,
    href: toSiteWideHref(link.href),
  }));
  const siteNavItems = getNavigationItems();

  return (
    <footer className="homepage-font bg-background text-foreground px-5 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-5xl border-t border-zinc-950/20 py-8 dark:border-white/35">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_auto] md:items-start">
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Kobina home"
            >
              <BrandMark className="h-7" />
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-5 text-zinc-700 dark:text-zinc-500">
              Full stack developer crafting polished, accessible digital
              experiences from Accra, Ghana.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <DownloadCvLink source="footer" />
              <CopyEmailButton email={site.email} source="footer" />
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
              <li>
                <Link
                  href="/admin"
                  className="text-xs text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                  admin login
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold">Media</h2>
            <div className="flex flex-wrap gap-4">
              {mediaLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
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
              <Link
                href={getPhoneHref(site.phone)}
                className="flex min-h-11 items-center gap-2 hover:text-zinc-950 dark:hover:text-white"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                {site.phone}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-[0.68rem] text-zinc-700 dark:text-zinc-600">
          <p>© Copyright 2026. Made by Kobina.</p>
        </div>
      </div>
    </footer>
  );
}
