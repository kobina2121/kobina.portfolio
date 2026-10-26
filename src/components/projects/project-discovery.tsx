"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useMemo } from "react";
import { EmptyState } from "@/components/layout/empty-state";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Project } from "@/lib/content/schema";
import { getUniqueTechNames, usesTech } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

type ProjectDiscoveryProps = {
  projects: Project[];
};

const allFilter = "all";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getSearchableText(project: Project) {
  return [
    project.title,
    project.description,
    project.category,
    ...project.stack,
  ]
    .join(" ")
    .toLowerCase();
}

export function ProjectDiscovery({ projects }: ProjectDiscoveryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") ?? allFilter;
  const selectedTech = searchParams.get("tech") ?? allFilter;

  const categories = useMemo(
    () => [allFilter, ...new Set(projects.map((project) => project.category))],
    [projects],
  );

  const technologies = useMemo(
    () => [
      allFilter,
      ...getUniqueTechNames(projects.map((project) => project.stack)),
    ],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = normalize(query);

    return projects.filter((project) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        getSearchableText(project).includes(normalizedQuery);
      const matchesCategory =
        selectedCategory === allFilter || project.category === selectedCategory;
      const matchesTech =
        selectedTech === allFilter || usesTech(project.stack, selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [projects, query, selectedCategory, selectedTech]);

  const hasActiveFilters =
    query.length > 0 ||
    selectedCategory !== allFilter ||
    selectedTech !== allFilter;

  const setFilter = (key: "q" | "category" | "tech", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const shouldRemove =
      value.trim().length === 0 || value === allFilter || value === "";

    if (shouldRemove) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`${pathname}${params.size ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[1.75rem] border border-zinc-950/10 bg-white/70 p-5 dark:border-white/12 dark:bg-white/[0.04]">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="project-search"
              className="mb-2 block text-sm font-semibold text-zinc-950 dark:text-white"
            >
              Search projects
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
              <Input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setFilter("q", event.target.value)}
                placeholder="Search title, category, or tech…"
                className="pl-10"
              />
            </div>
          </div>

          {hasActiveFilters ? (
            <Button variant="outline" className="h-11" onClick={clearFilters}>
              <X className="size-4" aria-hidden="true" />
              Clear all
            </Button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <fieldset>
            <legend className="mb-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Category
            </legend>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter("category", category)}
                  className={cn(
                    "min-h-11 rounded-full border px-3 py-2 text-xs font-semibold transition",
                    selectedCategory === category
                      ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                      : "hover:border-accent-brand hover:text-accent-brand border-zinc-950/10 text-zinc-700 dark:border-white/15 dark:text-zinc-400",
                  )}
                >
                  {category === allFilter ? "All categories" : category}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Technology
            </legend>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setFilter("tech", tech)}
                  className={cn(
                    "min-h-11 rounded-full border px-3 py-2 text-xs font-semibold transition",
                    selectedTech === tech
                      ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                      : "hover:border-accent-brand hover:text-accent-brand border-zinc-950/10 text-zinc-700 dark:border-white/15 dark:text-zinc-400",
                  )}
                >
                  {tech === allFilter ? "All tech" : tech}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <p
          className="mt-5 text-sm text-zinc-700 dark:text-zinc-400"
          aria-live="polite"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              total={filteredProjects.length}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching projects"
          description="Try another search term, category, or technology filter."
          action={{
            label: "Clear filters",
            onClick: clearFilters,
          }}
        />
      )}
    </div>
  );
}
