/**
 * Splits stack entries typed as "TypeScript, MongoDB" or
 * "Tailwind CSS + shadcn/ui" into separate tools, dropping blanks and
 * repeats (case-insensitive).
 */
export function splitStack(entries: string[]) {
  const seen = new Set<string>();

  return entries
    .flatMap((entry) => entry.split(/,|\s\+\s/))
    .map((tool) => tool.trim())
    .filter((tool) => {
      const key = tool.toLowerCase();

      if (!tool || seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

/**
 * The general name of a tool, without versions or notes, so filters group
 * "Next.js 14+ (App Router)" and "Next.js 16" together as "Next.js".
 */
export function getTechName(tool: string) {
  return (
    tool
      .replace(/\([^)]*\)/g, "")
      .replace(/(\s+v?\d[\w.+]*)+\s*$/i, "")
      .trim() || tool.trim()
  );
}

/** Each technology once, in first-seen order, for filter chips. */
export function getUniqueTechNames(stacks: string[][]) {
  const names = new Map<string, string>();

  for (const tool of stacks.flat()) {
    const name = getTechName(tool);
    const key = name.toLowerCase();

    if (!names.has(key)) {
      names.set(key, name);
    }
  }

  return [...names.values()];
}

export function usesTech(stack: string[], techName: string) {
  const key = techName.toLowerCase();
  return stack.some((tool) => getTechName(tool).toLowerCase() === key);
}
