import type { NextFunction, Request, Response } from "express";

import { Gallery } from "./gallery.model.js";
import { ApiError } from "../../common/utils/ApiErrors.js";
import { ApiResponse } from "../../common/utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../common/utils/cloudinary.js";

class GalleryController {
  public createGallery = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, description, date } = req.body;

      if (!req.file?.path) {
        throw ApiError.badRequest("Image file is required");
      }

      if (!name || !description) {
        throw ApiError.badRequest("Name and description are required");
      }

      const uploadedImage = await uploadOnCloudinary(req.file.path);

      if (!uploadedImage?.secure_url) {
        throw ApiError.internal("Image upload failed");
      }

      const galleryItem = await Gallery.create({
        name,
        image: uploadedImage.secure_url,
        description,
        date: date ? new Date(date) : new Date(),
      });

      ApiResponse.created(res, "Gallery item created successfully", galleryItem);
    } catch (error) {
      next(error);
    }
  };

  public getGallery = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const galleryItems = await Gallery.find().sort({ createdAt: -1 });

      ApiResponse.ok(res, "Gallery fetched successfully", galleryItems);
    } catch (error) {
      next(error);
    }
  };
}

export { GalleryController };
