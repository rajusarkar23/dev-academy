import { db } from "@/lib/db/db";
import { Student } from "@/lib/schema/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getAllStudents = await db.select().from(Student);

    if (getAllStudents.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No students found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Students fetched",
      student: getAllStudents,
    });
  } catch (error) {
    console.log();
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
