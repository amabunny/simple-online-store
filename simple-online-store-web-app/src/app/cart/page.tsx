import { Container } from "@mui/material";
import { Metadata } from "next";

import { CartItems } from "@/features/cart";
import { getSiteTitle } from "@/lib/get-site-title";
import { Page } from "@/ui";

export function generateMetadata(): Metadata {
  return {
    title: getSiteTitle("Корзина"),
  };
}

export default function CartPage() {
  return (
    <Page pageTitle="Корзина">
      <Container maxWidth="sm">
        <CartItems />
      </Container>
    </Page>
  );
}
