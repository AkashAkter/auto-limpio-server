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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const mongoose_1 = require("mongoose");
const carServiceSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    short_description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    image: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
carServiceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
carServiceSchema.statics.isServiceExists = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.CarService.findOne({ name });
    });
};
exports.CarService = (0, mongoose_1.model)('CarService', carServiceSchema);
