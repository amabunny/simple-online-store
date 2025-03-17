import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Values = Record<string, string | number | boolean | undefined>;

export const useQueryStringSync = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const syncWithQueryString = useCallback(
    (values: Values) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  return { syncWithQueryString };
};
