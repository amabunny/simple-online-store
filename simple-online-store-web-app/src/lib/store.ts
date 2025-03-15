import { configureStore } from "@reduxjs/toolkit";

import { productsReducer } from "@/features/products";

export const makeStore = () =>
  configureStore({
    reducer: { products: productsReducer },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
