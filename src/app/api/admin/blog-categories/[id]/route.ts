import { connectToDB } from "@/lib/mongodb";
import BlogCategoryModel from "@/models/BlogCategoryModel";
import { NextResponse, type NextRequest } from "next/server";

interface Params {
  id: string;
}

type RouteContext = {
  params: Params;
};

// GET single category by ID
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await connectToDB();
    const { id } = context.params;
    const category = await BlogCategoryModel.findById(id);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

// Update category
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();

    const { id } = context.params;
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
  context: { params: { id: string } }
) {
  try {
    await connectToDB();

    const { id } = context.params;
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
