import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

export const filteredProductsSelector = createSelector(
  (state: RootState) => state.products.products,
  (state: RootState) => state.products.filters,
  (products, filters) => {
    let filteredProducts = [...products];

    if (filters.priceFrom) {
      filteredProducts = filteredProducts.filter((product) =>
        product.price ? product.price >= filters.priceFrom : true,
      );
    }

    if (filters.priceTo) {
      filteredProducts = filteredProducts.filter((product) =>
        product.price ? product.price <= filters.priceTo : true,
      );
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter((product) =>
        product.brand
          ? product.brand.toLowerCase().includes(filters.brand.toLowerCase())
          : true,
      );
    }

    if (filters.name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name
          ? product.name.toLowerCase().includes(filters.name.toLowerCase())
          : true,
      );
    }

    return filteredProducts;
  },
);

export const isAnyFilterAppliedSelector = createSelector(
  (state: RootState) => state.products.filters,
  (state: RootState) => state.products.sort,
  (filters, sort) => {
    return Object.values(filters).some((filter) => filter) || sort;
  },
);
