// The stack is shown in these groups, in this order. Older entries may still
// use other category names; those are listed last under "Other".
export const stackGroups = [
  "Frontend",
  "Backend",
  "Design & tools",
  "Data",
] as const;

export function groupStack<T extends { category: string }>(items: T[]) {
  const known = stackGroups.map((name) => ({
    name: name as string,
    items: items.filter((item) => item.category === name),
  }));
  const other = items.filter(
    (item) => !(stackGroups as readonly string[]).includes(item.category),
  );

  return [...known, { name: "Other", items: other }].filter(
    (group) => group.items.length > 0,
  );
}
