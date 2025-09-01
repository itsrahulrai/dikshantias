import { NextResponse } from "next/server";
import type { RouteContext } from "next";
import { connectToDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import GalleryModel from "@/models/GalleryModel";

// GET single gallery
export async function GET(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();
    const gallery = await GalleryModel.findById(id);
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE gallery (PUT)
export async function PUT(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const alt = formData.get("alt") as string;
    const imageFile = formData.get("image") as File | null;

    // Fetch existing gallery
    const gallery = await GalleryModel.findById(id);
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    let updatedImage = gallery.image;

    // If new image uploaded, delete old one and upload new
    if (imageFile && imageFile.size > 0) {
      if (gallery.image?.public_id) {
        await cloudinary.uploader.destroy(gallery.image.public_id);
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
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

      updatedImage = {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    gallery.title = title;
    gallery.alt = alt;
    gallery.image = updatedImage;

    await gallery.save();

    return NextResponse.json(gallery, { status: 200 });
  } catch (err) {
    console.error("Error updating gallery:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update gallery" },
      { status: 500 }
    );
  }
}

// UPDATE Gallery active status (PATCH)
export async function PATCH(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();

    const { active } = await request.json();

    const slider = await GalleryModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!slider) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    return NextResponse.json(slider);
  } catch (error) {
    console.error("Failed to update active status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE gallery
export async function DELETE(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();

    const gallery = await GalleryModel.findById(id);
    if (!gallery) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    if (gallery.image?.public_id) {
      await cloudinary.uploader.destroy(gallery.image.public_id);
    }

    await GalleryModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Failed to delete Gallery:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
