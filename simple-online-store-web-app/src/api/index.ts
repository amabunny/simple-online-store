import * as client from "@/api/base";

const configuration = new client.Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL ?? "",
});

export const productsApi = new client.ProductsApi(configuration);
