"use client";

export const parseQueryString = (key: string) => {
  const urlParams = new URLSearchParams(globalThis?.location?.search);
  const value = urlParams.get(key);

  if (typeof value === "string" && value) {
    return value;
  }
};

export const parseQueryBoolean = (key: string) => {
  const urlParams = new URLSearchParams(globalThis?.location?.search);
  const value = urlParams.get(key);

  if (typeof value === "string" && value) {
    return value === "true";
  }
};

export const parseQueryNumber = (key: string) => {
  const urlParams = new URLSearchParams(globalThis?.location?.search);
  const value = urlParams.get(key);

  if (typeof value === "string" && value) {
    return Number(value);
  }
};
