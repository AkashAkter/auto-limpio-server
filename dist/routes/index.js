"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const carService_route_1 = require("../modules/CarServices/carService.route");
const slots_route_1 = require("../modules/Slots/slots.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const individualUserBooking_route_1 = require("../modules/individualUserBookings/individualUserBooking.route");
const reviews_route_1 = require("../modules/Reviews/reviews.route");
const payment_route_1 = require("../modules/Payments/payment.route");
const router = (0, express_1.Router)();
const moduleRouter = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/services',
        route: carService_route_1.CarServiceRoutes,
    },
    {
        path: '/slots',
        route: slots_route_1.SlotRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/my-bookings',
        route: individualUserBooking_route_1.IndividualBookingRoutes,
    },
    {
        path: '/reviews',
        route: reviews_route_1.ReviewRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
