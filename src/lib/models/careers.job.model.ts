import mongoose, { Schema, model, Document, Model } from "mongoose";

export interface IJobOpening extends Document {
  title: string;
  description: string;
  location: string;
  experience: string;
  department: string;
  employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract" | "Remote";
  createdAt: Date;
  updatedAt: Date;
}

const jobOpeningSchema = new Schema<IJobOpening>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract", "Remote"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const JobOpening: Model<IJobOpening> = mongoose.models.JobOpening || model<IJobOpening>("JobOpening", jobOpeningSchema);
