"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controllers_1 = require("./auth.controllers");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(auth_validation_1.authValidations.signUpValidationSchema), auth_controllers_1.AuthControllers.signUpUsers);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controllers_1.AuthControllers.loginUser);
router.get('/users', auth_controllers_1.AuthControllers.getAllUsers);
router.patch('/users/:id', (0, validateRequest_1.default)(auth_validation_1.authValidations.updateUserStatusValidationSchema), auth_controllers_1.AuthControllers.updateUser);
exports.AuthRoutes = router;
