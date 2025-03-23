"use client";

import { AddShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid2,
  Skeleton,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useMemo } from "react";

import { Product } from "@/api/base";
import { useAppDispatch, useAppSelector, useLinkOnClick } from "@/lib/hooks";
import {
  cartItemsDictionarySelector,
  decreaseProductCount,
  increaseProductCount,
} from "@/shared/cart";
import { InputCounter } from "@/ui";

import styles from "./style.module.scss";

interface IProps extends Product {
  loading?: boolean;
}

export const ProductCard = ({
  brand,
  name,
  price,
  loading,
  id,
  isNew,
}: IProps) => {
  const dispatch = useAppDispatch();
  const handleLinkOnClick = useLinkOnClick();
  const cartItemsDictionary = useAppSelector(cartItemsDictionarySelector);
  const confirm = useConfirm();

  const cartItem = useMemo(() => {
    if (!id) return null;
    return cartItemsDictionary[id];
  }, [cartItemsDictionary, id]);

  const handleAddToCart = () => {
    if (!id) return;
    dispatch(increaseProductCount(id));
  };

  const handleRemoveFromCart = async () => {
    if (!id) return;
    if (cartItem?.count === 1) {
      const { confirmed } = await confirm({
        title: "Вы уверены?",
        description: "Хотите удалить товар из корзины?",
      });

      if (confirmed) {
        dispatch(decreaseProductCount(id));
      }
    } else {
      dispatch(decreaseProductCount(id));
    }
  };

  const inCart = id && cartItemsDictionary[id];

  return (
    <Card>
      <CardActionArea
        component={"a"}
        href={`/products/${id}`}
        onClick={handleLinkOnClick}
      >
        {loading ? (
          <CardMedia component="div">
            <Skeleton height={300} sx={{ transform: "none" }} />
          </CardMedia>
        ) : (
          <CardMedia
            component="img"
            height={300}
            image={"/images/products/product-placeholder.jpg"}
            alt={name ?? ""}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5">
            {loading ? <Skeleton /> : `${brand} ${name}`}
          </Typography>

          <Grid2 container spacing={1}>
            {loading ? (
              <Skeleton height={33} width={120} />
            ) : (
              <>
                {isNew && (
                  <Chip label="Новинка" color="warning" variant="outlined" />
                )}
                <Chip
                  label={price?.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
                  color="primary"
                  variant="outlined"
                />
              </>
            )}
          </Grid2>
        </CardContent>
      </CardActionArea>

      <CardActions>
        {loading ? (
          <Skeleton height={36} width={120} />
        ) : (
          <Grid2 container>
            {inCart ? (
              <Grid2 container alignItems={"center"}>
                <InputCounter
                  className={styles.inCartCounter}
                  value={cartItem?.count ?? 0}
                  onInc={handleAddToCart}
                  onDec={handleRemoveFromCart}
                />
              </Grid2>
            ) : (
              <Button onClick={handleAddToCart} endIcon={<AddShoppingCart />}>
                Купить
              </Button>
            )}
          </Grid2>
        )}
      </CardActions>
    </Card>
  );
};
