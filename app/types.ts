export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;

  // BloxBolt specific
  role: "BUYER" | "SELLER" | "MOD" | "ADMIN" | "OWNER";
  balance: number; // Stored in cents to avoid floating point issues
  isSuspended: boolean;

  // Linked accounts
  robloxId?: string | null;
  robloxUsername?: string | null;
  discordId?: string | null;
  discordUsername?: string | null;

  listings?: ItemListing[];
  orders?: Order[];
  payoutRequests?: PayoutRequest[];
}

export interface ItemListing {
  id: string;
  name: string;
  game: string; // e.g., 'Adopt Me', 'Blox Fruits'
  price: number; // Stored in cents
  quantity: number;
  imageUrl: string;

  sellerId: string;
  seller: User;

  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_CONFIRMED"
  | "TRADE_COMPLETED"
  | "CANCELLED"
  | "DISPUTED";

export interface Order {
  id: string;
  status: OrderStatus;

  listingId: string;
  listing: ItemListing;

  buyerId: string;
  buyer: User;

  totalPrice: number; // Stored in cents

  createdAt: Date;
  updatedAt: Date;
}

export type PayoutStatus = "PENDING" | "COMPLETED" | "REJECTED";

export interface PayoutRequest {
  id: string;
  status: PayoutStatus;
  amount: number; // in cents
  cryptoAddress: string;

  sellerId: string;
  seller: User;

  createdAt: Date;
  processedAt?: Date;
}