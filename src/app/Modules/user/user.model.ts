import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Authentication",
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
