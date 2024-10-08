"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const review_controller_1 = require("./review.controller");
const router = (0, express_1.Router)();
router.get("/get", review_controller_1.getReviews);
router.post("/create", auth_1.isAuthenticatedUser, review_controller_1.createReview);
const reviewRoutes = router;
exports.default = reviewRoutes;
