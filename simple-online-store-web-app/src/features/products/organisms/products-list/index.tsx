"use client";

import { Grid2 } from "@mui/material";
import { useEffect } from "react";

import { Product } from "@/api/base";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store";

import { ProductCard } from "../../molecules/product-card";
import { setProducts } from "../../store";

interface Props {
  initialProducts: Product[];
}

export const ProductsList = ({ initialProducts }: Props) => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialProducts) {
      dispatch(setProducts(initialProducts));
    }
  }, [dispatch, initialProducts]);

  const renderingProducts = products.length > 0 ? products : initialProducts;

  return (
    <Grid2 container spacing={2}>
      {renderingProducts.map((product) => (
        <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductCard {...product} />
        </Grid2>
      ))}
    </Grid2>
  );
};
