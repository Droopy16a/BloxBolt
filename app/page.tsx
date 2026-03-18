import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-session";

export default async function Home() {
  const items = [
    {
      name: "Legendary Pet",
      game: "Blox Fruits",
      price: 10.05,
      image: null,
    },
    {
      name: "Legendary Pet",
      game: "Blox Fruits",
      price: 10.05,
      image: null,
    },
  ];

  const sessionSecret = process.env.AUTH_SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session =
    sessionSecret && token ? verifySessionToken(token, sessionSecret) : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <header className="flex w-full max-w-5xl items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-black dark:text-white">BloxBolt</h1>
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Signed in as {session.user.username ?? session.user.name ?? "Roblox user"}
              </span>
              <Link
                href="/api/auth/logout"
                className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            The Ultimate Roblox Marketplace
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Buy and sell in-game items for your favorite Roblox games securely.
            BloxBolt acts as a trusted middleman for payments.
          </p>
        </div>

        <div className="mt-16 w-full">
          <h2 className="text-left text-2xl font-semibold text-black dark:text-white">
            Featured Items
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {items.map((item, index) => (
              <div className="group relative" key={`${item.name}-${index}`}>
                {item.image ? (
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75 lg:h-full lg:w-full"
                      width={300}
                      height={300}
                    />
                  </div>
                ) : (
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                    <div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-700">
                      <span className="text-gray-500">Item Image</span>
                    </div>
                  </div>
                )}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 dark:text-gray-200">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.game}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full max-w-5xl px-8 py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <p>
          Warning: BloxBolt only verifies payments. In-game trades are handled
          entirely by users.
        </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} BloxBolt. All rights reserved.</p>
      </footer>
    </div>
  );
}
