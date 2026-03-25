"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type MarketplaceItem = {
  id: string;
  name: string;
  game: string;
  category: string;
  rarity: string;
  price: number;
  image: string | null;
  seller: string;
  verified: boolean;
};

type MarketplaceClientProps = {
  items: MarketplaceItem[];
};

const getRarityColor = (r: string) => {
  switch (r) {
    case "Legendary":
      return "bg-amber-500/20 text-amber-300 border-amber-500/50";
    case "Mythical":
      return "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/50";
    case "Exotic":
      return "bg-rose-500/20 text-rose-300 border-rose-500/50";
    default:
      return "bg-slate-500/20 text-slate-300 border-slate-500/50";
  }
};

const getRarityGlow = (r: string) => {
  switch (r) {
    case "Legendary":
      return "before:from-amber-500/35 before:via-orange-400/20 before:to-yellow-300/30 after:from-amber-500/30 after:via-transparent after:to-yellow-300/30";
    case "Mythical":
      return "before:from-fuchsia-500/35 before:via-pink-400/20 before:to-violet-400/30 after:from-fuchsia-500/30 after:via-transparent after:to-violet-400/30";
    case "Exotic":
      return "before:from-rose-500/35 before:via-red-400/20 before:to-amber-300/30 after:from-rose-500/30 after:via-transparent after:to-amber-300/30";
    default:
      return "before:from-slate-500/30 before:via-slate-400/15 before:to-slate-300/25 after:from-slate-500/25 after:via-transparent after:to-slate-300/25";
  }
};

export default function MarketplaceClient({ items }: MarketplaceClientProps) {
  const [catActive, setCatActive] = useState(0);
  const [cart, setCart] = useState<Record<string, number>>({});

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );

  const visibleItems =
    catActive === 0 ? items : items.filter((item) => item.category === categories[catActive]);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const incQty = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const decQty = (id: string) => {
    setCart((prev) => {
      const nextQty = (prev[id] ?? 0) - 1;
      if (nextQty <= 0) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  return (
    <>
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {categories.map((cat, i) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCatActive(i)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              i === catActive
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="group relative isolate flex flex-col rounded-xl border border-white/5 bg-zinc-900 transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            {/* Hover Glow Effect */}
            <div
              className={`pointer-events-none absolute inset-0 -z-20 rounded-xl before:content-[''] before:absolute before:inset-0 before:rounded-xl before:scale-100 before:bg-gradient-to-br before:opacity-0 before:transition before:duration-300 before:will-change-transform group-hover:before:opacity-100 group-hover:before:-rotate-2 group-hover:before:scale-[1.06] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:scale-100 after:bg-gradient-to-tr after:opacity-0 after:transition after:duration-300 after:will-change-transform group-hover:after:opacity-100 group-hover:after:rotate-2 group-hover:after:scale-[1.03] ${getRarityGlow(
                item.rarity
              )}`}
            />

            <Link href={`/item/${item.id}`} className="block relative z-10">
              {/* Image */}
              <div className="relative aspect-[16/9] w-full bg-zinc-800 overflow-hidden rounded-tr-xl rounded-tl-xl">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                    <svg className="h-12 w-12 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  {item.game}
                </div>
                {item.verified && (
                  <div className="absolute top-2 right-2 rounded-full bg-indigo-600 p-1 shadow-lg shadow-indigo-500/40">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </Link>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col p-4">
              <Link href={`/item/${item.id}`} className="flex-1 group/title">
                <h3 className="text-sm font-semibold text-white group-hover/title:text-indigo-400 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  {item.rarity && (
                    <span
                      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider ${getRarityColor(
                        item.rarity
                      )}`}
                    >
                      {item.rarity}
                    </span>
                  )}
                  <span className="text-[10px] font-medium text-zinc-500 uppercase">{item.category}</span>
                </div>
              </Link>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="h-5 w-5 rounded-full bg-zinc-800 ring-1 ring-white/10 flex items-center justify-center text-[10px] text-zinc-300">
                      {item.seller.charAt(0)}
                    </div>
                    <span className="truncate max-w-[80px]">{item.seller}</span>
                  </div>
                  <p className="text-sm font-bold text-white">${item.price.toFixed(2)}</p>
                </div>

                {cart[item.id] ? (
                  <div className="w-full rounded-lg bg-indigo-600/10 p-1.5 ring-1 ring-inset ring-indigo-500/40 shadow-lg shadow-indigo-500/10 transition-all group-hover:translate-y-[-1px]">
                    <div className="flex items-center justify-between rounded-md bg-indigo-600 px-2 py-1.5 text-xs font-bold text-white">
                      <button
                        type="button"
                        aria-label={`Decrease quantity for ${item.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          decQty(item.id);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 transition-all hover:bg-white/20 active:scale-[0.97]"
                      >
                        <span className="text-base leading-none">−</span>
                      </button>
                      <span className="tabular-nums">{cart[item.id]}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity for ${item.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          incQty(item.id);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 transition-all hover:bg-white/20 active:scale-[0.97]"
                      >
                        <span className="text-base leading-none">+</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(item.id);
                    }}
                    className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-indigo-500 active:scale-[0.97] shadow-lg shadow-indigo-500/20 group-hover:translate-y-[-1px]"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
