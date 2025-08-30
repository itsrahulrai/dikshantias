import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import BlogCategoryModel from "@/models/BlogCategoryModel";

// src/app/api/admin/blog-categories/[id]/route.ts

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Example response
  return new Response(
    JSON.stringify({ message: `Category fetched successfully`, id }),
    { status: 200 }
  );
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  return new Response(
    JSON.stringify({ message: `Category ${id} updated`, data: body }),
    { status: 200 }
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return new Response(
    JSON.stringify({ message: `Category ${id} deleted` }),
    { status: 200 }
  );
}
