import { connectToDB } from "@/lib/mongodb";
import BlogCategoryModel from "@/models/BlogCategoryModel";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single category by ID
export async function GET(req: Request, { params }: RouteParams) {
  try {
    await connectToDB();
    const { id } = params;
    const category = await BlogCategoryModel.findById(id);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch category" }, { status: 500 });
  }
}

// UPDATE category
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectToDB();
    const { id } = params;
    const { name, slug, active } = await req.json();

    const updated = await BlogCategoryModel.findByIdAndUpdate(
      id,
      { name, slug, active },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Failed to update category" }, { status: 500 });
  }
}

// DELETE category
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectToDB();
    const { id } = params;

    const deleted = await BlogCategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Failed to delete category" }, { status: 500 });
  }
}
