import { Product } from "@/api/base";

export type ProductId = NonNullable<Pick<Product, "id">["id"]>;
type ItemsCount = number;

export interface ICartState {
  items: Record<ProductId, ItemsCount>;
}

export type CartProduct = Product & { count: number };

export type CartProductsDictionary = Record<number, CartProduct>;
