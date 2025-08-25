import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectToDB();

    const courses = await Course.find();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching courses:", errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
