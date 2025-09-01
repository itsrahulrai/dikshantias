import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import BlogsModel from "@/models/BlogsModel";
import "@/models/BlogCategoryModel";
import cloudinary from "@/lib/cloudinary";

// ✅ GET blog by ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();

    const { id } = context.params;
    const blog = await BlogsModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update blog
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { id } = context.params;

    const formData = await req.formData();

    const updateData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      shortContent: formData.get("shortContent"),
      content: formData.get("content"),
      category: formData.get("category"),
      postedBy: formData.get("postedBy"),
      active: JSON.parse(formData.get("active") as string),
      tags: JSON.parse(formData.get("tags") as string),
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
      metaKeywords: JSON.parse(formData.get("metaKeywords") as string),
      canonicalUrl: formData.get("canonicalUrl"),
      ogTitle: formData.get("ogTitle"),
      ogDescription: formData.get("ogDescription"),
      index: JSON.parse(formData.get("index") as string),
      follow: JSON.parse(formData.get("follow") as string),
    };

    const existingBlog = await BlogsModel.findById(id);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Handle new image upload
    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
      if (existingBlog.image?.public_id) {
        await cloudinary.uploader.destroy(existingBlog.image.public_id);
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      updateData.image = {
        url: uploadRes.secure_url,
        public_url: uploadRes.url,
        public_id: uploadRes.public_id,
        alt: formData.get("imageAlt") as string,
      };
    }

    const updatedBlog = await BlogsModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

// ✅ PATCH - Toggle blog active status
export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { id } = context.params;

    const { active } = await req.json();

    const updatedBlog = await BlogsModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog status updated", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling blog status:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

// ✅ DELETE - Remove blog
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { id } = context.params;

    const blog = await BlogsModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (blog.image?.public_id) {
      await cloudinary.uploader.destroy(blog.image.public_id);
    }

    await BlogsModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
