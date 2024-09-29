import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import { createSlotsIntoDB, getAllSlots } from "./slot.controller";

const router = Router();
router.post(
  "/slots",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createSlotsIntoDB
);

router.get(
  "/get/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllSlots
);
const slotRoutes = router;
export default slotRoutes;
