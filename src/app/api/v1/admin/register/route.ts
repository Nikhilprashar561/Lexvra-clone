import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Admin } from "@/lib/models/admin.model";
import { adminRegisterSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const validation = adminRegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin already registered" },
        { status: 409 }
      );
    }

    const { name, email, code } = validation.data;

    const admin = await Admin.create({
      name,
      email,
      code,
      isVerified: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin registered successfully",
        data: { id: admin._id, name: admin.name, email: admin.email },
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
