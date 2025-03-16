import { createAction } from "@reduxjs/toolkit";

import { ProductId } from "./types";

export const addToCart = createAction<ProductId>("cart/addToCart");
export const removeFromCart = createAction<ProductId>("cart/removeFromCart");
export const setCartItems =
  createAction<Record<ProductId, number>>("cart/setItems");
