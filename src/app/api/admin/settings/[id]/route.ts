import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import WebSettings from "@/models/WebSettingsModel";




// UPDATE slider
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const data: any = {};

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
    const imageFile = formData.get("image") as any;
    if (imageFile && typeof imageFile === "object") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadedImage: any = await new Promise((resolve, reject) => {
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
    const updatedWeb = await WebSettings.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updatedWeb) {
      return NextResponse.json({ error: "Web settings not found" }, { status: 404 });
    }

    return NextResponse.json(updatedWeb, { status: 200 });
  } catch (err: any) {
    console.error("Error updating WebSettings:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update web settings" },
      { status: 500 }
    );
  }
}
