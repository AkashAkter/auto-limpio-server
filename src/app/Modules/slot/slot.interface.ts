import { Types } from "mongoose";

export interface ISlot {
  service: Types.ObjectId | string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
}

export default ISlot;
