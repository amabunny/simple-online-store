import { Metadata } from "next";
import { notFound } from "next/navigation";

import { productsApi } from "@/api";
import { ProductInfo } from "@/features/product";
import { getSiteTitle } from "@/lib/get-site-title";
import { Page } from "@/ui";

interface IParams {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<IParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await productsApi.productsIdGet({ id: Number(id) });
  return {
    title: getSiteTitle(product.brand + " " + product.name),
  };
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
