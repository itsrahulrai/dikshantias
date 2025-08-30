import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import ResultModel from "@/models/ResultModel";
import cloudinary from "@/lib/cloudinary"; 


// GET all Results
export async function GET() {
  try {
    await connectToDB();
    const Results = await ResultModel.find();
    return NextResponse.json(Results);
  } catch (error) {
    console.error("Error fetching Results:", error);
    return NextResponse.json({ error: "Failed to fetch Results" }, { status: 500 });
  }
}


// Create new Result
export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const rank = Number(formData.get("rank"));
    const service = formData.get("service") as string;
    const year = formData.get("year") as string;

    const imageFile = formData.get("image") as File;

    if (!name || !rank || !service || !year) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload to Cloudinary
    const uploadedImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "results" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Create Result in MongoDB
    const newResult = await ResultModel.create({
      name,
      rank,
      service,
      year,
      image: {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
    });

    return NextResponse.json(newResult, { status: 201 });
  } catch (err) {
    console.error("Error creating Result:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create Result" },
      { status: 500 }
    );
  }
}

