export const BASKET_STORAGE_KEY = "bloxbolt:basket";
export const BASKET_ITEMS_STORAGE_KEY = "bloxbolt:basket-items";

export type BasketState = Record<string, number>;
export type BasketItemInfo = {
  name: string;
  price: number;
  image: string | null;
};
export type BasketItemsState = Record<string, BasketItemInfo>;
