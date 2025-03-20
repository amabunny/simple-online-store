import { productsApi } from "@/api";
import { Product } from "@/api/base";
import { ProductsList } from "@/features/products";
import { Page } from "@/ui";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await productsApi.productsGet(
      {
        orderBy: "price",
        order: "Asc",
      },
      { cache: "no-store" },
    );
  } catch (error: unknown) {
    console.error(error);
  }

  return (
    <Page>
      <ProductsList initialProducts={products} />
    </Page>
  );
}
