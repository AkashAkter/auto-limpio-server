"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const SlotQueryBuilder_1 = __importDefault(require("../../queryBuilder/SlotQueryBuilder"));
const slots_model_1 = require("./slots.model");
const getAvailableSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const slotAppointmentQuery = new SlotQueryBuilder_1.default(slots_model_1.SlotAppointment.find(), query);
    // Apply the filtering logic
    slotAppointmentQuery.filter();
    slotAppointmentQuery.sort();
    slotAppointmentQuery.paginate();
    slotAppointmentQuery.populate('service');
    const meta = yield slotAppointmentQuery.countTotal();
    const result = yield slotAppointmentQuery.modelQuery.exec();
    if (result.length === 0) {
        return null;
    }
    return { meta, result };
});
const updateServiceIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slots_model_1.SlotAppointment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.SlotServices = {
    getAvailableSlotsFromDB,
    updateServiceIntoDB,
};
