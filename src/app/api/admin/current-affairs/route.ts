import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; 
import { connectToDB } from "@/lib/mongodb";
import CurrentAffairs from "@/models/CurrentAffair";
import BlogCategoryModel from "@/models/BlogCategoryModel";
import SubCategoryModel from "@/models/SubCategoryModel";




// GET all Current Affairs
export async function GET() {
  try {
    await connectToDB();

    const currentAffairs = await CurrentAffairs.find()
      .populate({ path: "category", model: BlogCategoryModel })
      .populate({ path: "subCategory", model: SubCategoryModel });

    return NextResponse.json(currentAffairs);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch current affairs" },
      { status: 500 }
    );
  }
}

// Utility: Upload to Cloudinary
async function uploadToCloudinary(file: Blob) {
  if (!file) return null; // <-- handle null case
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

// POST: Create new current affair
export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const slug = formData.get("slug")?.toString();
    const shortContent = formData.get("shortContent")?.toString();
    const content = formData.get("content")?.toString();
    const categoryId = formData.get("category")?.toString();
    const subCategoryId = formData.get("subCategory")?.toString();
    const imageFile = formData.get("image") as Blob | null;
    const imageAlt = formData.get("imageAlt")?.toString() || "";
    const active = formData.get("active") === "true";

    // Upload image only if provided
    const uploadedImage = imageFile ? await uploadToCloudinary(imageFile) : null;

    const newAffair = await CurrentAffairs.create({
      title,
      slug,
      shortContent,
      content,
      category: categoryId,
      subCategory: subCategoryId || undefined,
      image: uploadedImage
        ? {
            url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
            public_url: uploadedImage.secure_url,
          }
        : undefined, // <-- no image if not uploaded
      imageAlt,
      active,
    });

    // Populate category and subCategory for response
    const populatedAffair = await newAffair.populate([
      { path: "category", select: "name" },
      { path: "subCategory", select: "name" },
    ]);

    return NextResponse.json(populatedAffair, { status: 201 });
  } catch (err) {
    console.error("Error creating current affair:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create current affair" },
      { status: 500 }
    );
  }
}
