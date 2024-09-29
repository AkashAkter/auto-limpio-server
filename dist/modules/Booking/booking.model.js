"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CarService',
        required: true,
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Slot', // database name
        required: true,
    },
    transactionId: {
        type: String,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    totalBookingCost: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
