import { z } from "zod";

export const movementSchema = z.object({
  product: z
    .string()
    .min(1, "Le produit est obligatoire."),

  type: z.enum(["IN", "OUT"], {
    errorMap: () => ({
      message: "Le type de mouvement est invalide.",
    }),
  }),

  quantity: z
    .number({
      required_error: "La quantité est obligatoire.",
    })
    .int("La quantité doit être un entier.")
    .positive("La quantité doit être supérieure à 0."),

  note: z
    .string()
    .optional(),
});