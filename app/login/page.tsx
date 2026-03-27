import AuthShell from "@/components/AuthShell";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your BloxBolt dashboard and marketplace tools."
      robloxLabel="Continue with Roblox"
      footerText="New to BloxBolt?"
      footerLinkHref="/register"
      footerLinkLabel="Create an account"
      errorMessage={error}
    >
      <form className="space-y-5" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.02] dark:text-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Password
            </label>
            <a href="#" className="text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.02] dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] transition hover:bg-violet-500"
        >
          Sign in
        </button>
      </form>
    </AuthShell>
  );
}
