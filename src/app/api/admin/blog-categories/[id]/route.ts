import { NextResponse } from "next/server";
import type { RouteContext } from "next"; 
import { connectToDB } from "@/lib/mongodb";
import BlogCategoryModel from "@/models/BlogCategoryModel";


export async function GET(
  request: Request,
  context: RouteContext<{ id: string }> // 👈 correct typing for params
) {
  try {
    await connectToDB();

    const { id } = context.params; // ✅ works now
    const category = await BlogCategoryModel.findById(id);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch category" },
      { status: 500 }
    );
  }
}


// ✅ UPDATE blog category
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const body = await req.json();

    const updatedCategory = await BlogCategoryModel.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update category" },
      { status: 500 }
    );
  }
}

// ✅ DELETE blog category
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const deletedCategory = await BlogCategoryModel.findByIdAndDelete(params.id);

    if (!deletedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete category" },
      { status: 500 }
    );
  }
}
