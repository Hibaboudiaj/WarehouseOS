import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères."),

  description: z
    .string()
    .optional(),
});