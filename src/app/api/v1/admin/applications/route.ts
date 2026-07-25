import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CareerApplication } from "@/lib/models/career.apply.model";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    await connectDB();
    const applications = await CareerApplication.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, message: "Job applications fetched successfully", data: applications },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
