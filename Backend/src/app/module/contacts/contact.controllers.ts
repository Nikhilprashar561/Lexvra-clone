import type { NextFunction, Request, Response } from "express";

import { Contact } from "./contact.model.js";
import { ApiError } from "../../common/utils/ApiErrors.js";
import { ApiResponse } from "../../common/utils/ApiResponse.js";

class ContactController {
  public createContact = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !phone || !subject || !message) {
        throw ApiError.badRequest("All contact fields are required");
      }

      const contact = await Contact.create({
        name,
        email,
        phone,
        subject,
        message,
      });

      ApiResponse.created(res, "Contact saved successfully", contact);
    } catch (error) {
      next(error);
    }
  };

  public getContact = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });

      ApiResponse.ok(res, "Contacts fetched successfully", contacts);
    } catch (error) {
      next(error);
    }
  };
}

export { ContactController };
