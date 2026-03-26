import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import type { SessionUser } from "@/lib/auth-session";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

type SiteHeaderProps = {
  user?: SessionUser | null;
};

export default function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-[#050505]/80">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Blox<span className="text-violet-500">Bolt</span>
            </span>
          </Link>

          <div className="hidden lg:block flex-1 max-w-xl">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-white/50" />
              <input
                type="text"
                placeholder="Search for assets..."
                className="h-11 w-full rounded-full border border-neutral-200/70 bg-white/70 pl-11 pr-4 text-sm font-medium text-neutral-900 placeholder-neutral-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
              />
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <ThemeToggle />

          <div className="hidden md:flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10">
            <LocationIcon className="h-4 w-4" />
            <span>All Games</span>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-neutral-200/70 dark:bg-white/5 dark:ring-white/10">
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt="Avatar" width={36} height={36} />
                ) : (
                  <UserIcon className="m-2 h-5 w-5 text-neutral-400 dark:text-white/50" />
                )}
              </div>
              <Link
                href="/api/auth/logout"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors dark:text-white/60 dark:hover:text-white"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors dark:text-white/60 dark:hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all hover:bg-violet-500"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
