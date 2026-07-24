import { Router } from "express";

import { GalleryController } from "./gallery.controllers.js";
import { upload } from "../../common/middlewares/multer.js";
import { verifyAdmin } from "../admin/admin.middleware.js";

const router = Router();
const galleryControllers = new GalleryController();

router
  .route("/create-gallery")
  .post(verifyAdmin, upload.single("image"), galleryControllers.createGallery.bind(galleryControllers));

router
  .route("/get-gallery")
  .get(galleryControllers.getGallery.bind(galleryControllers));

export { router as galleryRouter };

