import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-session";
import MarketplaceClient from "@/components/MarketplaceClient";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type MarketplacePageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function Home({ searchParams }: MarketplacePageProps) {
  const params = searchParams ? await searchParams : undefined;
  const searchQuery = params?.q?.trim() ?? "";

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

  const normalizedQuery = searchQuery.toLowerCase();
  const filteredItems = normalizedQuery
    ? items.filter((item) => {
        const haystack = [
          item.name,
          item.game,
          item.category,
          item.rarity,
          item.seller,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : items;

  const sessionSecret = process.env.AUTH_SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session =
    sessionSecret && token ? verifySessionToken(token, sessionSecret) : null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b0b] text-black dark:text-white font-sans selection:bg-violet-500/30 transition-colors duration-300">
      {/* Uber-style Navbar */}
      <SiteHeader user={session?.user ?? null} searchQuery={searchQuery} />

      <main className="flex-1 pb-20">
        {/* Filters & Content */}
        <div className="mx-auto max-w-[1400px] px-6 py-6">
          <MarketplaceClient items={filteredItems} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
