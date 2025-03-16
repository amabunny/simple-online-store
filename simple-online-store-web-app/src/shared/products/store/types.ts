import { Product } from "@/api/base";

export interface IProductsState {
  loading: boolean;
  products: Product[];
  filters: IFilters;
  error: string | null;
  inFlight: boolean;
}

export interface IFilters {
  priceFrom: number;
  priceTo: number;
  brand: string;
  name: string;
}
