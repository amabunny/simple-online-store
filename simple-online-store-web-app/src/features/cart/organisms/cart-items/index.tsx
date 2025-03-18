"use client";

import { Delete, PhoneAndroid } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usePriceFormatter } from "@/lib/hooks";
import {
  cartItemsSelector,
  removeFromCart,
  totalItemsCountSelector,
  totalPriceSelector,
} from "@/shared/cart";

export const CartItems = () => {
  const cartItems = useAppSelector(cartItemsSelector);
  const totalItemsCount = useAppSelector(totalItemsCountSelector);
  const totalPrice = useAppSelector(totalPriceSelector);

  const dispatch = useAppDispatch();
  const priceFormatter = usePriceFormatter();

  const onDelete = (id?: number) => {
    if (!id) return;
    dispatch(removeFromCart(id));
  };

  return (
    <Grid2 container flexDirection={"column"} spacing={2}>
      <List>
        {cartItems.length === 0 && (
          <ListItem>
            <ListItemText
              primary={<Typography align="center">Корзина пуста</Typography>}
              secondary={
                <Typography align="center">
                  Добавьте товары, чтобы увидеть их список здесь!
                </Typography>
              }
            />
          </ListItem>
        )}

        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <Grid2 container spacing={2} alignItems={"center"}>
                <Typography>{item.count} шт.</Typography>

                <IconButton onClick={() => onDelete(item.id)}>
                  <Delete />
                </IconButton>
              </Grid2>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <PhoneAndroid />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography>
                  {item.brand} {item.name}
                </Typography>
              }
              secondary={priceFormatter.format(item.price ?? 0)}
            />
          </ListItem>
        ))}

        {totalItemsCount > 0 && (
          <ListItem>
            <ListItemText
              primary={<Typography>Итог:</Typography>}
              secondary={priceFormatter.format(totalPrice)}
            />
          </ListItem>
        )}
      </List>

      <Grid2 container justifyContent={"center"}>
        <Button variant="contained" color="primary">
          Оформить заказ
        </Button>
      </Grid2>
    </Grid2>
  );
};
