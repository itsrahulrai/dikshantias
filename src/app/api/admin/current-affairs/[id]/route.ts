import { NextResponse } from "next/server";
import type { RouteContext } from "next";
import { connectToDB } from "@/lib/mongodb";
import CurrentAffairs from "@/models/CurrentAffair";
import cloudinary from "@/lib/cloudinary";
import BlogCategoryModel from "@/models/BlogCategoryModel";
import SubCategoryModel from "@/models/SubCategoryModel";
import mongoose from "mongoose";

// ✅ GET Current Affair by ID or Slug
export async function GET(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  const { id } = context.params;

  try {
    await connectToDB();

    let currentAffair;
    if (mongoose.Types.ObjectId.isValid(id)) {
      currentAffair = await CurrentAffairs.findById(id)
        .populate({ path: "category", model: BlogCategoryModel })
        .populate({ path: "subCategory", model: SubCategoryModel });
    } else {
      currentAffair = await CurrentAffairs.findOne({ slug: id, active: true })
        .populate({ path: "category", model: BlogCategoryModel })
        .populate({ path: "subCategory", model: SubCategoryModel });
    }

    if (!currentAffair) {
      return NextResponse.json({ error: "Current Affair not found" }, { status: 404 });
    }

    return NextResponse.json(currentAffair, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch current affair" },
      { status: 500 }
    );
  }
}

// 🔹 Utility: Upload to Cloudinary
async function uploadToCloudinary(file: Blob) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "current_affairs" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

// ✅ UPDATE Current Affair
export async function PUT(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    await connectToDB();
    const { id } = context.params;

    const formData = await request.formData();
    const affair = await CurrentAffairs.findById(id);

    if (!affair) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // update fields
    const title = formData.get("title")?.toString();
    if (title) affair.title = title;

    const slug = formData.get("slug")?.toString();
    if (slug) affair.slug = slug;

    const shortContent = formData.get("shortContent")?.toString();
    if (shortContent !== undefined) affair.shortContent = shortContent;

    const content = formData.get("content")?.toString();
    if (content !== undefined) affair.content = content;

    const categoryId = formData.get("category")?.toString();
    if (categoryId) affair.category = categoryId;

    const subCategoryId = formData.get("subCategory")?.toString();
    affair.subCategory = subCategoryId || undefined;

    affair.active = formData.get("active") === "true";

    // handle image upload
    const imageFile = formData.get("image") as Blob | null;
    if (imageFile && imageFile.size > 0) {
      if (affair.image?.public_id) {
        await cloudinary.uploader.destroy(affair.image.public_id).catch(() =>
          console.warn("⚠️ Failed to delete old image")
        );
      }
      const uploadedImage = (await uploadToCloudinary(imageFile))
      affair.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
        public_url: uploadedImage.secure_url,
      };
    }

    const imageAlt = formData.get("imageAlt")?.toString();
    if (imageAlt) affair.imageAlt = imageAlt;

    await affair.save();

    const populated = await affair.populate([
      { path: "category", select: "name" },
      { path: "subCategory", select: "name" },
    ]);

    return NextResponse.json(populated, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update current affair" },
      { status: 500 }
    );
  }
}

// ✅ DELETE Current Affair
export async function DELETE(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();

    const currentAffair = await CurrentAffairs.findById(id);
    if (!currentAffair) {
      return NextResponse.json({ error: "Current Affair not found" }, { status: 404 });
    }

    if (currentAffair.image?.public_id) {
      await cloudinary.uploader.destroy(currentAffair.image.public_id);
    }

    await CurrentAffairs.findByIdAndDelete(id);

    return NextResponse.json({ message: "Current Affair deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete current affair" },
      { status: 500 }
    );
  }
}
