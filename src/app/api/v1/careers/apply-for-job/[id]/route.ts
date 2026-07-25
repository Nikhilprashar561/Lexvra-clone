import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobOpening } from "@/lib/models/careers.job.model";
import { CareerApplication } from "@/lib/models/career.apply.model";
import { careerApplicationSchema } from "@/lib/validations";
import { uploadFileOrImage } from "@/lib/cloudinary";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const job = await JobOpening.findById(params.id);
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job opening not found" },
        { status: 404 }
      );
    }

    let payload: any = {};
    let resumeFile: File | string | null = null;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        mobile: formData.get("mobile"),
        currentLocation: formData.get("currentLocation"),
        currentJobTitle: formData.get("currentJobTitle"),
        experience: formData.get("experience"),
        relevantExperience: formData.get("relevantExperience"),
        noticePeriod: formData.get("noticePeriod"),
        portfolioLink: formData.get("portfolioLink") || undefined,
        coverLetter: formData.get("coverLetter") || undefined,
      };
      resumeFile = (formData.get("resume") as File) || (formData.get("file") as File);
    } else {
      const body = await req.json();
      payload = body;
      resumeFile = body.resume || body.file;
    }

    const validation = careerApplicationSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    if (!resumeFile) {
      return NextResponse.json(
        { success: false, message: "Resume file is required" },
        { status: 400 }
      );
    }

    const uploadedResume = await uploadFileOrImage(resumeFile, "resumes");
    if (!uploadedResume?.secure_url) {
      return NextResponse.json(
        { success: false, message: "Resume upload failed" },
        { status: 500 }
      );
    }

    const application = await CareerApplication.create({
      jobId: params.id,
      ...validation.data,
      resume: uploadedResume.secure_url,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
