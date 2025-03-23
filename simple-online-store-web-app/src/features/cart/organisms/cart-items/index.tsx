"use client";

import { Button, Grid2, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  cartItemsDictionarySelector,
  cartItemsSelector,
  decreaseProductCount,
  increaseProductCount,
  removeProductFromCart,
  totalItemsCountSelector,
  totalPriceSelector,
} from "@/shared/cart";
import { CartProduct } from "@/shared/cart/store/types";

import { CartItem } from "../cart-item";

export const CartItems = () => {
  const cartItems = useAppSelector(cartItemsSelector);
  const cartItemsDictionary = useAppSelector(cartItemsDictionarySelector);
  const totalItemsCount = useAppSelector(totalItemsCountSelector);
  const totalPrice = useAppSelector(totalPriceSelector);

  const confirm = useConfirm();
  const dispatch = useAppDispatch();

  const onIncrease = (item: CartProduct) => {
    if (!item.id) return;
    dispatch(increaseProductCount(item.id));
  };

  const onDecrease = async (item: CartProduct) => {
    if (!item.id) return;
    if (cartItemsDictionary[item.id].count === 1) {
      const { confirmed } = await confirm({
        title: "Вы уверены?",
        description: "Хотите удалить товар из корзины?",
      });

      if (confirmed) dispatch(decreaseProductCount(item.id));
    } else {
      dispatch(decreaseProductCount(item.id));
    }
  };

  const onDelete = async (item: CartProduct) => {
    if (!item.id) return;
    const { confirmed } = await confirm({
      title: "Вы уверены?",
      description: "Хотите удалить товар из корзины?",
    });

    if (confirmed) {
      dispatch(removeProductFromCart(item.id));
    }
  };

  return (
    <Grid2 container flexDirection={"column"} spacing={2}>
      <Grid2 spacing={2} container flexDirection={"column"}>
        {cartItems.length === 0 && (
          <div>
            <div>
              <div> Корзина пуста </div>

              <Typography align="center">
                Добавьте товары, чтобы увидеть их список здесь!
              </Typography>
            </div>
          </div>
        )}

        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onItemDec={onDecrease}
            onItemInc={onIncrease}
            onItemDelete={onDelete}
          />
        ))}

        {totalItemsCount > 0 && (
          <div>
            <div>
              <Typography>Итог:</Typography>
              {totalPrice.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            </div>
          </div>
        )}
      </Grid2>

      <Grid2 container justifyContent={"center"}>
        <Button variant="contained" color="primary">
          Оформить заказ
        </Button>
      </Grid2>
    </Grid2>
  );
};
