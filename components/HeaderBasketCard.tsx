"use client";

import { useEffect, useMemo, useState } from "react";
import { BASKET_STORAGE_KEY, type BasketState } from "@/lib/basket-storage";

const BasketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l2.2 10.3a2 2 0 002 1.7h7.9a2 2 0 002-1.6L21 7H7"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19a1 1 0 100 2 1 1 0 000-2zM18 19a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
);

const readBasketCount = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const raw = localStorage.getItem(BASKET_STORAGE_KEY);
    if (!raw) {
      return 0;
    }

    const parsed = JSON.parse(raw) as BasketState;
    return Object.values(parsed).reduce((total, qty) => total + Math.max(0, Number(qty) || 0), 0);
  } catch {
    return 0;
  }
};

export default function HeaderBasketCard() {
  const [count, setCount] = useState(readBasketCount);

  const openBasket = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("bloxbolt:basket-open"));
    }
  };

  useEffect(() => {
    const syncCount = () => {
      setCount(readBasketCount());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === BASKET_STORAGE_KEY) {
        syncCount();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("bloxbolt:basket-change", syncCount);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("bloxbolt:basket-change", syncCount);
    };
  }, []);

  const label = useMemo(() => (count === 1 ? "1 item" : `${count} items`), [count]);

  return (
    <button
      type="button"
      onClick={openBasket}
      className="hidden md:flex min-w-[140px] items-center gap-3 rounded-2xl border border-neutral-200/80 bg-white/80 px-4 py-2.5 text-left shadow-sm transition hover:bg-neutral-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
      aria-label="Open basket"
    >
      <span className="rounded-lg bg-neutral-100 p-2 text-neutral-700 dark:bg-white/10 dark:text-white/90">
        <BasketIcon className="h-4 w-4" />
      </span>
      <span className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-white/50">Basket</span>
        <span className="text-sm font-semibold text-neutral-800 dark:text-white">{label}</span>
      </span>
    </button>
  );
}
