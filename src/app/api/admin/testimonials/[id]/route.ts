import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; 
import { connectToDB } from "@/lib/mongodb";
import TestimonialModel from "@/models/TestimonialsModel";


// GET single Testimonial
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const Testimonial = await TestimonialModel.findById(id);
    if (!Testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json(Testimonial);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    // ✅ Await params before using
    const { id } = await context.params;

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const rank = formData.get("rank") as string;
    const year = formData.get("year") as string;
    const quote = formData.get("quote") as string;
    const attempts = formData.get("attempts") as string;
    const optional = (formData.get("optional") as string) || "";
    const background = (formData.get("background") as string) || "";
    const active = formData.get("active") === "true";

    const existing = await TestimonialModel.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    let updatedImage = existing.image;
    const imageFile = formData.get("image") as any;

    if (imageFile && typeof imageFile === "object") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      if (existing.image?.public_id) {
        await cloudinary.uploader.destroy(existing.image.public_id);
      }

      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "Testimonials" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      updatedImage = {
        url: uploadResult.secure_url,
        public_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
      id,
      {
        name,
        rank,
        year,
        quote,
        attempts,
        optional,
        background,
        image: updatedImage,
        active,
      },
      { new: true }
    );

    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (err: any) {
    console.error("Error updating Testimonial:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update Testimonial" },
      { status: 500 }
    );
  }
}




// UPDATE Testimonial active status only
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectToDB();

    const { active } = await req.json();

    const Testimonial = await TestimonialModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!Testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(Testimonial);
  } catch (error: any) {
    console.error("Failed to update active status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE slider
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    // await the params before using
    const { params } = context;
    const id = params.id;

    await connectToDB();

    const Testimonial = await TestimonialModel.findById(id);
    if (!Testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if exists
    if (Testimonial.image?.public_id) {
      await cloudinary.uploader.destroy(Testimonial.image.public_id);
    }

    await TestimonialModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete Testimonial:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

