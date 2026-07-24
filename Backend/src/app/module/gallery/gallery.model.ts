import { Schema, model, Document } from "mongoose";

export interface IGallery extends Document {
  name: string;
  image: string;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<IGallery>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Gallery = model<IGallery>("Gallery", gallerySchema);
