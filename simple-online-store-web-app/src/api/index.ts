import { Configuration, ProductsApi } from "@/api/base";

const basePath =
  typeof window === "object"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_CONTAINER_URL;

const configuration = new Configuration({
  basePath,
});

export const productsApi = new ProductsApi(configuration);
