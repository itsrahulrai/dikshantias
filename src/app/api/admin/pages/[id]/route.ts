import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import PagesModel from "@/models/PagesModel";
import cloudinary from "@/lib/cloudinary";

// GET single page
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const page = await PagesModel.findById(id);
    if (!page) {
      return NextResponse.json({ error: "page not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// UPDATE Page
// UPDATE Page
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { id } = params;

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const active = formData.get("active") === "true";

    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const metaKeywords = formData.get("metaKeywords")
      ? JSON.parse(formData.get("metaKeywords") as string)
      : [];
    const canonicalUrl = formData.get("canonicalUrl") as string;
    const ogTitle = formData.get("ogTitle") as string;
    const ogDescription = formData.get("ogDescription") as string;
    const index = formData.get("index") !== "false";
    const follow = formData.get("follow") !== "false";

    // Find existing page (to check old image)
    const existingPage = await PagesModel.findById(id);
    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const updateData = {
      title,
      slug,
      content,
      active,
      metaTitle,
      metaDescription,
      metaKeywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      index,
      follow,
    };

    // Handle image update if provided
    const imageFile = formData.get("image");
    if (imageFile && typeof imageFile === "object") {
      // Delete old image from Cloudinary (if exists)
      if (existingPage.image?.public_id) {
        await cloudinary.uploader.destroy(existingPage.image.public_id);
      }

      // Upload new image
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "pages" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      updateData.image = {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
        alt: formData.get("imageAlt") as string,
      };
    }

    // Update in MongoDB
    const updatedPage = await PagesModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(updatedPage, { status: 200 });
  } catch (err) {
    console.error("Error updating page:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update page" },
      { status: 500 }
    );
  }
}


// UPDATE Page active status only
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectToDB();

    const { active } = await req.json();

    const page = await PagesModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Failed to update active status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE page
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;
    await connectToDB();

    const page = await PagesModel.findById(id);
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    if (page.image?.public_id) {
      await cloudinary.uploader.destroy(page.image.public_id);
    }

    await PagesModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Failed to delete Page:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

