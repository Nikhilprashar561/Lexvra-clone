import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY ?? "",
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET ?? "",
});

export const uploadOnCloudinary = async (
  imagePath: string,
): Promise<UploadApiResponse | null> => {
  try {
    if (!imagePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return response;
  } catch (error) {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    console.error("Cloudinary Upload Error:", error);

    return null;
  }
};
