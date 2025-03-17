import { createSlice } from "@reduxjs/toolkit";

import { setFilters, setSort } from "./actions";
import { createProduct, fetchProducts, fetchProductsByFilters } from "./thunks";
import { IProductsState, Sort } from "./types";

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: null,
  inFlight: false,
  filters: {
    priceFrom: 0,
    priceTo: 0,
    brand: "",
    name: "",
    isNew: false,
  },
  sort: Sort.CheapFirstDefault,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setInFlight: (state, action) => {
      if (state.inFlight !== action.payload) {
        state.inFlight = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setFilters, (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    });
    builder.addCase(setSort, (state, action) => {
      state.sort = action.payload;
    });
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

export {
  filteredProductsSelector,
  isAnyFilterAppliedSelector,
  sortedAndFilteredProductsSelector,
} from "./selectors";
export const { setProducts, setInFlight } = productsSlice.actions;
export { createProduct, fetchProducts, setFilters, setSort };
export { fetchProductsByFilters };
export const productsReducer = productsSlice.reducer;
export { tryParseFiltersFromQs } from "./thunks";
export type { IFilters } from "./types";
export { Sort } from "./types";
