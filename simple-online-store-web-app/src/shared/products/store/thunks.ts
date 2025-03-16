import { createAsyncThunk } from "@reduxjs/toolkit";

import { productsApi } from "@/api";
import { CreateProductDto, Order, ProductsGetRequest } from "@/api/base";
import { RootState } from "@/lib/store";
import { Sort } from "@/shared/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  (request: ProductsGetRequest) => {
    return productsApi.productsGet(request);
  },
);

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchProductsByFilters",
  (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const filters = state.products.filters;
    const sort = state.products.sort;

    const order: Pick<ProductsGetRequest, "order" | "orderBy"> = {
      orderBy: "brand",
      order: Order.Asc,
    };

    switch (sort) {
      case Sort.ExpensiveFirst:
        order.orderBy = "price";
        order.order = Order.Desc;
        break;

      case Sort.CheapFirst:
        order.orderBy = "price";
        order.order = Order.Asc;
        break;

      case Sort.NewFirst:
        order.orderBy = "isNew";
        order.order = Order.Desc;
        break;
    }

    return thunkApi.dispatch(
      fetchProducts({
        priceFrom: filters.priceFrom ? filters.priceFrom : undefined,
        priceTo: filters.priceTo ? filters.priceTo : undefined,
        brand: filters.brand ? filters.brand : undefined,
        name: filters.name ? filters.name : undefined,
        isNew: filters.isNew ? filters.isNew : undefined,
        ...order,
      }),
    );
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  (product: CreateProductDto) => {
    return productsApi.productsCreatePost({ createProductDto: product });
  },
);
