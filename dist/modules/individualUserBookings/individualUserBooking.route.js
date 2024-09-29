"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndividualBookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_constant_1 = require("../Auth/auth.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const individualUserBooking_controllers_1 = require("./individualUserBooking.controllers");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(auth_constant_1.USER_ROLE.user), individualUserBooking_controllers_1.individualUserBookingsControllers.getIndividualUserBookings);
exports.IndividualBookingRoutes = router;
