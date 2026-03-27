"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASKET_STORAGE_KEY, type BasketState } from "@/lib/basket-storage";

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
      return "text-amber-500";
    case "Mythical":
      return "text-fuchsia-500";
    case "Exotic":
      return "text-rose-500";
    default:
      return "text-gray-400";
  }
};

const rarityOrder = [
  "Common",
  "Uncommon",
  "Rare",
  "Exotic",
  "Mythical",
  "Legendary",
  "Ancient",
  "Unique",
];

const getInitialBasket = (): BasketState => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(BASKET_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as BasketState;
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    return {};
  } catch {
    return {};
  }
};

export default function MarketplaceClient({ items }: MarketplaceClientProps) {
  const [catActive, setCatActive] = useState(0);
  const [cart, setCart] = useState<BasketState>(getInitialBasket);
  const [priceOpen, setPriceOpen] = useState(true);
  const [rarityOpen, setRarityOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedRarities, setSelectedRarities] = useState<Record<string, boolean>>({});

  useEffect(() => {
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("bloxbolt:basket-change"));
  }, [cart]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );

  const rarityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      counts[item.rarity] = (counts[item.rarity] ?? 0) + 1;
    }
    return counts;
  }, [items]);

  const priceBounds = useMemo(() => {
    if (!items.length) return { min: 0, max: 0 };
    let min = items[0].price;
    let max = items[0].price;
    for (const item of items) {
      min = Math.min(min, item.price);
      max = Math.max(max, item.price);
    }
    return { min, max };
  }, [items]);

  const selectedRarityList = useMemo(
    () => Object.keys(selectedRarities).filter((r) => selectedRarities[r]),
    [selectedRarities]
  );

  const visibleItems = useMemo(() => {
    let next = catActive === 0 ? items : items.filter((item) => item.category === categories[catActive]);

    if (selectedRarityList.length > 0) {
      next = next.filter((item) => selectedRarityList.includes(item.rarity));
    }

    if (minPrice !== "") {
      next = next.filter((item) => item.price >= minPrice);
    }

    if (maxPrice !== "") {
      next = next.filter((item) => item.price <= maxPrice);
    }

    return next;
  }, [items, categories, catActive, selectedRarityList, minPrice, maxPrice]);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedRarities({});
    setCatActive(0);
  };

  const toggleRarity = (rarity: string) => {
    setSelectedRarities((prev) => ({ ...prev, [rarity]: !prev[rarity] }));
  };

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
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const rarityList = useMemo(() => {
    const all = Object.keys(rarityCounts);
    const known = rarityOrder.filter((r) => all.includes(r));
    const rest = all.filter((r) => !rarityOrder.includes(r));
    return [...known, ...rest];
  }, [rarityCounts]);

  return (
    <div className="space-y-4 lg:space-y-0">
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0b0b0b] px-4 py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200"
          aria-expanded={mobileFiltersOpen}
          aria-controls="mobile-filters"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 5h14v2H3V5zm3 5h8v2H6v-2zm3 5h2v2H9v-2z" />
          </svg>
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside
          id="mobile-filters"
          className={`h-fit rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0b0b0b] ${
            mobileFiltersOpen ? "block" : "hidden"
          } lg:sticky lg:top-20 lg:block`}
        >
          <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-base font-semibold text-neutral-900 dark:text-white">
              Filter items
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 lg:hidden"
              >
                Close
              </button>
            </div>
          </div>

        <div className="px-4">
          <div className="py-4 border-b border-dashed border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setPriceOpen((prev) => !prev)}
              className="w-full flex items-center py-1"
              aria-expanded={priceOpen}
            >
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Price</h4>
              <span className={`ml-auto h-5 w-5 text-neutral-500 transition-transform ${priceOpen ? "rotate-180" : ""}`}>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
                </svg>
              </span>
            </button>

            {priceOpen && (
              <div className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3 py-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span>$</span>
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder={priceBounds.min.toFixed(2)}
                        className="w-full bg-transparent text-right text-sm text-black dark:text-white outline-none"
                      />
                    </div>
                  </div>

                  <span className="text-neutral-400">-</span>

                  <div className="flex-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3 py-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span>$</span>
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder={priceBounds.max.toFixed(2)}
                        className="w-full bg-transparent text-right text-sm text-black dark:text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={0.01}
                    value={minPrice === "" ? priceBounds.min : minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                  <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={0.01}
                    value={maxPrice === "" ? priceBounds.max : maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="py-4">
            <button
              type="button"
              onClick={() => setRarityOpen((prev) => !prev)}
              className="w-full flex items-center py-1"
              aria-expanded={rarityOpen}
            >
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Weapon Rarity
              </h4>
              <span className={`ml-auto h-5 w-5 text-neutral-500 transition-transform ${rarityOpen ? "rotate-180" : ""}`}>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
                </svg>
              </span>
            </button>

            {rarityOpen && (
              <div className="pt-3 flex flex-col gap-3">
                {rarityList.map((rarity) => (
                  <label key={rarity} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <input
                      type="checkbox"
                      checked={!!selectedRarities[rarity]}
                      onChange={() => toggleRarity(rarity)}
                      className="h-4 w-4 rounded border-neutral-300 text-violet-500 focus:ring-violet-500"
                    />
                    <span className="flex-1">
                      {rarity}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {rarityCounts[rarity] ?? 0}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        </aside>

        <section>
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCatActive(i)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
                i === catActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col"
            >
              <Link href={`/item/${item.id}`} className="block relative">
                <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-800">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-300 dark:text-neutral-700">
                      <svg className="h-12 w-12 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold text-black dark:text-white line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="bg-neutral-100 dark:bg-neutral-800 h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                    4.9
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-500">
                  <span>{item.game}</span>
                  <span>&bull;</span>
                  <span>{item.seller}</span>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">${item.price.toFixed(2)}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 border rounded-sm uppercase tracking-tight ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </div>

                  {cart[item.id] ? (
                    <div className="flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black rounded-full px-3 py-1 scale-90">
                      <button onClick={() => decQty(item.id)} className="font-bold">&minus;</button>
                      <span className="text-xs font-bold">{cart[item.id]}</span>
                      <button onClick={() => incQty(item.id)} className="font-bold">+</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="bg-violet-500 text-white p-1.5 rounded-full hover:bg-violet-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {visibleItems.length === 0 && (
            <div className="col-span-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-6 py-12 text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No items match those filters. Try resetting or adjusting your price range.
              </p>
            </div>
          )}
        </div>
        </section>
      </div>
    </div>
  );
}
