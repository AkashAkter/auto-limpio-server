import { z } from "zod";

const serviceValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(),
  isDeleted: z.boolean(),
});

export const serviceUpdateValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  duration: z.number().optional(),
  isDeleted: z.boolean().optional(),
});

export default serviceValidationSchema;
