"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavbarStatusPill } from "@/components/navbar-status-pill";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteNavItems, type SiteNavKey } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

type SiteNavbarProps = {
  active: SiteNavKey;
};

const sectionToNavKey: Record<string, SiteNavKey> = {
  home: "home",
  "about-me": "about",
  projects: "projects",
  skills: "skills",
};

function getRouteActiveKey(pathname: string, fallback: SiteNavKey): SiteNavKey {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/skills")) return "skills";
  return fallback;
}

export function SiteNavbar({ active }: SiteNavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
    <header className="fixed top-2 left-1/2 z-50 w-[min(calc(100%-1.5rem),76rem)] -translate-x-1/2 rounded-2xl border border-zinc-950/10 bg-white/90 px-4 py-2.5 shadow-[0_10px_32px_rgba(0,0,0,0.12)] backdrop-blur-md sm:px-5 dark:border-white/15 dark:bg-black/90 dark:shadow-[0_10px_32px_rgba(0,0,0,0.55)]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <NavbarStatusPill />

        <Link
          href="/"
          className="signature-logo col-start-2 justify-self-center text-[1.3rem] leading-none text-zinc-950 sm:text-[2.05rem] dark:text-white"
          aria-label="Kobina home"
        >
          Kobina
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden justify-self-end md:col-start-3 md:block"
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="absolute top-1/2 right-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/10 text-zinc-950 shadow-sm ring-1 ring-zinc-950/10 md:hidden dark:bg-white/10 dark:text-white dark:ring-white/10"
              aria-label="Open menu"
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-background/95 w-[min(22rem,calc(100vw-2rem))] border-zinc-950/10 p-6 backdrop-blur-xl dark:border-white/12"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="signature-logo text-4xl font-normal">
                Kobina
              </SheetTitle>
            </SheetHeader>

            <div className="mt-8 space-y-8">
              <NavbarStatusPill
                placement="mobile"
                className="w-full text-[0.72rem]"
              />

              <nav aria-label="Mobile navigation">
                <ul className="space-y-2">
                  {siteNavItems.map((item) => (
                    <li key={item.key}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={
                            item.key === displayActiveKey ? "page" : undefined
                          }
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex rounded-2xl px-4 py-3 text-sm font-semibold",
                            item.key === displayActiveKey
                              ? "bg-foreground text-background"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
