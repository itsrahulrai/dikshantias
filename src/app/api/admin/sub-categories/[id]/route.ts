import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import SubCategoryModel from "@/models/SubCategoryModel";

// ✅ Type for context params
type Context = { params: { id: string } };

// GET single subcategory
export async function GET(request: Request, { params }: Context) {
  try {
    const { id } = params;
    await connectToDB();

    const subcategory = await SubCategoryModel.findById(id).populate(
      "category",
      "name slug"
    );

    if (!subcategory) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

// UPDATE subcategory
export async function PUT(request: Request, { params }: Context) {
  try {
    await connectToDB();
    const { id } = params;
    const { name, slug, active, category } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Subcategory ID is required" },
        { status: 400 }
      );
    }

    const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(active !== undefined && { active }),
        ...(category && { category }),
      },
      { new: true }
    ).populate("category", "name slug");

    if (!updatedSubCategory) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSubCategory, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating subcategory:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

// UPDATE Subcategory active status only
export async function PATCH(request: Request, { params }: Context) {
  try {
    const { id } = params;
    await connectToDB();

    const body = await request.json();
    const { active } = body;

    const subcategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!subcategory) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory, { status: 200 });
  } catch (error: unknown) {
    console.error("Failed to update active status:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    );
  }
}

// DELETE subcategory
export async function DELETE(request: Request, { params }: Context) {
  try {
    await connectToDB();

    const deleted = await SubCategoryModel.findByIdAndDelete(params.id);

    return deleted
      ? NextResponse.json({ message: "Subcategory deleted successfully" })
      : NextResponse.json({ error: "Subcategory not found" }, { status: 404 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting subcategory:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
