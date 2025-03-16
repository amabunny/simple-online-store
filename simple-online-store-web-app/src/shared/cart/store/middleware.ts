import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

import { addToCart, removeFromCart } from "./actions";
import { CART_STORAGE_KEY } from "./constants";

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, removeFromCart),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { items } = state.cart;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  },
});
