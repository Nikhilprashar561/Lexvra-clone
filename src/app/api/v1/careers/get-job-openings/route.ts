import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobOpening } from "@/lib/models/careers.job.model";

export async function GET() {
  try {
    await connectDB();
    const jobs = await JobOpening.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, message: "Job openings fetched successfully", data: jobs },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
