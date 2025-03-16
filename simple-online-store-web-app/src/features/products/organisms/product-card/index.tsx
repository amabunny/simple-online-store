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
import { useMemo } from "react";

import { Product } from "@/api/base";
import { useAppDispatch, useLinkOnClick } from "@/lib/hooks";
import { addToCart } from "@/shared/cart";

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

  const formattedPrice = useMemo(() => {
    if (!price) return "0 RUB";

    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(price);
  }, [price]);

  const handleAddToCart = () => {
    if (!id) return;
    dispatch(addToCart(id));
  };

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
                  label={formattedPrice}
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
          <Button onClick={handleAddToCart} endIcon={<AddShoppingCart />}>
            Добавить в корзину
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
