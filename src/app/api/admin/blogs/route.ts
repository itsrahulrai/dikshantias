import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import BlogsModel from "@/models/BlogsModel";
import "@/models/BlogCategoryModel";
import cloudinary from "@/lib/cloudinary"; 

export async function GET() {
  try {
    await connectToDB();

    const blogs = await BlogsModel.find().populate("category").lean();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// POST - Add new blog
export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();

    // Extract fields
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const shortContent = formData.get("shortContent") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const postedBy = formData.get("postedBy") as string;
    const active = JSON.parse(formData.get("active") as string);
    const tags = JSON.parse(formData.get("tags") as string);

    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const metaKeywords = JSON.parse(formData.get("metaKeywords") as string);
    const canonicalUrl = formData.get("canonicalUrl") as string;
    const ogTitle = formData.get("ogTitle") as string;
    const ogDescription = formData.get("ogDescription") as string;
    const index = JSON.parse(formData.get("index") as string);
    const follow = JSON.parse(formData.get("follow") as string);

    // Handle image upload
    let imageData = {
      url: "",
      public_url: "",
      public_id: "",
      alt: formData.get("imageAlt") as string,
    };

    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
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

      const uploaded = uploadRes;

      imageData = {
        url: uploaded.secure_url, // main image URL
        public_url: uploaded.url, // http (non-ssl) url
        public_id: uploaded.public_id, // unique cloudinary id
        alt: formData.get("imageAlt") as string,
      };
    }

    // Save to DB
    const newBlog = new BlogsModel({
      title,
      slug,
      shortContent,
      content,
      category,
      postedBy,
      active,
      tags,
      image: imageData,

      metaTitle,
      metaDescription,
      metaKeywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      index,
      follow,
    });

    await newBlog.save();

    return NextResponse.json({ message: "Blog created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
