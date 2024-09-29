import { Router } from "express";
import {
  getAllAvailableSlots,
  getSlotById,
  toggleSlotStatus,
} from "./slot.controller";

const router = Router();
router.get("/availability", getAllAvailableSlots);
router.get("/availability/:id", getSlotById);
router.put("/toggle-status/:id", toggleSlotStatus);
const slotRoutes2 = router;
export default slotRoutes2;
