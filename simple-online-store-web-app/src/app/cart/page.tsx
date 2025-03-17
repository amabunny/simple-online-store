import { Container } from "@mui/material";

import { CartItems } from "@/features/cart";
import { Page } from "@/ui";

export default function CartPage() {
  return (
    <Page title="Корзина">
      <Container maxWidth="sm">
        <CartItems />
      </Container>
    </Page>
  );
}
