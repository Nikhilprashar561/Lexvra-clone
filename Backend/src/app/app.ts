import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { contactRouter } from "./module/contacts/contact.routee.js";
import { galleryRouter } from "./module/gallery/gallery.routee.js";
import { careersRouter } from "./module/careers/careers.routee.js";
import { adminRouter } from "./module/admin/admin.routee.js";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";

export function createExpress() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      allowedHeaders: [
        "Content-type",
        "Authorization",
        "Pragma",
        "Cache-control",
        "Expires",
      ],
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get("/health", (_req: Request, res: Response) => {
    return res.status(200).json({ message: "Ok up and running" });
  });

  app.use("/api/v1/contact", contactRouter);
  app.use("/api/v1/gallery", galleryRouter);
  app.use("/api/v1/careers", careersRouter);
  app.use("/api/v1/admin", adminRouter);

  app.use(errorMiddleware);

  return app;
}
