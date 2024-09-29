import { Router } from "express";
import {
  getAllUser,
  updateUserInfo,
  updateUserProfileImage,
} from "./user.controller";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import { upload } from "../../../utils/uploadFile";

const router = Router();
router.get("/all", isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router.put("/update", isAuthenticatedUser, updateUserInfo);
router.put(
  "/update-profile-image",
  isAuthenticatedUser,
  upload.single("file"),
  updateUserProfileImage
);
const userRoute = router;
export default userRoute;
