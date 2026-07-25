import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/lib/models/gallery.model";
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
    const deletedItem = await Gallery.findByIdAndDelete(params.id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Gallery item deleted successfully", data: deletedItem },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
