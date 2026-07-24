import type { NextFunction, Request, Response } from "express";

import { JobOpening } from "./careers.job.model.js";
import { CareerApplication } from "./career.apply.model.js";
import { ApiError } from "../../common/utils/ApiErrors.js";
import { ApiResponse } from "../../common/utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../common/utils/cloudinary.js";

class CareersController {
  public newJobOpening = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { title, description, location, experience, department, employmentType } = req.body;

      if (!title || !description || !location || !experience || !department || !employmentType) {
        throw ApiError.badRequest("All job opening fields are required");
      }

      const job = await JobOpening.create({
        title,
        description,
        location,
        experience,
        department,
        employmentType,
      });

      ApiResponse.created(res, "Job opening created successfully", job);
    } catch (error) {
      next(error);
    }
  };

  public getJobOpenings = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const jobs = await JobOpening.find().sort({ createdAt: -1 });

      ApiResponse.ok(res, "Job openings fetched successfully", jobs);
    } catch (error) {
      next(error);
    }
  };

  public updateJobOpening = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const updatedJob = await JobOpening.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedJob) {
        throw ApiError.notFound("Job opening not found");
      }

      ApiResponse.ok(res, "Job opening updated successfully", updatedJob);
    } catch (error) {
      next(error);
    }
  };

  public deleteJobOpening = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const deletedJob = await JobOpening.findByIdAndDelete(id);

      if (!deletedJob) {
        throw ApiError.notFound("Job opening not found");
      }

      ApiResponse.ok(res, "Job opening deleted successfully", deletedJob);
    } catch (error) {
      next(error);
    }
  };

  public applyForJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const job = await JobOpening.findById(id);

      if (!job) {
        throw ApiError.notFound("Job opening not found");
      }

      if (!req.file?.path) {
        throw ApiError.badRequest("Resume file is required");
      }

      const uploadedResume = await uploadOnCloudinary(req.file.path);

      if (!uploadedResume?.secure_url) {
        throw ApiError.internal("Resume upload failed");
      }

      const { name, email, mobile, currentLocation, currentJobTitle, experience, relevantExperience, noticePeriod, portfolioLink, coverLetter } = req.body;

      if (!name || !email || !mobile || !currentLocation || !currentJobTitle || !experience || !relevantExperience || !noticePeriod) {
        throw ApiError.badRequest("All applicant fields are required");
      }

      const application = await CareerApplication.create({
        name,
        email,
        mobile,
        currentLocation,
        currentJobTitle,
        experience,
        relevantExperience,
        noticePeriod,
        resume: uploadedResume.secure_url,
        portfolioLink,
        coverLetter,
      });

      ApiResponse.created(res, "Application submitted successfully", application);
    } catch (error) {
      next(error);
    }
  };
}

export { CareersController };
