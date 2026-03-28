import Link from "next/link";
import { notFound } from "next/navigation";
import { marketplaceItems } from "@/lib/marketplace-items";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-session";
import { cookies } from "next/headers";

type ItemPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return marketplaceItems.map((item) => ({ id: item.id }));
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = marketplaceItems.find((candidate) => candidate.id === id);

  if (!item) {
    notFound();
  }

  const sessionSecret = process.env.AUTH_SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session =
    sessionSecret && token ? verifySessionToken(token, sessionSecret) : null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b0b] text-black dark:text-white font-sans selection:bg-violet-500/30 transition-colors duration-300">
      <SiteHeader user={session?.user ?? null} />

      <main className="mx-auto max-w-[1100px] px-6 py-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          Back to marketplace
        </Link>

        <section className="mt-5 grid gap-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="aspect-[4/3] rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900" />

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
              {item.game} * {item.category}
            </p>
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Sold by {item.seller} {item.verified ? "(Verified)" : ""}
            </p>
            <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
            <div className="inline-flex rounded-md border border-neutral-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide dark:border-neutral-700">
              {item.rarity}
            </div>

            <button className="mt-2 rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-600">
              Add to basket
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
