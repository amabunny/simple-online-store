"use client";

import { Grid2 } from "@mui/material";
import { useEffect } from "react";

import { Product } from "@/api/base";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store";
import {
  fetchProductsByFilters,
  filteredProductsSelector,
  isAnyFilterAppliedSelector,
  setProducts,
} from "@/shared/products";

import { ProductCard } from "../product-card";
import { ProductFilters } from "../product-filters";
import styles from "./style.module.scss";

interface IProps {
  initialProducts: Product[];
  useServerFilter?: boolean;
}

export const ProductsList = ({ initialProducts, useServerFilter }: IProps) => {
  const clientFilteredProducts = useAppSelector(filteredProductsSelector);
  const products = useAppSelector((state) => state.products.products);
  const isAnyFilterApplied = useAppSelector(isAnyFilterAppliedSelector);

  const dispatch = useAppDispatch();

  const handleFiltersChange = () => {
    if (useServerFilter) dispatch(fetchProductsByFilters());
  };

  const handleSortChange = () => {
    if (useServerFilter) dispatch(fetchProductsByFilters());
  };

  useEffect(() => {
    if (initialProducts) {
      dispatch(setProducts(initialProducts));
    }
  }, [dispatch, initialProducts]);

  const renderingProducts =
    isAnyFilterApplied || products.length > 0
      ? useServerFilter
        ? products
        : clientFilteredProducts
      : initialProducts;

  return (
    <Grid2 container spacing={4} flexDirection={"row"}>
      <Grid2 size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
        <ProductFilters
          className={styles.filters}
          onFiltersChange={handleFiltersChange}
          onSortChange={handleSortChange}
        />
      </Grid2>

      <Grid2 container spacing={2} size={{ xs: 12, sm: 12, md: 9, lg: 9 }}>
        {renderingProducts.map((product) => (
          <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};
