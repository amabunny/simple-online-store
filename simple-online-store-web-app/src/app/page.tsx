import { productsApi } from "@/api";
import { ProductsList } from "@/features/products";
import { Page } from "@/ui";

export default async function Home() {
  const products = await productsApi.productsGet({
    orderBy: "price",
    order: "Asc",
  });

  return (
    <Page>
      <ProductsList initialProducts={products} />
    </Page>
  );
}
