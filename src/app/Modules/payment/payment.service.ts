import { readFileSync } from "fs";
import { join } from "path";
import Booking from "../booking/booking.model";
import Slot from "../slot/slot.model";
import Payment from "./payment.model";

export const createPayment = async (amount: number, transactionId: string) => {
  await Payment.create({
    amount: amount,
    transactionId,
    status: "Paid",
  });

  const filePath = join(__dirname, "../../templates/success.html");
  let file = readFileSync(filePath, "utf-8");
  file = file.replace("{{link}}", "http://localhost:5173/");

  return file;
};
export const failedPayment = async (slot: string) => {
  await Booking.findOneAndUpdate({ slot }, { $set: { status: "cancel" } });
  await Slot.findOneAndUpdate(
    { _id: slot },
    { $set: { isBooked: "available" } }
  );

  const filePath = join(__dirname, "../../templates/error.html");
  let file = readFileSync(filePath, "utf-8");
  file = file.replace("{{link}}", "http://localhost:5173/");
  return file;
};

export const paymentService = {
  createPayment,
  failedPayment,
};
