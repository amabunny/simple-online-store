import { createAsyncThunk } from "@reduxjs/toolkit";

import { setCartItems } from "./actions";
import { CART_STORAGE_KEY } from "./constants";

export const loadCartFromStorage = createAsyncThunk(
  "cart/loadFromStorage",
  async (_, thunkApi) => {
    const localStorageItems = localStorage.getItem(CART_STORAGE_KEY);
    if (!localStorageItems) {
      return;
    }
    const items = JSON.parse(localStorageItems);
    thunkApi.dispatch(setCartItems(items));
  },
);
