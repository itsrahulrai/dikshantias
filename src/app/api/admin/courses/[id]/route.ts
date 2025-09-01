import { NextResponse } from "next/server";
import type { RouteContext } from "next";
import { connectToDB } from "@/lib/mongodb";
import BlogsModel from "@/models/BlogsModel";

// ✅ GET blog by ID
export async function GET(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    await connectToDB();
    const { id } = context.params;

    const blog = await BlogsModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE blog by ID
export async function PUT(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    await connectToDB();
    const { id } = context.params;
    const body = await request.json();

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update blog" },
      { status: 500 }
    );
  }
}

// ✅ DELETE blog by ID
export async function DELETE(
  request: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    await connectToDB();
    const { id } = context.params;

    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete blog" },
      { status: 500 }
    );
  }
}
