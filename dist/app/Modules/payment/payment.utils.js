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
exports.verifyPayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initiatePayment = (payload, slotId) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, cus_add, cus_name, cus_phone, cus_email, tran_id } = payload;
    const PT = jsonwebtoken_1.default.sign({ transactionId: tran_id, slotId, amount }, process.env.SIGNATURE_KEY, { expiresIn: "1m" });
    try {
        const response = yield axios_1.default.post(`${process.env.PAYMENT_URL}`, {
            store_id: process.env.STORE_ID,
            signature_key: process.env.SIGNATURE_KEY,
            cus_name,
            cus_email,
            cus_phone,
            cus_add1: cus_add,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_country: "Bangladesh",
            currency: "BDT",
            amount,
            tran_id,
            success_url: `https://auto-limpio-server.vercel.app/api/payment/success?pt=${PT}`,
            fail_url: `https://auto-limpio-server.vercel.app/api/payment/fail?pt=${PT}`,
            cancel_url: `https://auto-limpio-server.vercel.app/api/payment/fail?pt=${PT}`,
            desc: "Course Fee",
            type: "json",
        });
        return response.data;
    }
    catch (error) {
        throw new Error("Payment initiation failed!");
    }
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(process.env.PAYMENT_VERIFY_URL, {
            params: {
                store_id: process.env.STORE_ID,
                signature_key: process.env.SIGNATURE_KEY,
                type: "json",
                request_id: tnxId,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error("Payment validation failed!");
    }
});
exports.verifyPayment = verifyPayment;
