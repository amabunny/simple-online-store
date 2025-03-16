"use client";

import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useDidUpdate,
} from "@/lib/hooks";

import { setFilters, setInFlight } from "../../store";
import styles from "./style.module.scss";

interface IProps {
  className?: string;
}

export const ProductFilters = ({ className }: IProps) => {
  const dispatch = useAppDispatch();

  const inFlight = useAppSelector((state) => state.products.inFlight);

  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(0);
  const [brand, setBrand] = useState<string>("");
  const [name, setName] = useState<string>("");

  const inFlightRef = useRef(inFlight);

  useEffect(() => {
    inFlightRef.current = inFlight;
  }, [inFlight]);

  const handleFiltersClear = () => {
    setPriceFrom(0);
    setPriceTo(0);
    setBrand("");
    setName("");
  };

  const debouncedOnFiltersChange = useDebounce(() => {
    dispatch(setFilters({ priceTo, priceFrom, brand, name }));
    dispatch(setInFlight(false));
  }, 1000);

  useDidUpdate(() => {
    if (!inFlightRef.current) {
      dispatch(setInFlight(true));
    }
    debouncedOnFiltersChange();
  }, [priceFrom, priceTo, brand, name, debouncedOnFiltersChange]);

  useEffect(() => {
    return () => {
      dispatch(setFilters({ priceTo: 0, priceFrom: 0, brand: "", name: "" }));
    };
  }, [dispatch]);

  const isAnyFilterApplied = useMemo(
    () => [priceFrom, priceTo, name, brand].some(Boolean),
    [priceFrom, priceTo, name, brand],
  );

  const priceError =
    priceFrom && priceTo && priceFrom > priceTo
      ? "Цена от не может быть больше цены до"
      : null;

  return (
    <Grid2 container spacing={4} className={className}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          Цена
        </Typography>
        <Grid2 container spacing={2} flexDirection={"row"}>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              type="number"
              placeholder="от"
              size="small"
              value={priceFrom === 0 ? "" : priceFrom}
              onChange={(e) => setPriceFrom(Number(e.target.value))}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              type="number"
              placeholder="до"
              size="small"
              value={priceTo === 0 ? "" : priceTo}
              onChange={(e) => setPriceTo(Number(e.target.value))}
            />
          </Grid2>
        </Grid2>
        {priceError && (
          <div className={styles.priceError}>
            <Typography variant="body2">{priceError}</Typography>
          </div>
        )}
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          Бренд
        </Typography>
        <div>
          <TextField
            placeholder="Apple"
            size="small"
            fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          Название
        </Typography>
        <div>
          <TextField
            placeholder="iPhone 11"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Grid2>

      {isAnyFilterApplied && (
        <Grid2 size={{ xs: 12 }} container justifyContent={"center"}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFiltersClear}
          >
            Очистить
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
