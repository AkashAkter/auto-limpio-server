"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controllers_1 = require("./booking.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const auth_constant_1 = require("../Auth/auth.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(auth_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.bookingValidations.createBookingValidationSchema), booking_controllers_1.BookingControllers.createBooking);
router.get('/', (0, auth_1.default)(auth_constant_1.USER_ROLE.admin), booking_controllers_1.BookingControllers.getAllBookings);
exports.BookingRoutes = router;
