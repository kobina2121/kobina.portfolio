import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  size?: "sm" | "md" | "lg" | "xl";
  as?: React.ElementType;
};

const containerSizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({
  as: Component = "div",
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        containerSizes[size],
        className,
      )}
      {...props}
    />
  );
}
