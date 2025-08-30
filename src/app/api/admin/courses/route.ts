import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary"; 
import Course, { ICourse } from "@/models/Course";
import slugify from "slugify";

export async function GET() {
  try {
    await connectToDB();

    const courses = await Course.find();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching courses:", errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}


// 🔹 Helper to upload image buffer to Cloudinary
async function uploadImageToCloudinary(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "courses" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}



export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();

    // ✅ Required fields
    const title = formData.get("title") as string;

    // ✅ Slug (generate if missing)
    const rawSlug = formData.get("slug") as string | null;
    const slug =
      rawSlug && rawSlug.trim().length > 0
        ? rawSlug
        : slugify(title, { lower: true, strict: true });

    const shortContent = formData.get("shortContent") as string;
    const content = formData.get("content") as string;
    const active = formData.get("active")
      ? JSON.parse(formData.get("active") as string)
      : true;

    // ✅ Basic Info
    const courseMode = formData.get("courseMode") as "online" | "offline";
    const lectures = parseInt(formData.get("lectures") as string, 10);
    const duration = formData.get("duration") as string;
    const languages = formData.get("languages") as string;
    const displayOrder = formData.get("displayOrder")
      ? parseInt(formData.get("displayOrder") as string, 10)
      : 0;

    // ✅ Pricing
    const originalPrice = formData.get("originalPrice")
      ? parseFloat(formData.get("originalPrice") as string)
      : undefined;
    const price = formData.get("price")
      ? parseFloat(formData.get("price") as string)
      : undefined;
    const totalFee = formData.get("totalFee")
      ? parseFloat(formData.get("totalFee") as string)
      : undefined;
    const oneTimeFee = formData.get("oneTimeFee")
      ? parseFloat(formData.get("oneTimeFee") as string)
      : undefined;
    const firstInstallment = formData.get("firstInstallment")
      ? parseFloat(formData.get("firstInstallment") as string)
      : undefined;
    const secondInstallment = formData.get("secondInstallment")
      ? parseFloat(formData.get("secondInstallment") as string)
      : undefined;
    const thirdInstallment = formData.get("thirdInstallment")
      ? parseFloat(formData.get("thirdInstallment") as string)
      : undefined;
    const fourthInstallment = formData.get("fourthInstallment")
      ? parseFloat(formData.get("fourthInstallment") as string)
      : undefined;

    // ✅ Handle image
    let imageData: ICourse["image"] | undefined;
    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
      const uploadedImage = await uploadImageToCloudinary(imageFile);
      imageData = {
        url: uploadedImage.secure_url,       // ✅ main URL
        public_url: uploadedImage.url,       // ✅ non-https URL
        public_id: uploadedImage.public_id,  // ✅ Cloudinary public_id
        alt: (formData.get("imageAlt") as string) || "",
      };
    }

    // ✅ Videos
    const demoVideo = formData.get("demoVideo") as string | undefined;
    const videos = formData.get("videos")
      ? JSON.parse(formData.get("videos") as string)
      : [];

    // ✅ SEO fields
    const metaTitle = (formData.get("metaTitle") as string) || "";
    const metaDescription = (formData.get("metaDescription") as string) || "";
    const metaKeywords = formData.get("metaKeywords")
      ? JSON.parse(formData.get("metaKeywords") as string)
      : [];
    const canonicalUrl = (formData.get("canonicalUrl") as string) || "";
    const ogTitle = (formData.get("ogTitle") as string) || "";
    const ogDescription = (formData.get("ogDescription") as string) || "";
    const index = formData.get("index")
      ? JSON.parse(formData.get("index") as string)
      : true;
    const follow = formData.get("follow")
      ? JSON.parse(formData.get("follow") as string)
      : true;

    // ✅ Create and save course
    const newCourse = await Course.create({
      title,
      slug,
      shortContent,
      content,
      active,
      courseMode,
      lectures,
      duration,
      languages,
      displayOrder,
      originalPrice,
      price,
      totalFee,
      oneTimeFee,
      firstInstallment,
      secondInstallment,
      thirdInstallment,
      fourthInstallment,
      image: imageData,
      demoVideo,
      videos,
      metaTitle,
      metaDescription,
      metaKeywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      index,
      follow,
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create course";
    console.error("Error creating course:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}