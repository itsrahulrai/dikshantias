import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import SliderModel from "@/models/SliderModel";
import cloudinary from "@/lib/cloudinary";
import GalleryModel from "@/models/GalleryModel";

// GET single slider
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const gallery = await GalleryModel.findById(id);
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }
    return NextResponse.json(gallery);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await connectToDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const alt = formData.get("alt") as string;
    const imageFile = formData.get("image") as any;

    // Fetch existing gallery
    const gallery = await GalleryModel.findById(id);
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    let updatedImage = gallery.image;

    // If new image uploaded, delete old one and upload new
    if (imageFile && imageFile.size > 0) {
      // Delete old image from Cloudinary
      if (gallery.image?.public_id) {
        await cloudinary.uploader.destroy(gallery.image.public_id);
      }

      // Upload new image
      const buffer = Buffer.from(await imageFile.arrayBuffer());
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

      updatedImage = {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    // Update gallery document
    gallery.title = title;
    gallery.alt = alt;
    gallery.image = updatedImage;

    await gallery.save();

    return NextResponse.json(gallery, { status: 200 });
  } catch (err: any) {
    console.error("Error updating gallery:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update gallery" },
      { status: 500 }
    );
  }
}



// UPDATE Gallery active status only
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectToDB();

    const { active } = await req.json();

    const slider = await GalleryModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!slider) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    return NextResponse.json(slider);
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

    const gallery = await GalleryModel.findById(id);
    if (!gallery) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if exists
    if (gallery.image?.public_id) {
      await cloudinary.uploader.destroy(gallery.image.public_id);
    }

    await GalleryModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Gallery deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete Gallery:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
