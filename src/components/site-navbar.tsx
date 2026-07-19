import Link from "next/link";
import { Menu } from "lucide-react";
import { NavbarStatusPill } from "@/components/navbar-status-pill";
import { siteNavItems, type SiteNavKey } from "@/lib/portfolio-content";

type SiteNavbarProps = {
  active: SiteNavKey;
};

export function SiteNavbar({ active }: SiteNavbarProps) {
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
                  className={
                    item.key === active
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

        <button
          type="button"
          className="absolute top-1/2 right-3 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/10 text-zinc-950 shadow-sm ring-1 ring-zinc-950/10 md:hidden dark:bg-white/10 dark:text-white dark:ring-white/10"
          aria-label="Open menu"
        >
          <Menu className="size-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
