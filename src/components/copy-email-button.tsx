"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trackPortfolioEvent } from "@/lib/analytics/events";
import { contactEmail } from "@/lib/contact-details";
import { cn } from "@/lib/utils";

type CopyEmailButtonProps = {
  email?: string;
  className?: string;
  source?: string;
};

const defaultEmail = contactEmail;

function fallbackCopy(value: string) {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textArea);

  return copied;
}

export function CopyEmailButton({
  email = defaultEmail,
  className,
  source = "contact",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else if (!fallbackCopy(email)) {
        throw new Error("Clipboard fallback failed.");
      }

      setCopied(true);
      trackPortfolioEvent("copy_email", { source });
      toast.success("Email copied to clipboard.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error(`Could not copy automatically. Email: ${email}`);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "hover:border-accent-brand hover:text-accent-brand focus-visible:outline-accent-brand inline-flex min-h-11 items-center gap-2 border border-zinc-950/25 px-4 py-2 text-xs font-semibold text-zinc-950 transition focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-white/35 dark:text-white",
        className,
      )}
      aria-label={`Copy email address ${email}`}
    >
      {copied ? "Copied email" : "Copy email"}
      {copied ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
