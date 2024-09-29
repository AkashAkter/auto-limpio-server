import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Slot",
    },
    payment: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["cancel", "confirm", "complete"],
      default: "confirm",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
