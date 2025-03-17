import { createAction } from "@reduxjs/toolkit";

import { IFilters, Sort } from "./types";

export const setFilters = createAction<Partial<IFilters>>(
  "products/setFilters",
);
export const setSort = createAction<Sort>("products/setSort");
