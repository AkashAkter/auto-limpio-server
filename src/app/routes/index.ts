import express from "express";
import bookingRoutes from "../Modules/booking/booking.route";
import serviceRoutes from "../Modules/service/service.route";
import slotRoutes from "../Modules/slot/slot.route";
import authRoute from "../Modules/auth/auth.route";
import paymentRoute from "../Modules/payment/payment.route";
import slotRoutes2 from "../Modules/slot/slot.route2";
import reviewRoutes from "../Modules/review/review.route";
import userRoute from "../Modules/user/user.route";
import bookingRoutes2 from "../Modules/booking/booking.route2";

const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "/services",
    route: slotRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes2,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
  {
    path: "/review",
    route: reviewRoutes,
  },
  {
    path: "/",
    route: bookingRoutes2,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
