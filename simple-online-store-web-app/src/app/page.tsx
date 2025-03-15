import { productsApi } from "@/api";
import { ProductsList } from "@/features/products";

export default async function Home() {
  const products = await productsApi.productsGet();

  return <ProductsList initialProducts={products} />;
}
