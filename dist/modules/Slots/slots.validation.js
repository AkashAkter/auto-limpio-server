"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotAppointmentValidation = void 0;
const zod_1 = require("zod");
const createSlotAppointmentValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        service: zod_1.z.string({
            required_error: 'Service name is required',
        }),
        date: zod_1.z
            .string({
            required_error: 'Appointment date is required',
        })
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
            .refine((str) => {
            const date = new Date(str);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Clear time part for today's date
            return date >= today;
        }, {
            message: 'Appointment date cannot be in the past',
        }),
        startTime: zod_1.z
            .string({
            required_error: 'Start time is required',
        })
            .regex(/^[0-1][0-9]|2[0-3]:[0-5][0-9]$/, 'Start time must be in HH:MM format'),
        endTime: zod_1.z
            .string({
            required_error: 'End time is required',
        })
            .regex(/^[0-1][0-9]|2[0-3]:[0-5][0-9]$/, 'End time must be in HH:MM format'),
    })
        .refine(
    // receives the entire object 'data' as its argument.
    (data) => {
        const [startHour, startMinute] = data.startTime.split(':').map(Number);
        const [endHour, endMinute] = data.endTime.split(':').map(Number);
        const startTime = new Date();
        startTime.setHours(startHour, startMinute, 0, 0);
        const endTime = new Date();
        endTime.setHours(endHour, endMinute, 0, 0);
        return startTime < endTime;
    }, {
        message: 'Start time must be before end time',
        path: ['endTime'], // Specify the field to which the error message should be attached
    }),
});
const updateSlotAppointmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        isBooked: zod_1.z.enum(['available', 'cancelled', 'expired'], {
            required_error: 'isBooked status is required',
            invalid_type_error: "Status must be either 'available', 'cancelled' or 'expired'",
        }),
    }),
});
exports.slotAppointmentValidation = {
    createSlotAppointmentValidationSchema,
    updateSlotAppointmentValidationSchema,
};
