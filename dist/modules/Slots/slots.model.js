"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotAppointment = void 0;
const mongoose_1 = require("mongoose");
const slots_constants_1 = require("./slots.constants");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'CarService',
    },
    date: {
        type: String,
        required: [true, 'Slot appointment date is required'],
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [
            /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
            'Start time must be in HH:MM format',
        ],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [
            /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
            'End time must be in HH:MM format',
        ],
    },
    isBooked: {
        type: String,
        enum: slots_constants_1.slotAppointmentStatus,
        default: 'available',
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.SlotAppointment = (0, mongoose_1.model)('Slot', slotSchema);
