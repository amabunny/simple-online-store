import { createAsyncThunk } from "@reduxjs/toolkit";

import { productsApi } from "@/api";
import {
  CreateProductDto,
  Order,
  ProductsGetRequest,
  UpdateProductDto,
} from "@/api/base";
import type { RootState } from "@/lib/store";

import { setFilters, setSort } from "./actions";
import { IFilters, Sort } from "./types";

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
    const sort = state.products.sort;
    const filters = state.products.filters;
    const order: Pick<ProductsGetRequest, "order" | "orderBy"> = {
      orderBy: "brand",
      order: Order.Asc,
    };

    switch (sort) {
      case Sort.ExpensiveFirst:
        order.orderBy = "price";
        order.order = Order.Desc;
        break;

      case Sort.CheapFirstDefault:
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  (params: { id: number; product: UpdateProductDto }) => {
    return productsApi.productsIdPut({
      id: params.id,
      updateProductDto: params.product,
    });
  },
);

export const tryParseFiltersFromQs = createAsyncThunk(
  "products/tryParseFiltersFromQs",
  (_, thunkApi) => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = thunkApi.getState() as RootState;
    let sort = state.products.sort;

    const priceFromQ = urlParams.get("priceFrom");
    const priceToQ = urlParams.get("priceTo");
    const brandQ = urlParams.get("brand");
    const nameQ = urlParams.get("name");
    const isNewQ = urlParams.get("isNew");
    const sortQ = urlParams.get("sort");

    const filters: Partial<IFilters> = {};

    if (priceFromQ) {
      filters.priceFrom = Number(priceFromQ);
    }

    if (priceToQ) {
      filters.priceTo = Number(priceToQ);
    }

    if (brandQ) {
      filters.brand = brandQ;
    }

    if (nameQ) {
      filters.name = nameQ;
    }

    if (isNewQ) {
      filters.isNew = isNewQ === "true";
    }

    switch (sortQ) {
      case Sort.ExpensiveFirst:
        sort = Sort.ExpensiveFirst;
        break;

      case Sort.NewFirst:
        sort = Sort.NewFirst;
        break;

      default:
        sort = Sort.CheapFirstDefault;
        break;
    }

    thunkApi.dispatch(setFilters(filters));
    thunkApi.dispatch(setSort(sort));
  },
);
