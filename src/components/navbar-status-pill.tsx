"use client";

import { Clock3, Laptop, MapPin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSiteLocation } from "@/components/site-location-provider";
import { cn } from "@/lib/utils";

type PillMode = "theme" | "time" | "location";

const pillModes: PillMode[] = ["theme", "time", "location"];
const themeModes = ["system", "dark", "light"] as const;

// False during server rendering and hydration, true once running in the
// browser. The saved theme only exists in the browser, so reading it before
// then makes the server and client HTML disagree.
const subscribeToNothing = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

type NavbarStatusPillProps = {
  placement?: "desktop" | "mobile";
  className?: string;
};

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Africa/Accra",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export function NavbarStatusPill({
  placement = "desktop",
  className,
}: NavbarStatusPillProps) {
  const { resolvedTheme, setTheme, theme: storedTheme } = useTheme();
  const isClient = useIsClient();
  const location = useSiteLocation();
  const theme = isClient ? storedTheme : undefined;
  const [mode, setMode] = useState<PillMode>("theme");
  const [localTime, setLocalTime] = useState("--:--:--");

  const showNextMode = () => {
    setMode((currentMode) => {
      const currentIndex = pillModes.indexOf(currentMode);
      return pillModes[(currentIndex + 1) % pillModes.length];
    });
  };

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(timeFormatter.format(new Date()));
    };

    updateTime();

    const clockInterval = window.setInterval(updateTime, 1000);
    const modeInterval = window.setInterval(showNextMode, 4500);

    return () => {
      window.clearInterval(clockInterval);
      window.clearInterval(modeInterval);
    };
  }, []);

  const isThemeMode = mode === "theme";
  const isTimeMode = mode === "time";
  const isLocationMode = mode === "location";
  const selectedTheme = themeModes.includes(
    theme as (typeof themeModes)[number],
  )
    ? (theme as (typeof themeModes)[number])
    : "system";
  const isDarkTheme = resolvedTheme !== "light";

  const handleClick = () => {
    if (isThemeMode) {
      const currentIndex = themeModes.indexOf(selectedTheme);
      const nextTheme = themeModes[(currentIndex + 1) % themeModes.length];
      setTheme(nextTheme);
      return;
    }

    showNextMode();
  };

  const label = isThemeMode
    ? "Theme"
    : isTimeMode
      ? "My Local Time"
      : "I'm Based In";

  const value = isThemeMode
    ? selectedTheme === "system"
      ? "System"
      : isDarkTheme
        ? "Dark"
        : "White"
    : isTimeMode
      ? localTime
      : location;

  const nextTheme =
    themeModes[(themeModes.indexOf(selectedTheme) + 1) % themeModes.length];
  const nextThemeLabel =
    nextTheme === "system"
      ? "system"
      : nextTheme === "light"
        ? "white"
        : "dark";

  return (
    <button
      type="button"
      className={cn(
        "group w-[15.75rem] items-center justify-between overflow-hidden rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-4 py-2 text-xs shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-zinc-950/5 transition hover:border-zinc-950/20 hover:bg-zinc-950/[0.07] dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)] dark:ring-white/5 dark:hover:border-white/20 dark:hover:bg-white/[0.1]",
        placement === "desktop" ? "hidden justify-self-start md:flex" : "flex",
        className,
      )}
      aria-label={
        isThemeMode
          ? `Current theme setting is ${value}. Click to switch to ${nextThemeLabel} theme.`
          : isTimeMode
            ? `Current local time in Accra is ${localTime}. Click to show location.`
            : `Currently based in ${location}. Click to show theme.`
      }
      onClick={handleClick}
    >
      <span className="flex min-w-0 items-center gap-2 text-zinc-600 dark:text-zinc-400">
        {isThemeMode ? (
          <span
            className="size-1.5 rounded-full bg-zinc-950 dark:bg-white"
            aria-hidden="true"
          />
        ) : isTimeMode ? (
          <Clock3
            className="size-3.5 text-zinc-600 dark:text-zinc-400"
            aria-hidden="true"
          />
        ) : (
          <MapPin className="text-accent-brand size-3.5" aria-hidden="true" />
        )}
        <span>{label}</span>
      </span>

      <span className="flex shrink-0 items-center gap-2 font-semibold text-zinc-950 dark:text-white">
        <span>{value}</span>
        {isThemeMode && selectedTheme === "system" ? (
          <Laptop
            className="size-3.5 text-zinc-600 transition group-hover:text-zinc-950 dark:text-zinc-400 dark:group-hover:text-white"
            aria-hidden="true"
          />
        ) : isThemeMode && isDarkTheme ? (
          <Moon
            className="size-3.5 text-zinc-600 transition group-hover:text-zinc-950 dark:text-zinc-400 dark:group-hover:text-white"
            aria-hidden="true"
          />
        ) : isThemeMode ? (
          <Sun
            className="size-3.5 text-amber-500 transition group-hover:text-zinc-950"
            aria-hidden="true"
          />
        ) : isLocationMode ? (
          <span
            className="bg-accent-brand size-1.5 rounded-full"
            aria-hidden="true"
          />
        ) : null}
      </span>
    </button>
  );
}
