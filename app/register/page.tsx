import AuthShell from "@/components/AuthShell";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join BloxBolt and start trading Roblox items with escrow-level security."
      robloxLabel="Sign up with Roblox"
      discordLabel="Connect with Discord"
      footerText="Already have an account?"
      footerLinkHref="/login"
      footerLinkLabel="Sign in"
    >
      <form className="space-y-5" action="#" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-2 block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.02] dark:text-white"
          />
        </div>

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
          <label htmlFor="password" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-2 block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.02] dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="roblox-username" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Roblox username
          </label>
          <input
            id="roblox-username"
            name="roblox-username"
            type="text"
            required
            className="mt-2 block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.02] dark:text-white"
          />
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">You will verify this username after signup.</p>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm dark:border-white/10 dark:bg-white/[0.03]">
          <input
            id="discord-join"
            name="discord-join"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-violet-600 focus:ring-violet-600"
          />
          <span className="text-neutral-700 dark:text-neutral-300">
            I agree to join the BloxBolt Discord server for trading coordination and support.
          </span>
        </label>

        <button
          type="submit"
          className="mt-1 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] transition hover:bg-violet-500"
        >
          Create account
        </button>
      </form>
    </AuthShell>
  );
}
