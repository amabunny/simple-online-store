import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setCartItems } from "./actions";
import { ICartState, ProductId } from "./types";

const initialState: ICartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductId>) => {
      if (state.items[action.payload]) {
        state.items[action.payload]++;
      } else {
        state.items[action.payload] = 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductId>) => {
      if (state.items[action.payload] === 1) {
        delete state.items[action.payload];
      } else {
        state.items[action.payload]--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCartItems, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
export { cartListenerMiddleware } from "./middleware";
export {
  cartItemsDictionarySelector,
  cartItemsSelector,
  totalItemsCountSelector,
  totalPriceSelector,
} from "./selectors";
export { loadCartFromStorage } from "./thunks";
