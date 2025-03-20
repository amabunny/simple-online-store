import { Configuration, ProductsApi } from "@/api/base";

const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL ?? "",
});

export const productsApi = new ProductsApi(configuration);
