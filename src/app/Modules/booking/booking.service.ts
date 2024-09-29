import QueryBuilder from "../../builder/QueryBuilder";
import { IAnyObject } from "../../interface/error";
import Slot from "../slot/slot.model";
import { IBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBookingService = async (payload: IBooking) => {
  const create = await Booking.create(payload);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const update = await Slot.findByIdAndUpdate(payload.slot, {
    isBooked: "booked",
  });

  const result = await Booking.findById(create._id)
    .populate("service")
    .populate("slot")
    .populate("customer");

  return result;
};

const getAllBookingService = async (query: IAnyObject) => {
  const find = Booking.find()
    .sort("-createdAt")
    .populate("service")
    .populate("slot")
    .populate("customer");
  const queryBuilder = new QueryBuilder(find, query).filter().paginate();
  const totalDoc = await queryBuilder.count();
  const result = await queryBuilder.modelQuery;
  return { result, totalDoc: totalDoc.totalCount };
};

const getUserBookingsService = async (userId: string, query: IAnyObject) => {
  const model = Booking.find({ customer: userId })
    .populate("service")
    .populate("slot")
    .populate("customer");

  const queryBuild = new QueryBuilder(model, query).filter();
  const result = await queryBuild.modelQuery;

  return result;
};

export const bookingService = {
  createBookingService,
  getAllBookingService,
  getUserBookingsService,
};
