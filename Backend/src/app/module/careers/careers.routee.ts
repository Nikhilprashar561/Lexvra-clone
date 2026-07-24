import { Router } from "express";

import { CareersController } from "./careers.controllers.js";
import { upload } from "../../common/middlewares/multer.js";
import { verifyAdmin } from "../admin/admin.middleware.js";

const router = Router();
const careersController = new CareersController();

router
  .route("/new-job-opening")
  .post(verifyAdmin, careersController.newJobOpening.bind(careersController));

router
  .route("/get-job-openings")
  .get(careersController.getJobOpenings.bind(careersController));

router
  .route("/update-job-opening/:id")
  .put(verifyAdmin, careersController.updateJobOpening.bind(careersController));

router
  .route("/delete-job-opening/:id")
  .delete(verifyAdmin, careersController.deleteJobOpening.bind(careersController));

router
  .route("/apply-for-job/:id")
  .post(upload.single("resume"), careersController.applyForJob.bind(careersController));

export { router as careersRouter };
