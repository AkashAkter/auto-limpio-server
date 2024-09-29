import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

cloudinary.config({
  cloud_name: process.env.CN_Cloud_name,
  api_key: process.env.CN_Api_key,
  api_secret: process.env.CN_Api_secret,
});
export default cloudinary;
