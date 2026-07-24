import { Router } from "express";

import { AdminController } from "./admin.controllers.js";
import { verifyAdmin } from "./admin.middleware.js";

const router = Router();
const adminController = new AdminController();

router
  .route("/register")
  .post(adminController.registerAdmin);

router
  .route("/login")
  .post(adminController.loginAdmin);

router
  .route("/contacts")
  .get(verifyAdmin, adminController.getAllContacts);

router
  .route("/applications")
  .get(verifyAdmin, adminController.getAllApplications);

export { router as adminRouter };
