import { redirect } from "next/navigation";

import { AdminNotice } from "@/components/admin/admin-notice";
import { LoginForm } from "@/components/admin/login-form";
import {
  ADMIN_SESSION_SECRET_MIN_LENGTH,
  isAdminAuthConfigured,
  isAdminAuthenticated,
} from "@/lib/admin/auth";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (!isAdminAuthConfigured()) {
    return (
      <AdminNotice
        eyebrow="Admin setup"
        title="Set the admin account to unlock the dashboard."
        env={`ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=choose-a-long-password
ADMIN_SESSION_SECRET=at-least-${ADMIN_SESSION_SECRET_MIN_LENGTH}-random-characters`}
      >
        <p>
          Add these server environment variables locally and in production, then
          reload this page. Generate the session secret with{" "}
          <code>openssl rand -base64 32</code>.
        </p>
      </AdminNotice>
    );
  }

  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { next } = await searchParams;

  return (
    <main
      id="main-content"
      className="homepage-font bg-background text-foreground flex min-h-screen items-center justify-center px-5 py-20"
    >
      <section className="w-full max-w-sm rounded-[2rem] border border-zinc-950/10 bg-white/80 p-8 shadow-2xl dark:border-white/12 dark:bg-black/80">
        <p className="text-xs font-bold tracking-[0.18em] text-[#d76bff] uppercase">
          Portfolio admin
        </p>
        <h1 className="mt-3 text-2xl font-black tracking-tight">Sign in</h1>
        <LoginForm next={next} />
      </section>
    </main>
  );
}
