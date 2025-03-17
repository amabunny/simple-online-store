"use client";

import { Delete, PhoneAndroid } from "@mui/icons-material";
import {
  Avatar,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cartItemsSelector } from "@/shared/cart";
import { removeFromCart } from "@/shared/cart";

export const CartItems = () => {
  const cartItems = useAppSelector(cartItemsSelector);
  const dispatch = useAppDispatch();

  const priceFormatter = useRef(
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }),
  );

  const onDelete = (id?: number) => {
    if (!id) return;
    dispatch(removeFromCart(id));
  };

  return (
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
            secondary={priceFormatter.current.format(item.price ?? 0)}
          />
        </ListItem>
      ))}
    </List>
  );
};
