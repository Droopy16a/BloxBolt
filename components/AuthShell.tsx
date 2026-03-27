import Link from "next/link";
import type { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";

type AuthShellProps = {
  title: string;
  subtitle: string;
  robloxLabel: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  errorMessage?: string;
  children: ReactNode;
};

const RobloxButton = ({ label }: { label: string }) => (
  <Link
    href="/api/auth/roblox/start"
    className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 dark:border-white/10 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
  >
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.92 6.01C18.92 6.01 12.69 3.58 6.5 1.15C5.9 0.9 5.3 1.5 5.55 2.1C8.01 8.27 10.45 14.5 10.45 14.5C10.45 14.5 16.68 16.93 22.89 19.36C23.49 19.61 24.09 19.01 23.84 18.41C21.38 12.24 18.92 6.01 18.92 6.01ZM14.7 13.68C14.7 13.68 12.3 12.74 9.9 11.8C9.67 11.71 9.44 11.94 9.53 12.17C10.47 14.57 11.41 16.97 11.41 16.97C11.41 16.97 13.81 17.91 16.21 18.85C16.44 18.94 16.67 18.71 16.58 18.48C15.64 16.08 14.7 13.68 14.7 13.68Z" />
    </svg>
    {label}
  </Link>
);

export default function AuthShell({
  title,
  subtitle,
  robloxLabel,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  errorMessage,
  children,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-neutral-900 dark:bg-[#050505] dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]" />
        <div className="absolute left-0 top-0 h-[34rem] w-[34rem] bg-[radial-gradient(circle,#c4b5fd66,transparent_70%)] dark:bg-[radial-gradient(circle,#6d28d966,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] bg-[radial-gradient(circle,#ddd6fe66,transparent_70%)] dark:bg-[radial-gradient(circle,#5b21b666,transparent_70%)]" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Blox<span className="text-violet-500">Bolt</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl items-center px-6 pb-10 pt-4 md:pt-8">
        <div className="w-full overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/80 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
          <section className="p-6 sm:p-10">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">{title}</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{subtitle}</p>

            {errorMessage ? (
              <p className="mt-4 rounded-xl border border-red-300/80 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/60 dark:text-red-300">
                Roblox auth failed: {errorMessage}
              </p>
            ) : null}

            <div className="mt-7">
              <RobloxButton label={robloxLabel} />
            </div>

            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-neutral-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                <span className="bg-white px-3 dark:bg-[#050505]">Or continue with email</span>
              </div>
            </div>

            {children}

            <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {footerText}{" "}
              <Link href={footerLinkHref} className="font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
                {footerLinkLabel}
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
