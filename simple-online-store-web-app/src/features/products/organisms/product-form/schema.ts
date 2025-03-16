import { z } from "zod";

export const ProductFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Обязательное поле"),
  price: z.string().min(1, "Обязательное поле"),
  brand: z.string().min(1, "Обязательное поле"),
  isNew: z.boolean(),
});

export type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;
