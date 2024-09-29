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
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const auth_model_1 = require("./auth.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const BaseQueryBuilder_1 = __importDefault(require("../../queryBuilder/BaseQueryBuilder"));
const auth_constant_1 = require("./auth.constant");
const signUpUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield auth_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.email)) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Already signed up! Login instead.');
    }
    const jwtPayload = {
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        role: payload === null || payload === void 0 ? void 0 : payload.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const response = yield auth_model_1.User.create(payload);
    const combinedResult = { accessToken, response };
    return combinedResult;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Unregistered Email! Sign up instead.');
    }
    if (!(yield auth_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    }
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const combinedResult = { accessToken, user };
    return combinedResult;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new BaseQueryBuilder_1.default(auth_model_1.User.find(), query)
        .search(auth_constant_1.userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    if (result.length === 0) {
        return null;
    }
    return { meta, result };
});
const updateUserIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.AuthServices = {
    signUpUserIntoDB,
    loginUser,
    getAllUsersFromDB,
    updateUserIntoDB,
};
