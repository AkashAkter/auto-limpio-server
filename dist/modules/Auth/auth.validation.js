"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required.' })
            .email('Email must be a valid email address')
            .trim(),
        password: zod_1.z.string({ required_error: 'Password is required' }).trim(),
    }),
});
const signUpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
            .trim(),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        })
            .email('Email must be a valid email address')
            .trim(),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        })
            .trim(),
        phone: zod_1.z
            .string({
            required_error: 'Phone number is required',
            invalid_type_error: 'Phone number must be a string',
        })
            .trim(),
        role: zod_1.z.enum(['user', 'admin'], {
            required_error: 'Role is required',
            invalid_type_error: "Role must be either 'user' or 'admin'",
        }),
        address: zod_1.z
            .string({
            required_error: 'Address is required',
            invalid_type_error: 'Address must be a string',
        })
            .trim(),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
    }),
});
const updateUserStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z
            .enum(['admin', 'user'], {
            required_error: 'Role is required',
            invalid_type_error: "Role must be either 'admin' or 'user'",
        })
            .optional(),
        name: zod_1.z
            .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
            .trim()
            .optional(),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        })
            .email('Email must be a valid email address')
            .trim()
            .optional(),
        phone: zod_1.z
            .string({
            required_error: 'Phone number is required',
            invalid_type_error: 'Phone number must be a string',
        })
            .trim()
            .optional(),
        address: zod_1.z
            .string({
            required_error: 'Address is required',
            invalid_type_error: 'Address must be a string',
        })
            .trim()
            .optional(),
        image: zod_1.z
            .string({
            required_error: 'Image is required',
        })
            .optional(),
    }),
});
exports.authValidations = {
    signUpValidationSchema,
    loginValidationSchema,
    updateUserStatusValidationSchema,
};
