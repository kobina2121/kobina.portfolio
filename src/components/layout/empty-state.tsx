import * as React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EmptyStateProps = React.ComponentProps<"div"> & {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
};

export function EmptyState({
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface-muted flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed p-8 text-center",
        className,
      )}
      {...props}
    >
      <div className="border-border bg-background mb-5 flex size-12 items-center justify-center rounded-2xl border">
        <Inbox className="text-muted-foreground size-5" aria-hidden="true" />
      </div>
      <h3 className="text-foreground text-lg font-bold">{title}</h3>
      {description ? (
        <p className="text-muted-copy mt-2 max-w-sm text-sm leading-6">
          {description}
        </p>
      ) : null}
      {action ? (
        <Button className="mt-6" type="button" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
