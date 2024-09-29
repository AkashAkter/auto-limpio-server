"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const reviews_validation_1 = require("./reviews.validation");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(reviews_validation_1.ReviewsValidations.createReviewValidationSchema), reviews_controller_1.ReviewControllers.createReviews);
router.get('/', reviews_controller_1.ReviewControllers.getAllReviews);
exports.ReviewRoutes = router;
