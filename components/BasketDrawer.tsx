"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BASKET_ITEMS_STORAGE_KEY,
  BASKET_STORAGE_KEY,
  type BasketItemInfo,
  type BasketItemsState,
  type BasketState,
} from "@/lib/basket-storage";

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

const readBasket = (): BasketState => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(BASKET_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as BasketState;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export default function BasketDrawer() {
  const [open, setOpen] = useState(false);
  const [basket, setBasket] = useState<BasketState>(readBasket);
  const [basketItems, setBasketItems] = useState<BasketItemsState>({});

  useEffect(() => {
    const syncBasket = () => {
      setBasket(readBasket());
      try {
        const raw = localStorage.getItem(BASKET_ITEMS_STORAGE_KEY);
        if (!raw) {
          setBasketItems({});
          return;
        }
        const parsed = JSON.parse(raw) as BasketItemsState;
        setBasketItems(parsed && typeof parsed === "object" ? parsed : {});
      } catch {
        setBasketItems({});
      }
    };
    const openBasket = () => setOpen(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === BASKET_STORAGE_KEY || event.key === BASKET_ITEMS_STORAGE_KEY) {
        syncBasket();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("bloxbolt:basket-open", openBasket);
    window.addEventListener("bloxbolt:basket-change", syncBasket);
    window.addEventListener("storage", onStorage);
    window.addEventListener("keydown", onKeyDown);
    syncBasket();

    return () => {
      window.removeEventListener("bloxbolt:basket-open", openBasket);
      window.removeEventListener("bloxbolt:basket-change", syncBasket);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const entries = useMemo(
    () =>
      Object.entries(basket)
        .filter(([, qty]) => Number(qty) > 0)
        .map(([id, qty]) => ({
          id,
          qty: Number(qty),
          item: basketItems[id] as BasketItemInfo | undefined,
        })),
    [basket, basketItems]
  );

  const totalItems = useMemo(
    () => entries.reduce((total, entry) => total + entry.qty, 0),
    [entries]
  );

  const subtotal = useMemo(
    () => entries.reduce((total, entry) => total + (entry.item?.price ?? 0) * entry.qty, 0),
    [entries]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-[0_12px_30px_rgba(139,92,246,0.45)] transition hover:bg-violet-500 md:hidden"
        aria-label="Open basket"
      >
        <BasketIcon className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-black px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-white dark:bg-white dark:text-black">
            {totalItems}
          </span>
        )}
      </button>

      <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/45 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        aria-label="Close basket"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Basket"
        className={`absolute right-0 top-0 h-full w-[92vw] max-w-md border-l border-neutral-200 bg-white shadow-xl transition-transform dark:border-neutral-800 dark:bg-[#0b0b0b] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
          <div>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Your basket</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{totalItems} item(s)</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="space-y-3 px-4 py-4">
          {entries.length === 0 ? (
            <p className="rounded-lg border border-dashed border-neutral-200 px-3 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              Your basket is empty.
            </p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-neutral-200 p-3 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900">
                    {entry.item?.image ? (
                      <Image src={entry.item.image} alt={entry.item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-neutral-400">
                        N/A
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                      {entry.item?.name ?? `Item #${entry.id}`}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      ${(entry.item?.price ?? 0).toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold dark:bg-neutral-800">x{entry.qty}</span>
                    <p className="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                      ${((entry.item?.price ?? 0) * entry.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto border-t border-neutral-200 px-4 py-4 dark:border-neutral-800">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
            <span className="font-semibold text-neutral-900 dark:text-white">${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/marketplace"
            onClick={() => setOpen(false)}
            className="block rounded-lg bg-violet-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Open marketplace
          </Link>
        </div>
      </aside>
      </div>
    </>
  );
}
