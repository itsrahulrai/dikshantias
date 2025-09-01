import { NextResponse } from "next/server";
import type { RouteContext } from "next";
import { connectToDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import WebSettings from "@/models/WebSettingsModel";

// UPDATE slider
export async function PUT(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    await connectToDB();

    const { id } = context.params; // ✅ get ID from context
    const formData = await request.formData(); // ✅ use request, not req
    const data: Record<string> = {};

    // Append all fields from formData
    const fields = [
      "name",
      "phone",
      "whatsapp",
      "email",
      "address",
      "googleMap",
      "facebook",
      "instagram",
      "youtube",
      "linkedin",
      "twitter",
      "telegram",
    ];

    fields.forEach((field) => {
      const value = formData.get(field);
      if (value) data[field] = value.toString();
    });

    // Handle image if uploaded
    const imageFile = formData.get("image");
    if (imageFile && typeof imageFile === "object") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "web" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      data.image = {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    // Update document
    const updatedWeb = await WebSettings.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedWeb) {
      return NextResponse.json({ error: "Web settings not found" }, { status: 404 });
    }

    return NextResponse.json(updatedWeb, { status: 200 });
  } catch (err) {
    console.error("Error updating WebSettings:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update web settings" },
      { status: 500 }
    );
  }
}
