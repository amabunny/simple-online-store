"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid2,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Product } from "@/api/base";
import { useAppDispatch } from "@/lib/hooks/store";
import { createProduct, updateProduct } from "@/shared/products";
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
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductFormSchemaType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      brand: "",
      name: "",
      price: "",
      isNew: false,
      description: "",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: ProductFormSchemaType) => {
    if (product?.id) {
      dispatch(
        updateProduct({
          id: product.id,
          product: { ...data, price: Number(data.price) },
        }),
      )
        .unwrap()
        .then((result) => {
          router.push(`/products/${result.id}`);
        })
        .catch(() => {
          setIsErrorToastVisible(true);
        });
    } else {
      dispatch(createProduct({ ...data, price: Number(data.price) }))
        .unwrap()
        .then((result) => {
          router.push(`/products/${result.id}`);
        })
        .catch(() => {
          setIsErrorToastVisible(true);
        });
    }
  };

  useEffect(() => {
    if (product) {
      if (typeof product.id === "number") setValue("id", product.id);
      if (typeof product.brand === "string") setValue("brand", product.brand);
      if (typeof product.name === "string") setValue("name", product.name);
      if (typeof product.price === "number")
        setValue("price", product.price.toString());
      if (typeof product.isNew === "boolean") setValue("isNew", product.isNew);
      if (typeof product.description === "string")
        setValue("description", product.description);
    }
  }, [product, setValue]);

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        {product ? "Редактирование товара" : "Создание товара"}
      </Typography>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={4} flexDirection={"row"}>
          <Grid2
            container
            spacing={2}
            flexDirection={"column"}
            size={{ xs: 6 }}
          >
            <Controller
              control={control}
              name="brand"
              render={({ field: { value, onChange } }) => (
                <TextField
                  label="Бренд"
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <TextField
                  label="Название"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({ field: { value, onChange } }) => (
                <TextField
                  label="Цена"
                  type="number"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="isNew"
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={<Checkbox checked={value} onChange={onChange} />}
                  label="Новинка"
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 6 }}>
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <TextareaAutosize
                  value={value}
                  onChange={onChange}
                  className={styles.textarea}
                />
              )}
            />
          </Grid2>
        </Grid2>

        <Grid2>
          <Grid2 container spacing={2} className={styles.buttonsGrid}>
            <Button variant="contained" color="primary" type="submit">
              Сохранить
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.back()}
            >
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
