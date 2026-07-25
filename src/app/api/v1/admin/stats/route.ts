import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contact } from "@/lib/models/contact.model";
import { CareerApplication } from "@/lib/models/career.apply.model";
import { JobOpening } from "@/lib/models/careers.job.model";
import { Gallery } from "@/lib/models/gallery.model";
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

    const [totalContacts, totalApplications, totalJobs, totalGallery] = await Promise.all([
      Contact.countDocuments(),
      CareerApplication.countDocuments(),
      JobOpening.countDocuments(),
      Gallery.countDocuments(),
    ]);

    // Monthly activity aggregates for charts
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    const recentApplications = await CareerApplication.find().sort({ createdAt: -1 }).limit(10);
    const jobsList = await JobOpening.find();

    // Group jobs by department
    const departmentStatsMap: Record<string, number> = {};
    jobsList.forEach((j) => {
      departmentStatsMap[j.department] = (departmentStatsMap[j.department] || 0) + 1;
    });

    const departmentChartData = Object.entries(departmentStatsMap).map(([name, count]) => ({
      name,
      value: count,
    }));

    return NextResponse.json(
      {
        success: true,
        data: {
          metrics: {
            totalContacts,
            totalApplications,
            totalJobs,
            totalGallery,
          },
          recentContacts,
          recentApplications,
          departmentChartData,
        },
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
