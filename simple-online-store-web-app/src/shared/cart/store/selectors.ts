import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

export const totalItemsCountSelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.values(items).reduce((acc, count) => acc + count, 0),
);
