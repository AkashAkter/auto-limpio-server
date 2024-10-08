import axios from "axios";
import jwt from "jsonwebtoken";
import { IPaymentPayload } from "./payment.interface";
import dotenv from "dotenv";

dotenv.config();

export const initiatePayment = async (
  payload: IPaymentPayload,
  slotId: string
) => {
  const { amount, cus_add, cus_name, cus_phone, cus_email, tran_id } = payload;

  const PT = jwt.sign(
    { transactionId: tran_id, slotId, amount },
    process.env.SIGNATURE_KEY as string,
    { expiresIn: "1m" }
  );

  try {
    const response = await axios.post(`${process.env.PAYMENT_URL}`, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      cus_name,
      cus_email,
      cus_phone,
      cus_add1: cus_add,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_country: "Bangladesh",
      currency: "BDT",
      amount,
      tran_id,
      success_url: `https://auto-limpio-server.vercel.app/api/payment/success?pt=${PT}`,
      fail_url: `https://auto-limpio-server.vercel.app/api/payment/fail?pt=${PT}`,
      cancel_url: `https://auto-limpio-server.vercel.app/api/payment/fail?pt=${PT}`,
      desc: "Course Fee",
      type: "json",
    });

    return response.data;
  } catch (error) {
    throw new Error("Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Payment validation failed!");
  }
};
