import { z } from "zod";

export const adminRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  code: z.string().min(4, "Admin secret code must be at least 4 characters"),
});

export const adminLoginSchema = z.object({
  code: z.string().min(1, "Admin code is required"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const jobOpeningSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be detailed"),
  location: z.string().min(2, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  department: z.string().min(2, "Department is required"),
  employmentType: z.enum(["Full-Time", "Part-Time", "Internship", "Contract", "Remote"]),
});

export const careerApplicationSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  mobile: z.string().min(8, "Valid mobile number is required"),
  currentLocation: z.string().min(2, "Current location is required"),
  currentJobTitle: z.string().min(2, "Current job title is required"),
  experience: z.string().min(1, "Years of experience is required"),
  relevantExperience: z.string().min(1, "Relevant experience is required"),
  noticePeriod: z.string().min(1, "Notice period is required"),
  portfolioLink: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  coverLetter: z.string().optional(),
});

export const gallerySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(5, "Description is required").max(1000, "Max 1000 characters"),
  date: z.string().optional(),
});
