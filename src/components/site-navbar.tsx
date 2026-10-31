"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { NavbarStatusPill } from "@/components/navbar-status-pill";
import type { SiteNavKey } from "@/lib/content/schema";
import { navigationItems } from "@/lib/content/static-content";
import { cn } from "@/lib/utils";

type SiteNavbarProps = {
  active: SiteNavKey;
};

const sectionToNavKey: Record<string, SiteNavKey> = {
  home: "home",
  "about-me": "about",
  projects: "projects",
  stack: "stack",
};

function getRouteActiveKey(pathname: string, fallback: SiteNavKey): SiteNavKey {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/stack")) return "stack";
  return fallback;
}

export function SiteNavbar({ active }: SiteNavbarProps) {
  const pathname = usePathname();
  const siteNavItems = navigationItems;
  const [activeSection, setActiveSection] = useState<SiteNavKey>("home");
  const routeActiveKey = getRouteActiveKey(pathname, active);
  const isHomeRoute = pathname === "/";

  useEffect(() => {
    if (!isHomeRoute) {
      return;
    }

    const sections = Object.keys(sectionToNavKey)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleEntry?.target.id) {
          setActiveSection(sectionToNavKey[visibleEntry.target.id]);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.15, 0.3, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomeRoute]);

  const displayActiveKey = useMemo(
    () => (isHomeRoute ? activeSection : routeActiveKey),
    [activeSection, isHomeRoute, routeActiveKey],
  );

  return (
    <>
      {/* Desktop: status pill, logo, and links in one bar at the top. */}
      <header className="fixed top-2 left-1/2 z-50 hidden w-[min(calc(100%-1.5rem),76rem)] -translate-x-1/2 rounded-2xl border border-zinc-950/10 bg-white/90 px-5 py-2.5 shadow-[0_10px_32px_rgba(0,0,0,0.12)] backdrop-blur-md md:block dark:border-white/15 dark:bg-black/90 dark:shadow-[0_10px_32px_rgba(0,0,0,0.55)]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <NavbarStatusPill />

          <Link
            href="/"
            className="col-start-2 flex items-center justify-self-center"
            aria-label="Kobina home"
          >
            <BrandMark className="h-9" />
          </Link>

          <nav
            aria-label="Main navigation"
            className="col-start-3 justify-self-end"
          >
            <ul className="flex items-center gap-1 rounded-full bg-zinc-950/[0.06] p-1 text-sm font-medium text-zinc-600 dark:bg-white/8 dark:text-zinc-400">
              {siteNavItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={
                      item.key === displayActiveKey ? "page" : undefined
                    }
                    className={
                      item.key === displayActiveKey
                        ? "inline-flex rounded-full bg-zinc-950 px-4 py-2 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                        : "inline-flex rounded-full px-4 py-2 hover:bg-zinc-950/10 hover:text-zinc-950 dark:hover:bg-white/10 dark:hover:text-white"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile: status pill centered at the top... */}
      <div className="fixed top-3 left-1/2 z-50 w-max -translate-x-1/2 md:hidden">
        <NavbarStatusPill
          placement="mobile"
          className="bg-white/90 backdrop-blur-md dark:bg-black/90"
        />
      </div>

      {/* ...and the logo with the links in a floating bar at the bottom. */}
      <nav
        aria-label="Main navigation"
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-50 w-max -translate-x-1/2 md:hidden"
      >
        <ul className="flex items-center gap-1 rounded-full border border-zinc-950/10 bg-white/90 p-1.5 text-sm font-medium text-zinc-600 shadow-[0_10px_32px_rgba(0,0,0,0.16)] backdrop-blur-md dark:border-white/15 dark:bg-black/90 dark:text-zinc-400 dark:shadow-[0_10px_32px_rgba(0,0,0,0.55)]">
          <li>
            <Link
              href="/"
              aria-label="Kobina home"
              aria-current={displayActiveKey === "home" ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center rounded-full px-3",
                displayActiveKey === "home" &&
                  "bg-zinc-950/[0.06] dark:bg-white/10",
              )}
            >
              <BrandMark className="h-6 shrink-0" />
            </Link>
          </li>
          {siteNavItems
            .filter((item) => item.key !== "home")
            .map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={
                    item.key === displayActiveKey ? "page" : undefined
                  }
                  className={cn(
                    "inline-flex h-10 items-center rounded-full px-3.5",
                    item.key === displayActiveKey
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                      : "hover:text-zinc-950 dark:hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
