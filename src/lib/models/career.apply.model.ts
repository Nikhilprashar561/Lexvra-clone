import mongoose, { Schema, model, Document, Model } from "mongoose";

export interface ICareerApplication extends Document {
  jobId?: string;
  name: string;
  email: string;
  mobile: string;
  currentLocation: string;
  currentJobTitle: string;
  experience: string;
  relevantExperience: string;
  noticePeriod: string;
  resume: string;
  portfolioLink?: string;
  coverLetter?: string;
  createdAt: Date;
  updatedAt: Date;
}

const careerApplicationSchema = new Schema<ICareerApplication>(
  {
    jobId: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    currentLocation: {
      type: String,
      required: true,
      trim: true,
    },
    currentJobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    relevantExperience: {
      type: String,
      required: true,
      trim: true,
    },
    noticePeriod: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: String,
      required: true,
    },
    portfolioLink: {
      type: String,
      trim: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CareerApplication: Model<ICareerApplication> = mongoose.models.CareerApplication || model<ICareerApplication>("CareerApplication", careerApplicationSchema);
