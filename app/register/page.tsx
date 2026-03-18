import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900 dark:text-zinc-50">
          Create your BloxBolt account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Join the ultimate Roblox marketplace
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mb-6">
          <Link
            href="/api/auth/roblox/start"
            className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-md bg-[#232527] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#383b3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#232527] dark:bg-white dark:text-[#232527] dark:hover:bg-zinc-200"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.92 6.01 12.69 3.58 6.5 1.15C5.9 0.9 5.3 1.5 5.55 2.1C8.01 8.27 10.45 14.5 10.45 14.5C10.45 14.5 16.68 16.93 22.89 19.36C23.49 19.61 24.09 19.01 23.84 18.41C21.38 12.24 18.92 6.01 18.92 6.01ZM14.7 13.68C14.7 13.68 12.3 12.74 9.9 11.8C9.67 11.71 9.44 11.94 9.53 12.17C10.47 14.57 11.41 16.97 11.41 16.97C11.41 16.97 13.81 17.91 16.21 18.85C16.44 18.94 16.67 18.71 16.58 18.48C15.64 16.08 14.7 13.68 14.7 13.68Z" />
            </svg>
            Sign up with Roblox
          </Link>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-300 dark:border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-zinc-50 px-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-50"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-50"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-50"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="roblox-username"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-50"
            >
              Roblox Username
            </label>
            <div className="mt-2">
              <input
                id="roblox-username"
                name="roblox-username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
              />
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              You will need to verify this later.
            </p>
          </div>

          <div className="flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="discord-join"
                name="discord-join"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600 dark:bg-zinc-900 dark:border-zinc-700"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="discord-join"
                className="font-medium text-zinc-900 dark:text-zinc-50"
              >
                I agree to join the BloxBolt Discord server
              </label>
              <p className="text-zinc-500 dark:text-zinc-400">
                Mandatory for trading and support.
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
