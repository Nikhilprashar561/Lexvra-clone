// Cloudinary & File Upload Handler
// Handles Cloudinary uploads if configured, or provides safe data URL / local storage fallback

export async function uploadFileOrImage(file: File | string, folder: string = "agency"): Promise<{ secure_url: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_CLOUD_API_KEY;
  const apiSecret = process.env.CLOUDINARY_CLOUD_API_SECRET;

  if (typeof file === "string" && file.startsWith("http")) {
    return { secure_url: file };
  }

  if (cloudName && apiKey && apiSecret) {
    try {
      const formData = new FormData();
      if (typeof file === "string") {
        formData.append("file", file);
      } else {
        formData.append("file", file);
      }
      formData.append("upload_preset", "unsigned_preset");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.secure_url) {
          return { secure_url: data.secure_url };
        }
      }
    } catch (err) {
      console.warn("Cloudinary direct upload failed, falling back to Data URL:", err);
    }
  }

  // Safe fallback if Cloudinary is not configured or fails: convert File to base64 Data URL
  if (typeof file === "string") {
    return { secure_url: file };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const mimeType = file.type || "application/octet-stream";
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${mimeType};base64,${base64}`;

  return { secure_url: dataUrl };
}
