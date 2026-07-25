import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobOpening } from "@/lib/models/careers.job.model";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { jobOpeningSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    const validation = jobOpeningSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const job = await JobOpening.create(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: "Job opening created successfully",
        data: job,
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
