import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; 
import { connectToDB } from "@/lib/mongodb";
import TestimonialModel from "@/models/TestimonialsModel";



// GET all sliders
export async function GET() {
  try {
    await connectToDB();;
    const testimonials = await TestimonialModel.find();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const rank = formData.get("rank") as string;
    const year = formData.get("year") as string;
    const quote = formData.get("quote") as string;
    const attempts = formData.get("attempts") as string;
    const optional = (formData.get("optional") as string) || "";
    const background = (formData.get("background") as string) || "";

    const imageFile = formData.get("image");
    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload to Cloudinary
    const uploadedImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "Testimonials" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const newTestimonial = await TestimonialModel.create({
      name,
      rank,
      year,
      quote,
      attempts,
      optional,
      background,
      image: {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
      active: true,
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (err) {
    console.error("Error creating Testimonial:", err);
    return NextResponse.json({ error: err.message || "Failed to create Testimonial" }, { status: 500 });
  }
}