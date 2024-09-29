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
exports.individualUserBookingsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const auth_model_1 = require("../Auth/auth.model");
const booking_model_1 = require("../Booking/booking.model");
const getIndividualUserBookingsFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const user = yield auth_model_1.User.isUserExists(email);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist!");
    }
    const result = yield booking_model_1.Booking.find({ customer: user === null || user === void 0 ? void 0 : user._id }).populate([
        { path: 'service' },
        { path: 'slot' },
        { path: 'customer' },
    ]);
    if (result.length === 0) {
        return null;
    }
    return result;
});
exports.individualUserBookingsServices = {
    getIndividualUserBookingsFromDB,
};
