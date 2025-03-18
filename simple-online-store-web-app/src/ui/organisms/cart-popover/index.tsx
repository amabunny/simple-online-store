"use client";

import { List, ListItem, ListItemText, Typography } from "@mui/material";

import { useAppSelector, usePriceFormatter } from "@/lib/hooks";
import { cartItemsSelector } from "@/shared/cart";

import styles from "./style.module.scss";

export const CartPopover = () => {
  const cartItems = useAppSelector(cartItemsSelector);
  const priceFormatter = usePriceFormatter();

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
              secondary={priceFormatter.format(item.price ?? 0)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
