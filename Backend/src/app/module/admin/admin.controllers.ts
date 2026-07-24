import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Admin } from "./admin.model.js";
import { Contact } from "../contacts/contact.model.js";
import { CareerApplication } from "../careers/career.apply.model.js";
import { ApiError } from "../../common/utils/ApiErrors.js";
import { ApiResponse } from "../../common/utils/ApiResponse.js";

class AdminController {
  public registerAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const existingAdmin = await Admin.findOne({});

      if (existingAdmin) {
        throw ApiError.conflict("Admin already registered");
      }

      const { name, email, code } = req.body;

      if (!name || !email || !code) {
        throw ApiError.badRequest("Name, email and code are required");
      }

      const admin = await Admin.create({
        name,
        email,
        code,
        isVerified: true,
      });

      ApiResponse.created(res, "Admin registered successfully", admin);
    } catch (error) {
      next(error);
    }
  };

  public loginAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { code } = req.body;

      if (!code) {
        throw ApiError.badRequest("Admin code is required");
      }

      const admin = await Admin.findOne({ code });

      if (!admin) {
        throw ApiError.unauthorized("Invalid admin code");
      }

      const token = jwt.sign(
        {
          id: admin._id,
          email: admin.email,
        },
        process.env.ADMIN_JWT_SECRET ?? "admin-secret-key",
        {
          expiresIn: "1d",
        },
      );

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      ApiResponse.ok(res, "Admin verified successfully", {
        name: admin.name,
        email: admin.email,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllContacts = async (
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

  public getAllApplications = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const applications = await CareerApplication.find().sort({ createdAt: -1 });

      ApiResponse.ok(res, "Job applications fetched successfully", applications);
    } catch (error) {
      next(error);
    }
  };
}

export { AdminController };
