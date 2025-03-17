import { notFound } from "next/navigation";

import { productsApi } from "@/api";
import { ProductInfo } from "@/features/product";
import { Page } from "@/ui";

interface IParams {
  id: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    notFound();
  }

  try {
    const product = await productsApi.productsIdGet({ id: Number(id) });

    return (
      <Page
        breadcrumbs={[
          { label: "Главная", href: "/" },
          {
            label: `${product.brand} ${product.name}`,
            href: `/products/${product.id}`,
          },
        ]}
      >
        <ProductInfo product={product} />
      </Page>
    );
  } catch {
    notFound();
  }
}
