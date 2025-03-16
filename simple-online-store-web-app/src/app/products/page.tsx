import { productsApi } from "@/api";
import { ProductsList } from "@/features/products/organisms/products-list";
import { Page } from "@/ui";

export default async function ProductsPage() {
  const products = await productsApi.productsGet({
    orderBy: "brand",
    order: "Asc",
  });

  return (
    <Page
      breadcrumbs={[
        { label: "Главная (клиентская фильтрация)", href: "/" },
        { label: "Товары (серверная фильтрация)", href: "/products" },
      ]}
    >
      <ProductsList initialProducts={products} useServerFilter={true} />
    </Page>
  );
}
