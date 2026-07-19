import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  spacing?: "sm" | "md" | "lg";
};

const sectionSpacing = {
  sm: "py-12 sm:py-14",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-24",
};

export function Section({ spacing = "md", className, ...props }: SectionProps) {
  return (
    <section
      className={cn("scroll-mt-24", sectionSpacing[spacing], className)}
      {...props}
    />
  );
}
