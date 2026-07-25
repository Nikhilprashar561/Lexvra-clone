import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/lib/models/gallery.model";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { gallerySchema } from "@/lib/validations";
import { uploadFileOrImage } from "@/lib/cloudinary";

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

    let name = "";
    let description = "";
    let dateInput = "";
    let fileOrUrl: File | string | null = null;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = (formData.get("name") as string) || "";
      description = (formData.get("description") as string) || "";
      dateInput = (formData.get("date") as string) || "";
      fileOrUrl = (formData.get("image") as File) || (formData.get("file") as File);
    } else {
      const body = await req.json();
      name = body.name || "";
      description = body.description || "";
      dateInput = body.date || "";
      fileOrUrl = body.image || body.file || null;
    }

    const validation = gallerySchema.safeParse({ name, description, date: dateInput });
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    if (!fileOrUrl) {
      return NextResponse.json(
        { success: false, message: "Image file or URL is required" },
        { status: 400 }
      );
    }

    const uploadResult = await uploadFileOrImage(fileOrUrl, "gallery");
    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        { success: false, message: "Image upload failed" },
        { status: 500 }
      );
    }

    const galleryItem = await Gallery.create({
      name: validation.data.name,
      image: uploadResult.secure_url,
      description: validation.data.description,
      date: validation.data.date ? new Date(validation.data.date) : new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Gallery item created successfully",
        data: galleryItem,
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
