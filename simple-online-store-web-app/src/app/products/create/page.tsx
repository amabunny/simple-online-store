import { Container } from "@mui/material";

import { ProductForm } from "@/features/product";
import { getSiteTitle } from "@/lib/get-site-title";

export function generateMetadata() {
  return {
    title: getSiteTitle("Создание продукта"),
  };
}

export default function ProductCreatePage() {
  return (
    <Container maxWidth="lg">
      <ProductForm />
    </Container>
  );
}
