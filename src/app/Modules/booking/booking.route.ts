import { Router } from "express";
import { createBookingIntoDB, getAllBookings } from "./booking.controller";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";

const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("user"),
  createBookingIntoDB
);
router.get("/", isAuthenticatedUser, authorizeRoles("admin"), getAllBookings);

const bookingRoutes = router;
export default bookingRoutes;
