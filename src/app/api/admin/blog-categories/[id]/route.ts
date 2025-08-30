import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import BlogCategoryModel from "@/models/BlogCategoryModel";

type Params = {
  params: {
    id: string;
  };
};

// GET single category by ID
export async function GET(req: Request, { params }: Params) {
  await connectToDB();
  const category = await BlogCategoryModel.findById(params.id);

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category, { status: 200 });
}

// PUT update category
export async function PUT(req: Request, { params }: Params) {
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

  return NextResponse.json(updated, { status: 200 });
}

// DELETE category
export async function DELETE(req: Request, { params }: Params) {
  await connectToDB();
  const { id } = params;

  const deleted = await BlogCategoryModel.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Category deleted" }, { status: 200 });
}
