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
exports.ServicesOfCarService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const carService_model_1 = require("./carService.model");
const carService_utils_1 = require("./carService.utils");
const slots_model_1 = require("../Slots/slots.model");
const ServiceQueryBuilder_1 = __importDefault(require("../../queryBuilder/ServiceQueryBuilder"));
const carService_constant_1 = require("./carService.constant");
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield carService_model_1.CarService.isServiceExists(payload === null || payload === void 0 ? void 0 : payload.name)) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Service already exists!');
    }
    const result = yield carService_model_1.CarService.create(payload);
    return result;
});
const getAllServicesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const carServiceQuery = new ServiceQueryBuilder_1.default(carService_model_1.CarService.find(), query)
        .search(carService_constant_1.carServiceSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield carServiceQuery.countTotal();
    const result = yield carServiceQuery.modelQuery;
    if (result.length === 0) {
        return null;
    }
    return { meta, result };
});
const getSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleService = yield carService_model_1.CarService.findById(id);
    if (singleService === null || singleService === void 0 ? void 0 : singleService.isDeleted) {
        return null;
    }
    else {
        return singleService;
    }
});
const updateServiceIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_model_1.CarService.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carService_model_1.CarService.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
    });
    return result;
});
const createSlotAppointmentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield carService_model_1.CarService.findById(payload.service);
    if (!service) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Car Service doesn't exist!");
    }
    if (service === null || service === void 0 ? void 0 : service.isDeleted) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Car Service doesn't exist!");
    }
    const startDate = new Date(`${payload.date} ${payload.startTime}`);
    const endDate = new Date(`${payload.date} ${payload.endTime}`);
    // Get the difference in milliseconds
    const timeDifference = endDate.getTime() - startDate.getTime();
    // Convert the difference to minutes and round down to the nearest whole minute
    const totalSlotDuration = Math.floor(timeDifference / (1000 * 60));
    if (totalSlotDuration < (service === null || service === void 0 ? void 0 : service.duration)) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Slot duration is insufficient!');
    }
    const appointedSlotsArray = (0, carService_utils_1.createIntervalsArray)(payload, service);
    const result = yield slots_model_1.SlotAppointment.create(appointedSlotsArray);
    return result;
});
exports.ServicesOfCarService = {
    createServiceIntoDB,
    getAllServicesFromDB,
    getSingleServiceFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB,
    createSlotAppointmentIntoDB,
};
