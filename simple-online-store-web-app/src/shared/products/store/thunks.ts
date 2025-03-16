import { createAsyncThunk } from "@reduxjs/toolkit";

import { productsApi } from "@/api";
import { CreateProductDto } from "@/api/base";

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  return productsApi.productsGet();
});

export const createProduct = createAsyncThunk(
  "products/createProduct",
  (product: CreateProductDto) => {
    return productsApi.productsCreatePost({ createProductDto: product });
  },
);
