import { z } from "zod";

const BookingValidationSchema = z.object({
  customer: z.string(),
  service: z.string(),
  slot: z.date(),
});

export default BookingValidationSchema;
