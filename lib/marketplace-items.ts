export type MarketplaceItem = {
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

export const marketplaceItems: MarketplaceItem[] = [
  { id: "1", name: "Shadow Dragon", game: "Adopt Me", category: "Pet", rarity: "Legendary", price: 45.0, image: null, seller: "DragonTrader99", verified: true },
  { id: "2", name: "Leopard Fruit", game: "Blox Fruits", category: "Item", rarity: "Mythical", price: 8.5, image: null, seller: "FruitMaster", verified: true },
  { id: "3", name: "1M Diamonds", game: "Pet Sim 99", category: "Currency", rarity: "Common", price: 2.99, image: null, seller: "GemSeller", verified: false },
  { id: "4", name: "Dark Blade", game: "Blox Fruits", category: "Gamepass", rarity: "Exotic", price: 15.0, image: null, seller: "SwordKing", verified: true },
  { id: "5", name: "Frost Dragon", game: "Adopt Me", category: "Pet", rarity: "Legendary", price: 38.0, image: null, seller: "IceTrader", verified: true },
  { id: "6", name: "Dough Fruit", game: "Blox Fruits", category: "Item", rarity: "Mythical", price: 7.2, image: null, seller: "FruitMaster", verified: true },
  { id: "7", name: "Huge Cat", game: "Pet Sim 99", category: "Pet", rarity: "Exotic", price: 120.0, image: null, seller: "PetCollector", verified: true },
  { id: "8", name: "Kitsune Fruit", game: "Blox Fruits", category: "Item", rarity: "Mythical", price: 12.5, image: null, seller: "SwordKing", verified: true },
  { id: "9", name: "Owl", game: "Adopt Me", category: "Pet", rarity: "Legendary", price: 25.0, image: null, seller: "DragonTrader99", verified: true },
  { id: "10", name: "T-Rex Fruit", game: "Blox Fruits", category: "Item", rarity: "Legendary", price: 5.5, image: null, seller: "FruitMaster", verified: true },
  { id: "11", name: "10M Diamonds", game: "Pet Sim 99", category: "Currency", rarity: "Common", price: 24.99, image: null, seller: "GemSeller", verified: false },
  { id: "12", name: "Fast Boats", game: "Blox Fruits", category: "Gamepass", rarity: "Rare", price: 4.5, image: null, seller: "SwordKing", verified: true },
];
