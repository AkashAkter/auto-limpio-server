import { Types } from "mongoose";

//  interface for the booking system
export interface IBooking {
  customer: Types.ObjectId | string;
  slot: Types.ObjectId | string;
  service: Types.ObjectId | string;
  status: "confirm" | "cancel";
  payment: "paid" | "pending";
}
