import { Router } from "express";
import { isAuthenticatedUser } from "../../middlewares/auth";
import { createReview, getReviews } from "./review.controller";
const router = Router();
router.get("/get", getReviews);
router.post("/create", isAuthenticatedUser, createReview);
const reviewRoutes = router;
export default reviewRoutes;
