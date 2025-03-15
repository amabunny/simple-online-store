"use client";

import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Product } from "@/api/base";
import { useAppDispatch } from "@/lib/hooks/store";
import { CustomSnackbar } from "@/ui";

import { createProduct } from "../../store";
import styles from "./style.module.scss";

interface Props {
  product?: Product;
}

export const ProductForm = ({ product }: Props) => {
  const [toastStatus, setToastStatus] = useState<null | "success" | "error">(
    null,
  );

  const { register, handleSubmit, setValue } = useForm<Product>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: Product) => {
    dispatch(createProduct(data))
      .unwrap()
      .then(() => {
        setToastStatus("success");
      })
      .catch(() => {
        setToastStatus("error");
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

  const toastMessage = useMemo(() => {
    if (toastStatus === "success") {
      return product ? "Товар успешно обновлен" : "Товар успешно создан";
    }

    if (toastStatus === "error") {
      return "Ошибка при сохранении товара";
    }

    return "";
  }, [product, toastStatus]);

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
        open={!!toastStatus}
        onClose={() => setToastStatus(null)}
        severity={toastStatus}
        message={toastMessage}
      />
    </div>
  );
};
