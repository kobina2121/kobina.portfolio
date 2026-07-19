import * as React from "react";
import { cn } from "@/lib/utils";

export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-muted-copy [&_a]:text-accent-brand [&_strong]:text-foreground max-w-prose space-y-4 text-sm leading-7 [&_a]:font-semibold [&_a]:underline-offset-4 [&_a:hover]:underline",
        className,
      )}
      {...props}
    />
  );
}
