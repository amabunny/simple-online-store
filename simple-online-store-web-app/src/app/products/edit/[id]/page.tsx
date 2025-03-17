import { Container } from "@mui/material";
import { notFound } from "next/navigation";

import { productsApi } from "@/api";
import { ProductForm } from "@/features/product";

interface IProps {
  params: Promise<Record<string, string>>;
}

export default async function ProductEditPage({ params }: IProps) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    notFound();
  }

  const product = await productsApi.productsIdGet({ id: Number(id) });

  return (
    <Container maxWidth="lg">
      <ProductForm product={product} />
    </Container>
  );
}
