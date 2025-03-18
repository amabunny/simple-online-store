"use client";

import { Edit, RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
import { Button, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";

import { Product } from "@/api/base";
import { useAppDispatch, useAppSelector, useLinkOnClick } from "@/lib/hooks";
import {
  addToCart,
  cartItemsDictionarySelector,
  removeFromCart,
} from "@/shared/cart";

import styles from "./style.module.scss";

interface IProps {
  product: Product;
}

export const ProductInfo = ({ product }: IProps) => {
  const dispatch = useAppDispatch();
  const handleLinkClick = useLinkOnClick();
  const cartItemsDictionary = useAppSelector(cartItemsDictionarySelector);

  const price = product?.price?.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

  const handleAddToCart = () => {
    if (product.id) {
      dispatch(addToCart(product.id));
    }
  };

  const handleRemoveFromCart = () => {
    if (product.id) {
      dispatch(removeFromCart(product.id));
    }
  };

  const inCart = useMemo(() => {
    if (!product.id) return false;

    return cartItemsDictionary[product.id];
  }, [cartItemsDictionary, product.id]);

  const productInCart = useMemo(() => {
    if (!product.id) return null;

    return cartItemsDictionary[product.id];
  }, [cartItemsDictionary, product.id]);

  return (
    <Grid2 container flexDirection={"row"} spacing={5}>
      <Grid2 container spacing={3} size={{ xs: 12 }}>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Image
            src={"/images/products/product-placeholder.jpg"}
            alt={product.name ?? ""}
            width={612}
            height={437}
            className={styles.image}
          />
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 7 }}
          container
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="h2" gutterBottom>
              {product.brand} {product.name}
            </Typography>
            <Typography variant="h4">{price}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }} container spacing={2}>
            <Grid2>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
              >
                Добавить в корзину
              </Button>
            </Grid2>

            {inCart && (
              <Grid2>
                <Button
                  variant="outlined"
                  startIcon={<RemoveShoppingCart />}
                  onClick={handleRemoveFromCart}
                >
                  Убрать {productInCart?.count}
                </Button>
              </Grid2>
            )}

            <Grid2>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                component="a"
                href={`/products/edit/${product.id}`}
                onClick={handleLinkClick}
              >
                Редактировать
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>

      {product.description && (
        <Grid2 size={{ xs: 6 }}>
          <Typography variant="h4" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" className={styles.description}>
            {product.description}
          </Typography>
        </Grid2>
      )}
    </Grid2>
  );
};
