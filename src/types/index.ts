export type { Product, Order, OrderItem, Customer, AdminUser, OrderStatus } from "@/generated/prisma/client";

export interface ShippingAddress {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  quantity: number;
  unitPrice: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
