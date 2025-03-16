"use client";

import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Product } from "@/api/base";
import { useAppDispatch } from "@/lib/hooks/store";
import { createProduct } from "@/shared/products";
import { CustomSnackbar } from "@/ui";

import styles from "./style.module.scss";

interface IProps {
  product?: Product;
}

export const ProductForm = ({ product }: IProps) => {
  const [isErrorToastVisible, setIsErrorToastVisible] = useState(false);
  const [isSuccessToastVisible, setIsSuccessToastVisible] = useState(false);

  const { register, handleSubmit, setValue } = useForm<Product>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: Product) => {
    dispatch(createProduct(data))
      .unwrap()
      .then(() => {
        setIsSuccessToastVisible(true);
      })
      .catch(() => {
        setIsErrorToastVisible(true);
      });
  };

  useEffect(() => {
    if (product) {
      setValue("id", product.id);
      setValue("brand", product.brand);
      setValue("name", product.name);
      setValue("price", product.price);
    }
  }, [product, setValue]);

  const succsesMessage = useMemo(
    () => (product ? "Товар успешно обновлен" : "Товар успешно создан"),
    [product],
  );

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Создание товара
      </Typography>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={4} flexDirection={"column"}>
          <TextField label="Бренд" {...register("brand")} />
          <TextField label="Название" {...register("name")} />
          <TextField label="Цена" type="number" {...register("price")} />

          <Grid2 container spacing={2} className={styles.buttonsGrid}>
            <Button variant="contained" color="primary" type="submit">
              Сохранить
            </Button>

            <Button variant="contained" color="secondary">
              Отмена
            </Button>
          </Grid2>
        </Grid2>
      </form>

      <CustomSnackbar
        open={isSuccessToastVisible}
        onClose={() => setIsSuccessToastVisible(false)}
        severity={"success"}
        message={succsesMessage}
      />

      <CustomSnackbar
        open={isErrorToastVisible}
        onClose={() => setIsErrorToastVisible(false)}
        severity={"error"}
        message={"Ошибка при сохранении товара"}
      />
    </div>
  );
};
