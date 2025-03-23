import { Delete } from "@mui/icons-material";
import { Grid2, IconButton, Typography } from "@mui/material";

import { CartProduct } from "@/shared/cart/store/types";
import { InputCounter } from "@/ui";
import { CustomLink } from "@/ui/molecules/link";

import styles from "./styles.module.scss";

interface IProps {
  item: CartProduct;
  onItemDec: (item: CartProduct) => void;
  onItemInc: (item: CartProduct) => void;
  onItemDelete: (item: CartProduct) => void;
}

export const CartItem = ({
  item,
  onItemDec,
  onItemInc,
  onItemDelete,
}: IProps) => {
  return (
    <div className={styles.cartItem}>
      <Grid2 container justifyContent={"space-between"}>
        <Grid2 container spacing={3} flexDirection={"column"}>
          <Grid2>
            <CustomLink href={`products/${item.id}`}>
              <Typography component={"span"} variant={"h6"}>
                {item.brand} {item.name}
              </Typography>
            </CustomLink>
          </Grid2>

          <Grid2>
            <InputCounter
              value={item.count}
              onInc={() => onItemInc(item)}
              onDec={() => onItemDec(item)}
            />
          </Grid2>

          {item.count > 1 && (
            <Grid2>
              <Typography variant={"body2"}>
                Цена за шт.{" "}
                {item.price?.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                })}
              </Typography>
            </Grid2>
          )}
        </Grid2>

        <Grid2
          container
          spacing={2}
          flexDirection={"column"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
        >
          <Grid2>
            <IconButton onClick={() => onItemDelete(item)} size={"small"}>
              <Delete />
            </IconButton>
          </Grid2>

          <Typography>
            Цена:{" "}
            {((item.price ?? 0) * item.count)?.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </Typography>
        </Grid2>
      </Grid2>
    </div>
  );
};
