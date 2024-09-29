import { JwtPayload } from "jsonwebtoken";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import reviewService from "./review.service";

export const createReview = catchAsyncError(async (req, res) => {
  const { body } = req;
  const auth = req.user as JwtPayload;

  const result = await reviewService.createReviewService({
    ...body,
    user: auth._id,
  });
  sendResponse(res, {
    data: result,
    success: true,
    message: "review created successfully",
  });
});
export const getReviews = catchAsyncError(async (req, res) => {
  const limit = req.query.limit || 2;
  const { result, totalDoc } = await reviewService.getReviewService(
    Number(limit)
  );
  res.json({
    data: result,
    totalDoc,
    success: true,
    message: "successfully get reviews",
  });
});
