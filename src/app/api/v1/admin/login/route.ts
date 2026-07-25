import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Admin } from "@/lib/models/admin.model";
import { adminLoginSchema } from "@/lib/validations";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const validation = adminLoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { code } = validation.data;

    const admin = await Admin.findOne({ code });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid admin code" },
        { status: 401 }
      );
    }

    const token = signAdminToken({ id: admin._id.toString(), email: admin.email });

    const response = NextResponse.json(
      {
        success: true,
        message: "Admin verified successfully",
        data: { name: admin.name, email: admin.email },
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
