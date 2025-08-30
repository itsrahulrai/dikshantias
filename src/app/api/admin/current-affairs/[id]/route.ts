import { NextResponse } from "next/server"; 
import { connectToDB } from "@/lib/mongodb";
import CurrentAffairs from "@/models/CurrentAffair";
import cloudinary from "@/lib/cloudinary";
import BlogCategoryModel from "@/models/BlogCategoryModel";
import SubCategoryModel from "@/models/SubCategoryModel";
import mongoose from "mongoose";


// Get single current affair
// export async function GET(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { params } = context;
//     const { id } = await params;
//     await connectToDB();

//     const currentAffair = await CurrentAffairs.findById(id)
//       .populate({ path: "category", model: BlogCategoryModel })
//       .populate({ path: "subCategory", model: SubCategoryModel });

//     if (!currentAffair) {
//       return NextResponse.json({ error: "Current Affairs not found" }, { status: 404 });
//     }

//     return NextResponse.json(currentAffair);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



// GET Current Affair by ID or Slug
export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await connectToDB();

    let currentAffair;

    if (mongoose.Types.ObjectId.isValid(id)) {
      // If valid ObjectId, fetch by _id
      currentAffair = await CurrentAffairs.findById(id)
        .populate({ path: "category", model: BlogCategoryModel })
        .populate({ path: "subCategory", model: SubCategoryModel });
    } else {
      // Otherwise, fetch by slug
      currentAffair = await CurrentAffairs.findOne({ slug: id, active: true })
        .populate({ path: "category", model: BlogCategoryModel })
        .populate({ path: "subCategory", model: SubCategoryModel });
    }

    if (!currentAffair) {
      return NextResponse.json({ error: "Current Affairs not found" }, { status: 404 });
    }

    return NextResponse.json(currentAffair);
  } catch (error: any) {
    console.error("GET Current Affair Error:", error);
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
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    const formData = await req.formData();
    console.log("➡️ Received Update Request for ID:", params.id);
    console.log("➡️ FormData Entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const affair = await CurrentAffairs.findById(params.id);
    if (!affair) {
      console.log("❌ No affair found with ID:", params.id);
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

    const active = formData.get("active") === "true";
    affair.active = active;

    // handle image upload
    const imageFile = formData.get("image") as Blob | null;
    if (imageFile && (imageFile as any).size > 0) {
      console.log("➡️ Uploading new image...");
      if (affair.image?.public_id) {
        await cloudinary.uploader.destroy(affair.image.public_id).catch(() =>
          console.warn("⚠️ Failed to delete old image")
        );
      }
      const uploadedImage = await uploadToCloudinary(imageFile);
      affair.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
        public_url: uploadedImage.secure_url,
      };
    }

    const imageAlt = formData.get("imageAlt")?.toString();
    if (imageAlt) affair.imageAlt = imageAlt;

    await affair.save();
    console.log("✅ Affair Updated:", affair);

    const populated = await affair.populate([
      { path: "category", select: "name" },
      { path: "subCategory", select: "name" },
    ]);

    return NextResponse.json(populated, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in PUT API:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update current affair" },
      { status: 500 }
    );
  }
}


// DELETE CurrentAffairs

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const id = params.id;
    await connectToDB();

    const currentAffair = await CurrentAffairs.findById(id);
    if (!currentAffair) {
      return NextResponse.json({ error: "Current Affairs not found" }, { status: 404 });
    }
    if (currentAffair.image?.public_id) {
      await cloudinary.uploader.destroy(currentAffair.image.public_id);
    }
    await CurrentAffairs.findByIdAndDelete(id);

    return NextResponse.json({ message: "Current Affairs deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete Current Affairs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


