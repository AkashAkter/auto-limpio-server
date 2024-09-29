"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServiceValidations = void 0;
const zod_1 = require("zod");
const createCarServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Car service name is required',
            invalid_type_error: 'Service name must be a string',
        })
            .trim(),
        description: zod_1.z
            .string({
            required_error: 'Car service description is required',
            invalid_type_error: 'Service description must be a string',
        })
            .trim(),
        short_description: zod_1.z
            .string({
            required_error: 'Car service short description is required',
            invalid_type_error: 'Service short description must be a string',
        })
            .trim(),
        price: zod_1.z.number().min(0, 'Price cannot be negative'),
        duration: zod_1.z
            .number()
            .int()
            .max(120, 'Time duration must be less than 120')
            .positive('Duration must be a positive integer (minutes)'),
        isDeleted: zod_1.z.boolean().optional(),
        image: zod_1.z.string({
            required_error: 'Car service photo is required',
        }),
    }),
});
const updateCarServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Car service name is required',
            invalid_type_error: 'Service name must be a string',
        })
            .trim()
            .optional(),
        description: zod_1.z
            .string({
            required_error: 'Car service description is required',
            invalid_type_error: 'Service description must be a string',
        })
            .trim()
            .optional(),
        short_description: zod_1.z
            .string({
            required_error: 'Car service short description is required',
            invalid_type_error: 'Service short description must be a string',
        })
            .trim()
            .optional(),
        price: zod_1.z.number().min(0, 'Price cannot be negative').optional(),
        duration: zod_1.z
            .number()
            .int()
            .positive('Duration must be a positive integer (minutes)')
            .max(120, 'Time duration must be less than 120')
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
        image: zod_1.z
            .string({
            required_error: 'Car service photo is required',
        })
            .optional(),
    }),
});
exports.carServiceValidations = {
    createCarServiceValidationSchema,
    updateCarServiceValidationSchema,
};
