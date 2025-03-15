import { AddShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

import { Product } from "@/api/base";

export const ProductCard = ({ brand, name, price }: Product) => {
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
        <CardMedia
          component="img"
          height={300}
          image={"/images/products/product-placeholder.jpg"}
          alt={name ?? ""}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {brand} {name}
          </Typography>

          <Chip label={formattedPrice} color="primary" variant="outlined" />
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button endIcon={<AddShoppingCart />}>Добавить в корзину</Button>
      </CardActions>
    </Card>
  );
};
