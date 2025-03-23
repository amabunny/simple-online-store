import { createSlice } from "@reduxjs/toolkit";

import {
  decreaseProductCount,
  increaseProductCount,
  removeProductFromCart,
  setCartItems,
} from "./actions";
import { ICartState } from "./types";

const initialState: ICartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(increaseProductCount, (state, action) => {
      if (state.items[action.payload]) {
        state.items[action.payload]++;
      } else {
        state.items[action.payload] = 1;
      }
    });
    builder.addCase(decreaseProductCount, (state, action) => {
      if (state.items[action.payload] === 1) {
        delete state.items[action.payload];
      } else {
        state.items[action.payload]--;
      }
    });
    builder.addCase(setCartItems, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(removeProductFromCart, (state, action) => {
      delete state.items[action.payload];
    });
  },
});

export const cartReducer = cartSlice.reducer;
export { decreaseProductCount, increaseProductCount, removeProductFromCart };
export { cartListenerMiddleware } from "./middleware";
export {
  cartItemsDictionarySelector,
  cartItemsSelector,
  totalItemsCountSelector,
  totalPriceSelector,
} from "./selectors";
export { loadCartFromStorage } from "./thunks";
