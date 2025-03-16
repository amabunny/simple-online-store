"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Product } from "@/api/base";
import { useAppDispatch } from "@/lib/hooks/store";
import { createProduct } from "@/shared/products";
import { CustomSnackbar } from "@/ui";

import { ProductFormSchema, ProductFormSchemaType } from "./schema";
import styles from "./style.module.scss";

interface IProps {
  product?: Product;
}

export const ProductForm = ({ product }: IProps) => {
  const router = useRouter();

  const [isErrorToastVisible, setIsErrorToastVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormSchemaType>({
    resolver: zodResolver(ProductFormSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: ProductFormSchemaType) => {
    dispatch(createProduct({ ...data, price: Number(data.price) }))
      .unwrap()
      .then((result) => {
        router.push(`/products/${result.id}`);
      })
      .catch(() => {
        setIsErrorToastVisible(true);
      });
  };

  useEffect(() => {
    if (product) {
      if (typeof product.id === "number") setValue("id", product.id);
      if (typeof product.brand === "string") setValue("brand", product.brand);
      if (typeof product.name === "string") setValue("name", product.name);
      if (typeof product.price === "number")
        setValue("price", product.price.toString());
      if (typeof product.isNew === "boolean") setValue("isNew", product.isNew);
    }
  }, [product, setValue]);

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Создание товара
      </Typography>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={4} flexDirection={"column"}>
          <TextField
            label="Бренд"
            error={!!errors.brand}
            helperText={errors.brand?.message}
            {...register("brand")}
          />
          <TextField
            label="Название"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Цена"
            type="number"
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register("price")}
          />

          <FormControlLabel
            control={<Checkbox {...register("isNew")} />}
            label="Новинка"
          />

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
        open={isErrorToastVisible}
        onClose={() => setIsErrorToastVisible(false)}
        severity={"error"}
        message={"Ошибка при сохранении товара"}
      />
    </div>
  );
};
