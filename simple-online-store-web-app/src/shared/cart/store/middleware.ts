import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

import {
  decreaseProductCount,
  increaseProductCount,
  removeProductFromCart,
} from "./actions";
import { CART_STORAGE_KEY } from "./constants";

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(
    increaseProductCount,
    decreaseProductCount,
    removeProductFromCart,
  ),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { items } = state.cart;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  },
});
