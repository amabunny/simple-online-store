"use client";

import { ArrowDownward, ArrowUpward, NewReleases } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useDidUpdate,
} from "@/lib/hooks";
import {
  IFilters,
  setFilters,
  setInFlight,
  setSort as setProductsSort,
  Sort,
} from "@/shared/products";

import styles from "./style.module.scss";

interface IProps {
  className?: string;
  onFiltersChange?: (filters: IFilters) => void;
  onSortChange?: (sort: Sort) => void;
}

export const ProductFilters = ({
  className,
  onFiltersChange,
  onSortChange,
}: IProps) => {
  const dispatch = useAppDispatch();

  const inFlight = useAppSelector((state) => state.products.inFlight);

  const [sort, setSort] = useState<Sort>(Sort.CheapFirst);
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(0);
  const [brand, setBrand] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isNew, setIsNew] = useState<boolean>(false);

  const inFlightRef = useRef(inFlight);

  useEffect(() => {
    inFlightRef.current = inFlight;
  }, [inFlight]);

  const handleFiltersClear = () => {
    setPriceFrom(0);
    setPriceTo(0);
    setBrand("");
    setName("");
    setIsNew(false);
    onFiltersChange?.({
      priceTo: 0,
      priceFrom: 0,
      brand: "",
      name: "",
      isNew: false,
    });
  };

  const debouncedOnFiltersChange = useDebounce(() => {
    dispatch(setFilters({ priceTo, priceFrom, brand, name, isNew }));
    dispatch(setInFlight(false));
    onFiltersChange?.({ priceTo, priceFrom, brand, name, isNew });
  }, 1000);

  const debouncedOnSortChange = useDebounce(() => {
    dispatch(setProductsSort(sort));
    onSortChange?.(sort);
  }, 1000);

  useDidUpdate(() => {
    if (!inFlightRef.current) {
      dispatch(setInFlight(true));
    }
    debouncedOnFiltersChange();
  }, [priceFrom, priceTo, brand, name, isNew, debouncedOnFiltersChange]);

  useDidUpdate(() => {
    debouncedOnSortChange();
  }, [debouncedOnSortChange, sort]);

  useEffect(() => {
    return () => {
      dispatch(
        setFilters({
          priceTo: 0,
          priceFrom: 0,
          brand: "",
          name: "",
          isNew: false,
        }),
      );
    };
  }, [dispatch]);

  const isAnyFilterApplied = useMemo(
    () => [priceFrom, priceTo, name, brand, isNew].some(Boolean),
    [priceFrom, priceTo, name, brand, isNew],
  );

  const priceError =
    priceFrom && priceTo && priceFrom > priceTo
      ? "Цена от не может быть больше цены до"
      : null;

  return (
    <Grid2 container spacing={4} className={className}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          Сортировка
        </Typography>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          size="small"
          fullWidth
        >
          <MenuItem value={Sort.CheapFirst}>
            <Grid2 container spacing={1} flexDirection={"row"}>
              <ArrowUpward fontSize="small" />
              Сначала недорогие
            </Grid2>
          </MenuItem>
          <MenuItem value={Sort.ExpensiveFirst}>
            <Grid2 container spacing={1} flexDirection={"row"}>
              <ArrowDownward fontSize="small" />
              Сначала дорогие
            </Grid2>
          </MenuItem>
          <MenuItem value={Sort.NewFirst}>
            <Grid2 container spacing={1} flexDirection={"row"}>
              <NewReleases fontSize="small" />
              Сначала новинки
            </Grid2>
          </MenuItem>
        </Select>
      </Grid2>

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

      <Grid2 size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
            />
          }
          label="Только новинки"
        />
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
