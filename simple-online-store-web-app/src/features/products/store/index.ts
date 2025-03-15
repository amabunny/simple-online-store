import { createSlice } from "@reduxjs/toolkit";

import { createProduct, fetchProducts } from "./thunks";
import { IProductsState } from "./types";

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  },
});

export const { setProducts } = productsSlice.actions;

export { createProduct, fetchProducts };

export const productsReducer = productsSlice.reducer;
