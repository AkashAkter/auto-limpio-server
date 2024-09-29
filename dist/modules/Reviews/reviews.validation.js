"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'User name is required',
            invalid_type_error: 'User name must be a string',
        })
            .trim(),
        feedback: zod_1.z
            .string({
            required_error: 'User Feedback is required',
            invalid_type_error: 'User Feedback must be a string',
        })
            .trim(),
        rating: zod_1.z.number().min(1, 'Rating cannot be 0').max(5),
        image: zod_1.z.string({
            required_error: 'User Avatar is required',
        }),
    }),
});
exports.ReviewsValidations = {
    createReviewValidationSchema,
};
