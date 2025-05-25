import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db/db";
import { Course, Student } from "@/lib/schema/schema";
import { eq, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const cookie = req.cookies;

  const session = cookie.get("session")!.value;

  if (typeof session === "undefined") {
    return NextResponse.json({
      success: false,
      message: "Invalid session, login again",
    });
  }

  const verifySession = jwt.verify(
    session,
    `${process.env.SESSION_FOR_STUDENT}`
  );
  // @ts-expect-error, student id is available
  const studentId = verifySession.studentId;

  if (typeof studentId !== "number") {
    return NextResponse.json({
      success: false,
      message: "Jwt session is not valid, login again",
    });
  }

  try {
    const getStudent = await db
      .select()
      .from(Student)
      .where(eq(Student.id, studentId));

    const fetchEnrollments = await db
      .select({
        courseName: Course.courseName,
        slug: Course.slug,
        instructor: Course.courseInstrutor,
        imageUrl: Course.courseImageURL,
      })
      .from(Course)
      .where(inArray(Course.id, getStudent[0].enrollments));

    if (fetchEnrollments.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No enrollments found",
      });
    }

    return NextResponse.json({
      success: true,
      enrollments: fetchEnrollments,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server erroo",
    });
  }
}
