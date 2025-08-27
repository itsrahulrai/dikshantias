import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import SliderModel from "@/models/SliderModel";
import cloudinary from "@/lib/cloudinary";

// GET single slider
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const slider = await SliderModel.findById(id);
    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }
    return NextResponse.json(slider);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// UPDATE slider
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectToDB();

    let slider = await SliderModel.findById(id);
    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    const contentType = req.headers.get("content-type") || "";

    // 🔹 CASE 1: Update via JSON (active toggle only)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      slider.active = body.active ?? slider.active;
      await slider.save();
      return NextResponse.json(slider);
    }

    // 🔹 CASE 2: Update via FormData (title, image, displayOrder)
    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await req.formData();
      const title = formData.get("title") as string;
      const displayOrder = parseInt(formData.get("displayOrder") as string);
      const imageFile = formData.get("image") as any;

      let updatedImage = slider.image;

      if (imageFile && imageFile.size > 0) {
        // delete old image
        if (slider.image?.public_id) {
          try {
            await cloudinary.uploader.destroy(slider.image.public_id);
          } catch (err) {
            console.error("Failed to delete old image from Cloudinary:", err);
          }
        }

        // upload new
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadedImage: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "sliders" },
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

      slider.title = title;
      slider.displayOrder = displayOrder;
      slider.image = updatedImage;

      await slider.save();
      return NextResponse.json(slider);
    }

    return NextResponse.json(
      { error: "Unsupported Content-Type" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Failed to update slider:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE slider active status only
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectToDB();

    const { active } = await req.json();

    const slider = await SliderModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    return NextResponse.json(slider);
  } catch (error: any) {
    console.error("Failed to update active status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE slider
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    // await the params before using
    const { params } = context;
    const id = params.id;

    await connectToDB();

    const slider = await SliderModel.findById(id);
    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if exists
    if (slider.image?.public_id) {
      await cloudinary.uploader.destroy(slider.image.public_id);
    }

    await SliderModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Slider deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete slider:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
