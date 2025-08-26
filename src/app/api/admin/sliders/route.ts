import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; 
import { connectToDB } from "@/lib/mongodb";
import SliderModel from "@/models/SliderModel";


// GET all sliders
export async function GET() {
  try {
    await connectToDB();
    console.log("Fetching all sliders");
    const sliders = await SliderModel.find();
    console.log(`Found ${sliders.length} sliders`);
    return NextResponse.json(sliders);
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return NextResponse.json({ error: "Failed to fetch sliders" }, { status: 500 });
  }
}

// Create new slider
export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const displayOrder = parseInt(formData.get("displayOrder") as string);
    const imageFile = formData.get("image") as any;

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload to Cloudinary
    const uploadedImage: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "sliders" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Save slider in MongoDB, including public_id
    const newSlider = await SliderModel.create({
      title,
      displayOrder,
      image: {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url, // for frontend display
        public_id: uploadedImage.public_id,    // needed for deletion
      },
      active: true,
    });

    return NextResponse.json(newSlider, { status: 201 });
  } catch (err: any) {
    console.error("Error creating slider:", err);
    return NextResponse.json({ error: err.message || "Failed to create slider" }, { status: 500 });
  }
}