import { NextResponse } from "next/server"; 
import { connectToDB } from "@/lib/mongodb";
import CurrentAffairs from "@/models/CurrentAffair";


// GET single CurrentAffairs
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const CurrentAffair = await CurrentAffairs.findById(id);
    if (!CurrentAffair) {
      return NextResponse.json({ error: "Current Affairs not found" }, { status: 404 });
    }
    return NextResponse.json(CurrentAffair);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// Utility: Upload to Cloudinary
async function uploadToCloudinary(file: Blob) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<any>((resolve, reject) => {
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

// PUT: Update existing current affair
export async function PUT(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("_id")?.toString();
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const title = formData.get("title")?.toString();
    const slug = formData.get("slug")?.toString();
    const shortContent = formData.get("shortContent")?.toString();
    const content = formData.get("content")?.toString();
    const categoryId = formData.get("category")?.toString();
    const subCategoryId = formData.get("subCategory")?.toString();
    const imageFile = formData.get("image") as Blob | null;
    const imageAlt = formData.get("imageAlt")?.toString() || "";
    const active = formData.get("active") === "true";

    // Fetch existing record
    const affair = await CurrentAffairs.findById(id);
    if (!affair) return NextResponse.json({ error: "Current Affair not found" }, { status: 404 });

    // Update fields
    if (title) affair.title = title;
    if (slug) affair.slug = slug;
    if (shortContent !== undefined) affair.shortContent = shortContent;
    if (content !== undefined) affair.content = content;
    if (categoryId) affair.category = categoryId;
    if (subCategoryId) affair.subCategory = subCategoryId || undefined;
    affair.active = active;

    // Handle image only if a new file is uploaded
    if (imageFile) {
      // Delete old image from Cloudinary if exists
      if (affair.image?.public_id) {
        try {
          await cloudinary.uploader.destroy(affair.image.public_id);
        } catch (err) {
          console.warn("Failed to delete old image:", err);
        }
      }

      // Upload new image
      const uploadedImage = await uploadToCloudinary(imageFile);
      affair.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
        public_url: uploadedImage.secure_url,
      };
    }

    // Update imageAlt only if provided
    if (imageAlt) affair.imageAlt = imageAlt;

    await affair.save();

    // Populate category and subCategory for response
    const populatedAffair = await affair.populate([
      { path: "category", select: "name" },
      { path: "subCategory", select: "name" },
    ]);

    return NextResponse.json(populatedAffair, { status: 200 });
  } catch (err: any) {
    console.error("Error updating current affair:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update current affair" },
      { status: 500 }
    );
  }
}


