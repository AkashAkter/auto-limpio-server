import { IReview } from "./review.interface";
import Review from "./review.model";

export const getReviewService = async (limit?: number) => {
  const result = await Review.find()
    .populate("user")
    .sort({ createdAt: -1 })
    .limit(limit || 2);
  const totalDoc = await Review.countDocuments();

  return { totalDoc, result };
};
export const createReviewService = async (payload: IReview) => {
  const result = await Review.create(payload);
  return result;
};

const reviewService = {
  createReviewService,
  getReviewService,
};

export default reviewService;
