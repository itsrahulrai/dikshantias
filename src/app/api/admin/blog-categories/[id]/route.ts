import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import BlogCategoryModel from "@/models/BlogCategoryModel";

// GET single category by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const category = await BlogCategoryModel.findById(params.id);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}


// Update category
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    // Await params to resolve the Promise
    const { id } = await params;

    const { name, slug, active } = await req.json();

    const updated = await BlogCategoryModel.findByIdAndUpdate(
      id,
      { name, slug, active },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}


// DELETE category
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;
    await BlogCategoryModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
