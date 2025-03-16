import { AddShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

import { Product } from "@/api/base";

interface IProps extends Product {
  loading?: boolean;
}

export const ProductCard = ({ brand, name, price, loading }: IProps) => {
  const formattedPrice = useMemo(() => {
    if (!price) return "0 RUB";

    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(price);
  }, [price]);

  return (
    <Card>
      <CardActionArea>
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

          {loading ? (
            <Skeleton height={33} width={120} />
          ) : (
            <Chip label={formattedPrice} color="primary" variant="outlined" />
          )}
        </CardContent>
      </CardActionArea>

      <CardActions>
        {loading ? (
          <Skeleton height={36} width={120} />
        ) : (
          <Button endIcon={<AddShoppingCart />}>Добавить в корзину</Button>
        )}
      </CardActions>
    </Card>
  );
};
