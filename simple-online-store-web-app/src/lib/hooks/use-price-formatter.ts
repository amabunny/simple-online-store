import { useMemo } from "react";

export const usePriceFormatter = () => {
  return useMemo(
    () =>
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }),
    [],
  );
};
