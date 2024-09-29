"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'Service Id is required',
        }),
        slotId: zod_1.z.string({
            required_error: 'Slot Id is required',
        }),
        transactionId: zod_1.z.string({
            required_error: 'transactionId is required',
        }),
        paymentStatus: zod_1.z
            .string({
            required_error: 'Payment Status is required',
            invalid_type_error: 'Payment Status must be a string',
        })
            .trim(),
        totalBookingCost: zod_1.z.number().nonnegative().min(1),
    }),
});
exports.bookingValidations = {
    createBookingValidationSchema,
};
