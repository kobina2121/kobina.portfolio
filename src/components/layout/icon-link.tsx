import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getExternalLinkAttributes } from "@/lib/links";
import { cn } from "@/lib/utils";

type IconLinkProps = React.ComponentProps<typeof Link> & {
  external?: boolean;
};

export function IconLink({
  children,
  className,
  external = false,
  ...props
}: IconLinkProps) {
  return (
    <Link
      className={cn(
        "border-border bg-surface text-foreground hover:border-accent-brand hover:text-accent-brand focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
      {...(external ? getExternalLinkAttributes(String(props.href)) : {})}
      {...props}
    >
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Link>
  );
}
