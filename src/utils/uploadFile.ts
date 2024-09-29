import fs from "fs";
import multer from "multer";
import cloudinary from "../app/config/cloud";

// Get Cloudinary folder name from environment variables
const cloudinaryFolder = process.env.CN_Folder || "default-folder";

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
        folder: cloudinaryFolder, // Set the folder here
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // delete a file asynchronously after upload
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File is deleted.");
          }
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (file) {
      cb(null, file.fieldname + "-" + uniqueSuffix);
    }
  },
});

export const upload = multer({ storage: storage });
