import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/lib/models/gallery.model";

export async function GET() {
  try {
    await connectDB();
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, message: "Gallery fetched successfully", data: galleryItems },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
