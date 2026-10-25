import Link from "next/link";

type AdminNoticeProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  env?: string;
};

export function AdminNotice({
  eyebrow,
  title,
  children,
  env,
}: AdminNoticeProps) {
  return (
    <main className="homepage-font bg-background text-foreground flex min-h-screen items-center justify-center px-6 py-20">
      <section className="w-full max-w-2xl rounded-[2rem] border border-zinc-950/10 bg-white/80 p-8 shadow-2xl dark:border-white/12 dark:bg-black/80">
        <p className="text-xs font-bold tracking-[0.18em] text-[#d76bff] uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight">{title}</h1>
        <div className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-400">
          {children}
        </div>
        {env ? (
          <pre className="mt-5 overflow-x-auto rounded-2xl border border-zinc-950/10 bg-zinc-950 p-4 text-xs leading-6 text-white dark:border-white/12">
            {env}
          </pre>
        ) : null}
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-zinc-950/15 px-5 py-2 text-sm font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15"
        >
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}
