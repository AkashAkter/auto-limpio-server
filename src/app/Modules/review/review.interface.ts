import mongoose from "mongoose";

export interface IReview {
  user: mongoose.Schema.Types.ObjectId;
  comment: string;
  rating: number;
}
