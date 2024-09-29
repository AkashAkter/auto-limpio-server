/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

// Regex for HH:mm format validation
const timeFormat = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

const BookingSchema = z
  .object({
    service: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    date: z.date(),
    startTime: z
      .string()
      .regex(timeFormat, "Invalid time format")
      .refine((val) => {
        const [hours, minutes] = val.split(":").map((e) => Number(e));
        return hours < 24 && minutes < 60;
      }, "Invalid time"),
    endTime: z
      .string()
      .regex(timeFormat, "Invalid time format")
      .refine((val) => {
        const [hours, minutes] = val.split(":").map((e) => Number(e));
        return hours < 24 && minutes < 60;
      }, "Invalid time"),
    isBooked: z.enum(["available", "booked", "canceled"]),
  })
  .refine(
    (data) => {
      const [startH, startM] = data.startTime.split(":").map((e) => Number(e));
      const [endH, endM] = data.endTime.split(":").map((e) => Number(e));
      return startH < endH || (startH === endH && startM < endM);
    },
    {
      message: "startTime must be earlier than endTime",
      path: ["startTime"],
    }
  );

type IBooking = z.infer<typeof BookingSchema>;
