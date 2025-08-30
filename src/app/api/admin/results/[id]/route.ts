import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import ResultModel from "@/models/ResultModel";

// GET single slider
export async function GET(
  req: Request,     
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const result = await ResultModel.findById(id);
    if (!result) {
      return NextResponse.json({ error: "result not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Result
export async function PUT(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const rank = Number(formData.get("rank"));
    const service = formData.get("service") as string;
    const year = formData.get("year") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Result ID is required" }, { status: 400 });
    }

    // Find existing record
    const existingResult = await ResultModel.findById(id);
    if (!existingResult) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    let updatedImage = existingResult.image;

    // If new image is uploaded
    if (imageFile && imageFile.size > 0) {
      // Delete old image from Cloudinary
      if (existingResult.image?.public_id) {
        await cloudinary.uploader.destroy(existingResult.image.public_id);
      }

      // Convert file to buffer
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      // Upload to Cloudinary
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

    // Update in DB
    const updatedResult = await ResultModel.findByIdAndUpdate(
      id,
      { name, rank, service, year, image: updatedImage },
      { new: true }
    );

    return NextResponse.json(updatedResult, { status: 200 });
  } catch (err) {
    console.error("Error updating Result:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update Result" },
      { status: 500 }
    );
  }
}


// UPDATE Result active status only
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectToDB();
    const { active } = await req.json();
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


// DELETE Result
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const id = params.id;
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




