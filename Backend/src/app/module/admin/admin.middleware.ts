import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import { Admin } from "./admin.model.js";
import { ApiError } from "../../common/utils/ApiErrors.js";

export const verifyAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw ApiError.unauthorized("Admin token is required");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET ?? "admin-secret-key",
    ) as JwtPayload & { id?: string };

    const adminId = decodedToken.id;

    if (!adminId) {
      throw ApiError.unauthorized("Invalid admin token");
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      throw ApiError.forbidden("Admin not found");
    }

    (req as Request & { admin?: typeof admin }).admin = admin;

    next();
  } catch (error) {
    next(error);
  }
};
