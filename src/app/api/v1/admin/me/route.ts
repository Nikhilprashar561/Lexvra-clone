import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { Admin } from "@/lib/models/admin.model";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const admin = await getAuthenticatedAdmin();
    const isRegistered = (await Admin.countDocuments({})) > 0;

    if (!admin) {
      return NextResponse.json(
        { success: false, authenticated: false, isRegistered },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        authenticated: true,
        isRegistered: true,
        data: { name: admin.name, email: admin.email },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
