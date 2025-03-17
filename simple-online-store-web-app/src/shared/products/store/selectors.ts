import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

import { Sort } from "./types";

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

    if (filters.isNew) {
      filteredProducts = filteredProducts.filter((product) => product.isNew);
    }

    return filteredProducts;
  },
);

export const isAnyFilterAppliedSelector = createSelector(
  (state: RootState) => state.products.filters,
  (state: RootState) => state.products.sort,
  (filters, sort) => {
    return (
      Object.values(filters).some((filter) => filter) ||
      sort !== Sort.CheapFirst
    );
  },
);

export const sortedAndFilteredProductsSelector = createSelector(
  (state: RootState) => state.products.sort,
  filteredProductsSelector,
  (sort, filteredProducts) => {
    const products = [...filteredProducts];

    switch (sort) {
      case Sort.ExpensiveFirst:
        return products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case Sort.CheapFirst:
        return products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case Sort.NewFirst:
        return products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  },
);
