import { productsApi } from "@/api";
import { ProductsList } from "@/features/products";
import { Page } from "@/ui";

export default async function Home() {
  const products = await productsApi.productsGet({
    orderBy: "brand",
    order: "Asc",
  });

  return (
    <Page
      breadcrumbs={[{ label: "Главная (клиентская фильтрация)", href: "/" }]}
    >
      <ProductsList initialProducts={products} />
    </Page>
  );
}
