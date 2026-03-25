import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-session";
import MarketplaceClient from "@/components/MarketplaceClient";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default async function Home() {
  const items = [
    {
      id: "1",
      name: "Shadow Dragon",
      game: "Adopt Me",
      category: "Pet",
      rarity: "Legendary",
      price: 45.00,
      image: null,
      seller: "DragonTrader99",
      verified: true,
    },
    {
      id: "2",
      name: "Leopard Fruit",
      game: "Blox Fruits",
      category: "Item",
      rarity: "Mythical",
      price: 8.50,
      image: null,
      seller: "FruitMaster",
      verified: true,
    },
    {
      id: "3",
      name: "1M Diamonds",
      game: "Pet Sim 99",
      category: "Currency",
      rarity: "Common",
      price: 2.99,
      image: null,
      seller: "GemSeller",
      verified: false,
    },
    {
      id: "4",
      name: "Dark Blade",
      game: "Blox Fruits",
      category: "Gamepass",
      rarity: "Exotic",
      price: 15.00,
      image: null,
      seller: "SwordKing",
      verified: true,
    },
  ];

  const sessionSecret = process.env.AUTH_SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session =
    sessionSecret && token ? verifySessionToken(token, sessionSecret) : null;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Professional Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                <ZapIcon className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">BloxBolt</span>
            </Link>
            
            <div className="hidden lg:block">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search for assets..." 
                  className="h-9 w-64 rounded-lg border border-zinc-800 bg-zinc-900/50 pl-9 pr-4 text-sm text-zinc-300 placeholder-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
                />
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link href="/browse" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Marketplace</Link>
            <Link href="/sell" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sell</Link>
            <div className="h-4 w-px bg-zinc-800 mx-2" />
            {session ? (
              <div className="flex items-center gap-4">
                <div className="hidden text-right text-sm md:block">
                  <p className="font-bold text-white">{session.user.username ?? session.user.name}</p>
                </div>
                <div className="h-8 w-8 overflow-hidden rounded-full bg-zinc-800 ring-1 ring-zinc-700">
                  {session.user.avatarUrl ? (
                    <Image src={session.user.avatarUrl} alt="Avatar" width={32} height={32} />
                  ) : (
                    <UserIcon className="m-1.5 h-5 w-5 text-zinc-400" />
                  )}
                </div>
                <Link
                  href="/api/auth/logout"
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 pb-20">
        {/* Minimal Hero */}
        <div className="border-b border-white/5 bg-zinc-900/30">
          <div className="mx-auto max-w-[1400px] px-6 py-16 sm:py-20">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Marketplace</h1>
            <p className="mt-2 text-lg text-zinc-400">
              Discover, buy, and sell verified Roblox assets securely.
            </p>
          </div>
        </div>

        {/* Filters & Content */}
        <div className="mx-auto max-w-[1400px] px-6 py-8">
          <MarketplaceClient items={items} />
        </div>
      </main>

      {/* Simple Professional Footer */}
      <footer className="border-t border-white/5 bg-[#09090b] py-12">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-xs font-bold text-white">
                  <ZapIcon className="h-3 w-3" />
                </div>
                <span className="text-base font-bold text-white">BloxBolt</span>
              </div>
              <p className="text-sm text-zinc-500">
                Secure marketplace for virtual assets.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">Browse</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Selling</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 flex justify-between items-center text-xs text-zinc-600">
            <p>&copy; {new Date().getFullYear()} BloxBolt.</p>
            <p>Not affiliated with Roblox Corporation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
