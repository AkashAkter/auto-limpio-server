"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
/* eslint-disable no-console */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const auth_model_1 = require("../Auth/auth.model");
const carService_model_1 = require("../CarServices/carService.model");
const slots_model_1 = require("../Slots/slots.model");
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
const payment_1 = require("../../utils/payment");
const BaseQueryBuilder_1 = __importDefault(require("../../queryBuilder/BaseQueryBuilder"));
const booking_constant_1 = require("./booking.constant");
const createBookingIntoDB = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    // const transactionId = `TXN-${payload.service}`;
    const { email } = userData;
    const user = yield auth_model_1.User.isUserExists(email);
    const customerId = user === null || user === void 0 ? void 0 : user._id;
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist!");
    }
    const service = yield carService_model_1.CarService.findById(payload === null || payload === void 0 ? void 0 : payload.service);
    if (!service) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Car Service doesn't exist!");
    }
    const slot = yield slots_model_1.SlotAppointment.findById(payload === null || payload === void 0 ? void 0 : payload.slot);
    if (!slot) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Slot Appointment doesn't exist!");
    }
    const bookingData = Object.assign(Object.assign({}, payload), { customer: customerId });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const [createdBooking] = yield booking_model_1.Booking.create([bookingData], { session });
        const result = yield createdBooking.populate([
            { path: 'customer' },
            { path: 'service' },
            { path: 'slot' },
        ]);
        if (!Object.keys(result).length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to book service!');
        }
        yield slots_model_1.SlotAppointment.findByIdAndUpdate(slot === null || slot === void 0 ? void 0 : slot._id, { isBooked: 'booked' }, { new: true, session });
        const paymentData = {
            transactionId: payload === null || payload === void 0 ? void 0 : payload.transactionId,
            amount: payload === null || payload === void 0 ? void 0 : payload.totalBookingCost,
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.phone,
            customerAddress: user.address,
        };
        const paymentSession = yield (0, payment_1.initiatePayment)(paymentData);
        yield session.commitTransaction();
        yield session.endSession();
        return paymentSession;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        // throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book service!');
    }
});
const getAllBookingsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingQuery = new BaseQueryBuilder_1.default(booking_model_1.Booking.find(), query)
        .search(booking_constant_1.bookingSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate('customer')
        .populate('service')
        .populate('slot');
    const meta = yield bookingQuery.countTotal();
    const result = yield bookingQuery.modelQuery;
    if (result.length === 0) {
        return null;
    }
    return { meta, result };
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
};
