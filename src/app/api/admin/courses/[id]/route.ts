import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";;
import Course, { ICourse } from "@/models/Course";
import slugify from "slugify";



// GET single course
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ error: "course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// 🔹 Helper to upload image buffer to Cloudinary
async function uploadImageToCloudinary(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<any>((resolve, reject) => {
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

// UPDATE course
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const courseId = params.id;

    // ✅ Fetch existing course first
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // ✅ Required fields
    const title = formData.get("title") as string;

    // ✅ Slug
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
    const lectures = formData.get("lectures")
      ? parseInt(formData.get("lectures") as string, 10)
      : 0;
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
      // 🔹 1. Delete old image from Cloudinary if exists
      if (existingCourse.image?.public_id) {
        await cloudinary.uploader.destroy(existingCourse.image.public_id);
      }

      // 🔹 2. Upload new image
      const uploadedImage = await uploadImageToCloudinary(imageFile);
      imageData = {
        url: uploadedImage.secure_url,
        public_url: uploadedImage.url,
        public_id: uploadedImage.public_id,
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

    // ✅ Build update object
    const updateData: Partial<ICourse> = {
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
    };

    // ✅ Only replace image if new uploaded
    if (imageData) {
      updateData.image = imageData;
    }

    // ✅ Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true }
    );

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update course";
    console.error("Error updating course:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}



// UPDATE course active status only
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectToDB();

    const { active } = await req.json();

    const course = await Course.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // ✅ Return updated course
    return NextResponse.json({ course });
  } catch (error: any) {
    console.error("Failed to update active status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// DELETE course
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectToDB();

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // ✅ Delete Cloudinary image if exists
    if (course.image?.public_id) {
      await cloudinary.uploader.destroy(course.image.public_id);
    }

    await Course.findByIdAndDelete(id);

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to delete course:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Failed to delete course: Unknown error", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}

