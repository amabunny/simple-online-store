"use client";

import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useAppSelector } from "@/lib/hooks";
import { cartItemsSelector } from "@/shared/cart";

import styles from "./style.module.scss";

export const CartPopover = () => {
  const cartItems = useAppSelector(cartItemsSelector);

  return (
    <div className={styles.cartPopover}>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={
                <Typography variant="body1">
                  {item.brand} {item.name} ({item.count} шт.)
                </Typography>
              }
              secondary={item.price?.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
