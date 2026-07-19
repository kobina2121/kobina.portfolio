import * as React from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = React.ComponentProps<"div"> & {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="text-accent-brand mb-3 text-xs font-semibold tracking-[0.24em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-fluid-2xl text-foreground font-black tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-copy mt-4 text-sm leading-7">{description}</p>
      ) : null}
    </div>
  );
}
