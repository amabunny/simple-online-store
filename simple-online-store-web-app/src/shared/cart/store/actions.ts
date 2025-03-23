import { createAction } from "@reduxjs/toolkit";

import { ProductId } from "./types";

export const increaseProductCount = createAction<ProductId>(
  "cart/increaseProductCount",
);
export const decreaseProductCount = createAction<ProductId>(
  "cart/decreaseProductCount",
);
export const removeProductFromCart = createAction<ProductId>(
  "cart/removeProductFromCart",
);
export const setCartItems =
  createAction<Record<ProductId, number>>("cart/setItems");
