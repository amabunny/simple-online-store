"use client";

import { Grid2 } from "@mui/material";
import { useEffect } from "react";

import { Product } from "@/api/base";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store";
import {
  filteredProductsSelector,
  isAnyFilterAppliedSelector,
  setProducts,
} from "@/shared/products";

import { ProductCard } from "../product-card";
import { ProductFilters } from "../product-filters";
import styles from "./style.module.scss";

interface IProps {
  initialProducts: Product[];
}

export const ProductsList = ({ initialProducts }: IProps) => {
  const products = useAppSelector(filteredProductsSelector);
  const isAnyFilterApplied = useAppSelector(isAnyFilterAppliedSelector);
  const inFlight = useAppSelector((state) => state.products.inFlight);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialProducts) {
      dispatch(setProducts(initialProducts));
    }
  }, [dispatch, initialProducts]);

  const renderingProducts =
    isAnyFilterApplied || products.length > 0 ? products : initialProducts;

  return (
    <Grid2 container spacing={4} flexDirection={"row"}>
      <Grid2 size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
        <ProductFilters className={styles.filters} />
      </Grid2>

      <Grid2 container spacing={2} size={{ xs: 12, sm: 12, md: 9, lg: 9 }}>
        {renderingProducts.map((product) => (
          <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ProductCard {...product} loading={inFlight} />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};
