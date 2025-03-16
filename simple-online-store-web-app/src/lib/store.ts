import { configureStore } from "@reduxjs/toolkit";

import { cartListenerMiddleware, cartReducer } from "@/shared/cart";
import { productsReducer } from "@/shared/products";

export const makeStore = () =>
  configureStore({
    reducer: { products: productsReducer, cart: cartReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(cartListenerMiddleware.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
