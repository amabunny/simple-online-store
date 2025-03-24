import { Container } from "@mui/material";
import { notFound } from "next/navigation";

import { productsApi } from "@/api";
import { ProductForm } from "@/features/product";
import { getSiteTitle } from "@/lib/get-site-title";

interface IProps {
  params: Promise<Record<string, string>>;
}

export async function generateMetadata({ params }: IProps) {
  const { id } = await params;
  const product = await productsApi.productsIdGet({ id: Number(id) });
  return {
    title: getSiteTitle(`Редактирование ${product.brand} ${product.name}`),
  };
}

export default async function ProductEditPage({ params }: IProps) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    notFound();
  }

  try {
    const product = await productsApi.productsIdGet({ id: Number(id) });

    return (
      <Container maxWidth="lg">
        <ProductForm product={product} />
      </Container>
    );
  } catch {
    notFound();
  }
}
