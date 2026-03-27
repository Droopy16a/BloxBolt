import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderBasketCard from "@/components/HeaderBasketCard";
import type { SessionUser } from "@/lib/auth-session";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

type SiteHeaderProps = {
  user?: SessionUser | null;
  searchQuery?: string;
  searchAction?: string;
};

export default function SiteHeader({
  user,
  searchQuery = "",
  searchAction = "/marketplace",
}: SiteHeaderProps) {
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
            <form action={searchAction} method="get" className="relative">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-white/50" />
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search for assets..."
                className="h-11 w-full rounded-full border border-neutral-200/70 bg-white/70 pl-11 pr-4 text-sm font-medium text-neutral-900 placeholder-neutral-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
              />
            </form>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <ThemeToggle />
          <HeaderBasketCard />

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
