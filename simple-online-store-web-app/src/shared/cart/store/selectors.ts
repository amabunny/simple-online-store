import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";
import { productsByIdSelector } from "@/shared/products";

export const totalItemsCountSelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.values(items).reduce((acc, count) => acc + count, 0),
);

export const cartItemsSelector = createSelector(
  (state: RootState) => state.cart.items,
  productsByIdSelector,
  (cart, products) => {
    if (!Object.keys(products).length) return [];

    return Object.entries(cart).map(([id, count]) => {
      const product = products[Number(id)];

      return {
        ...product,
        count,
      };
    });
  },
);
