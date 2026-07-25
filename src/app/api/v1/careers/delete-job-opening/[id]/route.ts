import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobOpening } from "@/lib/models/careers.job.model";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    await connectDB();
    const deletedJob = await JobOpening.findByIdAndDelete(params.id);

    if (!deletedJob) {
      return NextResponse.json(
        { success: false, message: "Job opening not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Job opening deleted successfully",
        data: deletedJob,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
