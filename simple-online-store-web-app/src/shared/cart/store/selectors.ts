import { createSelector } from "@reduxjs/toolkit";

import { Product } from "@/api/base";
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

export const cartItemsDictionarySelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce(
      (acc, item) => {
        if (item.id) acc[item.id] = item;
        return acc;
      },
      {} as Record<number, Product & { count: number }>,
    ),
);

export const totalPriceSelector = createSelector(
  cartItemsSelector,
  (cartItems) => {
    return cartItems.reduce((acc, item) => {
      if (!item.price) return acc;

      return acc + item.price * item.count;
    }, 0);
  },
);
