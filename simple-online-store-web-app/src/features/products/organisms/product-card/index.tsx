"use client";

import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
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
import { useMemo } from "react";

import { Product } from "@/api/base";
import {
  useAppDispatch,
  useAppSelector,
  useLinkOnClick,
  usePriceFormatter,
} from "@/lib/hooks";
import {
  addToCart,
  cartItemsDictionarySelector,
  removeFromCart,
} from "@/shared/cart";

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
  const priceFormatter = usePriceFormatter();

  const handleAddToCart = () => {
    if (!id) return;
    dispatch(addToCart(id));
  };

  const handleRemoveFromCart = () => {
    if (!id) return;
    dispatch(removeFromCart(id));
  };

  const inCart = id && cartItemsDictionary[id];

  const cartItem = useMemo(() => {
    if (!id) return null;

    return cartItemsDictionary[id];
  }, [cartItemsDictionary, id]);

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
                  label={priceFormatter.format(price ?? 0)}
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
          <>
            <Button onClick={handleAddToCart} endIcon={<AddShoppingCart />}>
              Добавить в корзину
            </Button>

            {inCart && (
              <Button
                onClick={handleRemoveFromCart}
                endIcon={<RemoveShoppingCart />}
              >
                Убрать ({cartItem?.count})
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};
