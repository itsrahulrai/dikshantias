import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import SliderModel from "@/models/SliderModel";


// GET single slider
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
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
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const body = await req.json();
    const updatedSlider = await SliderModel.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    if (!updatedSlider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }
    return NextResponse.json(updatedSlider);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE slider
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const deleted = await SliderModel.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Slider deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
