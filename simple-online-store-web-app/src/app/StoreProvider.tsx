"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "@/lib/store";
import { loadCartFromStorage } from "@/shared/cart";

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    storeRef.current?.dispatch(loadCartFromStorage());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
