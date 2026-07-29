import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères."),

  sku: z
    .string()
    .min(1, "La référence (SKU) est obligatoire."),

  description: z
    .string()
    .optional(),

  category: z
    .string()
    .min(1, "La catégorie est obligatoire."),

  price: z
    .number({
      required_error: "Le prix est obligatoire.",
    })
    .positive("Le prix doit être supérieur à 0."),

  quantity: z
    .number({
      required_error: "La quantité est obligatoire.",
    })
    .int("La quantité doit être un entier.")
    .min(0, "La quantité ne peut pas être négative."),
});