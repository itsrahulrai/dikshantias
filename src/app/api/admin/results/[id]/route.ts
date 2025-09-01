import { NextResponse } from "next/server";
import type { RouteContext } from "next";
import { connectToDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import ResultModel from "@/models/ResultModel";

// GET single result
export async function GET(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();
    const result = await ResultModel.findById(id);
    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE result (with image upload)
export async function PUT(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    await connectToDB();

    const formData = await request.formData();
    const id = context.params.id;
    const name = formData.get("name") as string;
    const rank = Number(formData.get("rank"));
    const service = formData.get("service") as string;
    const year = formData.get("year") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json(
        { error: "Result ID is required" },
        { status: 400 }
      );
    }

    const existingResult = await ResultModel.findById(id);
    if (!existingResult) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    let updatedImage = existingResult.image;

    if (imageFile && imageFile.size > 0) {
      if (existingResult.image?.public_id) {
        await cloudinary.uploader.destroy(existingResult.image.public_id);
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "results" },
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

    const updatedResult = await ResultModel.findByIdAndUpdate(
      id,
      { name, rank, service, year, image: updatedImage },
      { new: true }
    );

    return NextResponse.json(updatedResult, { status: 200 });
  } catch (error) {
    console.error("Error updating Result:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update Result" },
      { status: 500 }
    );
  }
}

// UPDATE Result active status
export async function PATCH(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();

    const { active } = await request.json();
    const result = await ResultModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to update active Result:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE result
export async function DELETE(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params;
    await connectToDB();

    const result = await ResultModel.findById(id);
    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    if (result.image?.public_id) {
      await cloudinary.uploader.destroy(result.image.public_id);
    }

    await ResultModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Failed to delete result:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
