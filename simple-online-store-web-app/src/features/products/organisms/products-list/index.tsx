"use client";

import { Grid2 } from "@mui/material";
import { Suspense } from "react";

import { Product } from "@/api/base";
import { useAppSelector } from "@/lib/hooks/use-store";
import {
  isAnyFilterAppliedSelector,
  sortedAndFilteredProductsSelector,
} from "@/shared/products";

import { ProductCard } from "../product-card";
import { ProductsFilters } from "../products-filters";
import styles from "./style.module.scss";

interface IProps {
  initialProducts: Product[];
}

export const ProductsList = ({ initialProducts }: IProps) => {
  const sortedAndFilteredStateProducts = useAppSelector(
    sortedAndFilteredProductsSelector,
  );

  const stateProducts = useAppSelector((state) => state.products.products);
  const isAnyFilterApplied = useAppSelector(isAnyFilterAppliedSelector);

  const renderingProducts =
    isAnyFilterApplied || stateProducts.length > 0
      ? sortedAndFilteredStateProducts
      : initialProducts;

  return (
    <Grid2 container spacing={4} flexDirection={"row"}>
      <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
        <Suspense>
          <ProductsFilters className={styles.filters} />
        </Suspense>
      </Grid2>

      <Grid2 container spacing={2} size={{ xs: 12, sm: 12, md: 8, lg: 9 }}>
        {renderingProducts.map((product) => (
          <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};
