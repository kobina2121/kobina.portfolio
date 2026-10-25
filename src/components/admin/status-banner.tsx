import { CheckCircle2 } from "lucide-react";

export function StatusBanner({ message }: { message?: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="status"
      className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300"
    >
      <CheckCircle2 className="size-4" aria-hidden="true" />
      {message}
    </p>
  );
}
