import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import { getUserBookings } from "./booking.controller";
const router = Router();
router.get(
  "/my-bookings",
  isAuthenticatedUser,
  authorizeRoles("user"),
  getUserBookings
);
const bookingRoutes2 = router;
export default bookingRoutes2;
