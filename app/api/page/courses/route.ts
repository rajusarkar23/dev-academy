import { db } from "@/lib/db/db";
import { Course } from "@/lib/schema/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getAllCourses = await db
      .select({
        title: Course.courseName,
        description: Course.courseShortDescription,
        instructor: Course.courseInstrutor,
        seats: Course.studentCapacity,
        image: Course.courseImageURL,
        id: Course.id,
        slug: Course.slug
      })
      .from(Course);
    return NextResponse.json({success: true, message: "Fetched", courses: getAllCourses})
  } catch (error) {
    console.log(error);
    return NextResponse.json({success: false, message: "Something went wrong"})
  }
}
