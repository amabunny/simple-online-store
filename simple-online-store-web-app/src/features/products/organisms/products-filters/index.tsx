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
  useQueryStringSync,
} from "@/lib/hooks";
import {
  parseQueryBoolean,
  parseQueryNumber,
  parseQueryString,
} from "@/lib/parse-query";
import {
  setFilters,
  setInFlight,
  setSort as setProductsSort,
  Sort,
  tryParseFiltersFromQs,
} from "@/shared/products";

import styles from "./style.module.scss";

interface IProps {
  className?: string;
}

export const ProductsFilters = ({ className }: IProps) => {
  const dispatch = useAppDispatch();

  const inFlight = useAppSelector((state) => state.products.inFlight);

  const [sort, setSort] = useState<Sort>(Sort.CheapFirstDefault);
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(0);
  const [brand, setBrand] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isNew, setIsNew] = useState<boolean>(false);

  const inFlightRef = useRef(inFlight);

  const { syncWithQueryString } = useQueryStringSync();

  useEffect(() => {
    inFlightRef.current = inFlight;
  }, [inFlight]);

  useEffect(() => {
    const parsedSort = parseQueryString("sort") as Sort;
    const parsedPriceFrom = parseQueryNumber("priceFrom");
    const parsedPriceTo = parseQueryNumber("priceTo");
    const parsedBrand = parseQueryString("brand");
    const parsedName = parseQueryString("name");
    const parsedIsNew = parseQueryBoolean("isNew");

    if (parsedSort) setSort(parsedSort);
    if (parsedPriceFrom !== null && parsedPriceFrom !== undefined)
      setPriceFrom(parsedPriceFrom);
    if (parsedPriceTo !== null && parsedPriceTo !== undefined)
      setPriceTo(parsedPriceTo);
    if (parsedBrand) setBrand(parsedBrand);
    if (parsedName) setName(parsedName);
    if (parsedIsNew !== null && parsedIsNew !== undefined)
      setIsNew(parsedIsNew);

    dispatch(tryParseFiltersFromQs());
  }, [dispatch]);

  const handleFiltersClear = () => {
    setPriceFrom(0);
    setPriceTo(0);
    setBrand("");
    setName("");
    setIsNew(false);
    setSort(Sort.CheapFirstDefault);
  };

  const debouncedOnFiltersChange = useDebounce(() => {
    dispatch(setFilters({ priceTo, priceFrom, brand, name, isNew }));
    dispatch(setProductsSort(sort));
    dispatch(setInFlight(false));
    syncWithQueryString({
      priceFrom,
      priceTo,
      brand,
      name,
      isNew,
      sort: sort === Sort.CheapFirstDefault ? undefined : sort,
    });
  }, 1000);

  useDidUpdate(() => {
    if (!inFlightRef.current) {
      dispatch(setInFlight(true));
    }
    debouncedOnFiltersChange();
  }, [priceFrom, priceTo, brand, name, isNew, sort, debouncedOnFiltersChange]);

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
    () =>
      [
        priceFrom,
        priceTo,
        name,
        brand,
        isNew,
        sort !== Sort.CheapFirstDefault,
      ].some(Boolean),
    [priceFrom, priceTo, name, brand, isNew, sort],
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
          <MenuItem value={Sort.CheapFirstDefault}>
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
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              type="number"
              placeholder="до"
              size="small"
              value={priceTo === 0 ? "" : priceTo}
              onChange={(e) => setPriceTo(Number(e.target.value))}
              fullWidth
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
