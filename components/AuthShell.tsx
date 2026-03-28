import Link from "next/link";
import type { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";

type AuthShellProps = {
  title: string;
  subtitle: string;
  robloxLabel: string;
  discordLabel: string;
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
    <svg className="h-5 w-5 fill-current" viewBox="0 0 302.7 302.7" aria-hidden="true">
      <path
        d="M120.5,271.7c-110.9-28.6-120-31-119.9-31.5 C0.7,239.6,62.1,0.5,62.2,0.4c0,0,54,13.8,119.9,30.8s120,30.8,120.1,30.8c0.2,0,0.2,0.4,0.1,0.9c-0.2,1.5-61.5,239.3-61.7,239.5 C240.6,302.5,186.5,288.7,120.5,271.7z M174.9,158c3.2-12.6,5.9-23.1,6-23.4c0.1-0.5-2.3-1.2-23.2-6.6c-12.8-3.3-23.5-5.9-23.6-5.8 c-0.3,0.3-12.1,46.6-12,46.7c0.2,0.2,46.7,12.2,46.8,12.1C168.9,180.9,171.6,170.6,174.9,158L174.9,158z"
      />
</svg>
    {label}
  </Link>
);

const DiscordButton = ({ label }: { label: string }) => (
  <Link
    href="/api/auth/discord/start"
    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/10 px-4 py-3 text-sm font-semibold text-[#3947d6] shadow-sm transition hover:bg-[#5865F2]/20 dark:border-[#5865F2]/50 dark:bg-[#5865F2]/20 dark:text-[#c7ceff] dark:hover:bg-[#5865F2]/30"
  >
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.32 4.37A19.79 19.79 0 0015.5 3a13.43 13.43 0 00-.62 1.27 18.36 18.36 0 00-5.76 0A13.43 13.43 0 008.5 3a19.79 19.79 0 00-4.82 1.37C.63 8.97-.2 13.46.22 17.88A19.87 19.87 0 006.1 21a14.53 14.53 0 001.25-2.06c-.69-.26-1.35-.59-1.97-.99.16-.12.31-.24.46-.37a13.8 13.8 0 0012.32 0c.15.13.3.25.46.37-.62.4-1.28.73-1.97.99.36.73.78 1.42 1.25 2.06a19.87 19.87 0 005.88-3.12c.5-5.12-.86-9.57-3.5-13.51zM8.02 14.95c-1.18 0-2.15-1.08-2.15-2.4 0-1.33.95-2.4 2.15-2.4 1.2 0 2.17 1.08 2.15 2.4 0 1.32-.95 2.4-2.15 2.4zm7.96 0c-1.18 0-2.15-1.08-2.15-2.4 0-1.33.95-2.4 2.15-2.4 1.2 0 2.17 1.08 2.15 2.4 0 1.32-.95 2.4-2.15 2.4z" />
    </svg>
    {label}
  </Link>
);

export default function AuthShell({
  title,
  subtitle,
  robloxLabel,
  discordLabel,
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
                Auth failed: {errorMessage}
              </p>
            ) : null}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <RobloxButton label={robloxLabel} />
              <DiscordButton label={discordLabel} />
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
