"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const slots_controllers_1 = require("./slots.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const slots_validation_1 = require("./slots.validation");
const router = express_1.default.Router();
router.get('/availability', slots_controllers_1.SlotControllers.getAvailableSlots);
router.patch('/:id', (0, validateRequest_1.default)(slots_validation_1.slotAppointmentValidation.updateSlotAppointmentValidationSchema), slots_controllers_1.SlotControllers.updateSlot);
exports.SlotRoutes = router;
