import { Router } from "express";

import { ContactController } from "./contact.controllers.js";

const router = Router();
const contactControllers = new ContactController();

router
  .route("/create-contact")
  .post(contactControllers.createContact.bind(contactControllers));

export { router as contactRouter };
