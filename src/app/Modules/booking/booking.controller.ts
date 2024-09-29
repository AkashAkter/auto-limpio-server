import { isValidObjectId } from "mongoose";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import { IPaymentPayload } from "../payment/payment.interface";
import { initiatePayment } from "../payment/payment.utils";
import Service from "../service/service.model";
import Slot from "../slot/slot.model";
import { IBooking } from "./booking.interface";
import { bookingService } from "./booking.service";

const { createBookingService, getAllBookingService, getUserBookingsService } =
  bookingService;

export const createBookingIntoDB = catchAsyncError(async (req, res) => {
  const { body } = req;

  const user = req.user;
  const isValidObjId = isValidObjectId(body.service);
  if (!isValidObjId) {
    return sendResponse(res, {
      data: null,
      message: "invalid object id format",
      success: false,
      statusCode: 400,
    });
  }

  const isExistService = await Service.findById(body.service);
  if (!isExistService) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }
  const slot = await Slot.findById(body.slot);
  if (!slot) {
    return sendResponse(res, {
      message: "slot not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  if (slot.isBooked !== "available") {
    sendResponse(res, {
      message: "this slot is not available for booking",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const data: IBooking = {
    customer: user._id,
    service: body.service,
    slot: body.slot,
    ...body,
  };

  await createBookingService(data);

  const paymentPayload: IPaymentPayload = {
    amount: isExistService.price,
    cus_add: user.address,
    cus_email: user.email,
    cus_name: user.firstName + user.lastName,
    cus_phone: user.phone,
    tran_id: `TXN-${Date.now()}`,
  };
  const paymentResponse = await initiatePayment(
    paymentPayload,
    slot._id.toString()
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking successful",
    data: paymentResponse,
  });
});

export const getAllBookings = catchAsyncError(async (req, res) => {
  const { result, totalDoc } = await getAllBookingService(req.query);

  if (result.length > 0) {
    return res.json({
      success: true,
      statusCode: 200,
      message: "All bookings retrieved successfully",
      data: result,
      totalDoc,
    });
  }
  sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
});

export const getUserBookings = catchAsyncError(async (req, res) => {
  const user = req.user;
  const result = await getUserBookingsService(user._id, req.query);
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User bookings retrieved successfully",
      data: result,
    });
  }
  sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
});
