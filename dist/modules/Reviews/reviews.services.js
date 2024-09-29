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
exports.ReviewsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const reviews_model_1 = require("./reviews.model");
const createReviewIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield reviews_model_1.Review.isReviewsExists(payload === null || payload === void 0 ? void 0 : payload.email)) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Review already exists!');
    }
    const result = yield reviews_model_1.Review.create(payload);
    return result;
});
const getAllReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_model_1.Review.find().sort('-createdAt');
    if (result.length === 0) {
        return null;
    }
    const totalRatingCount = result.length;
    const sumOfRating = result.reduce((total, item) => total + item.rating, 0);
    const avgRating = Number((sumOfRating / totalRatingCount).toFixed(2));
    return { result, avgRating };
});
exports.ReviewsServices = {
    createReviewIntoDB,
    getAllReviewsFromDB,
};
