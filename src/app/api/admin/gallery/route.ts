import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; 
import { connectToDB } from "@/lib/mongodb";
import GalleryModel from "@/models/GalleryModel";


// GET all sliders
export async function GET() {
  try {
    await connectToDB();
    const galleries = await GalleryModel.find();
    return NextResponse.json(galleries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// Create new Gallery
export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const alt = formData.get("alt") as string;
   

    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload to Cloudinary
    const uploadedImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "sliders" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Include type in MongoDB document
    const newGallery = await GalleryModel.create({
      title,
      alt,
      image: {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
      active: true,
    });

    return NextResponse.json(newGallery, { status: 201 });
  } catch (err) {
    console.error("Error creating gallery:", err);
    return NextResponse.json({ error: err.message || "Failed to create gallery" }, { status: 500 });
  }
}

