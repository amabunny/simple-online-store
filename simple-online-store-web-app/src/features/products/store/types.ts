import { Product } from "@/api/base";

export interface IProductsState {
  loading: boolean;
  products: Product[];
  error: string | null;
}
