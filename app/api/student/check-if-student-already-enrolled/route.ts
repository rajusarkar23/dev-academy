import { studentSession } from "@/lib/cookie-session/student-session";
import { db } from "@/lib/db/db";
import { Course, Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  const studentId = await studentSession();
  if (typeof studentId !== "number") {
    return NextResponse.json({
        success: false,
        message: "Please login to get details..."
    })
  }

  try {
    const getDataFromDB = await db
      .select({
        studentEnrollments: Student.enrollments,
        courseId: Course.id,
      })
      .from(Student)
      .leftJoin(Course, eq(Course.slug, slug))
      .where(eq(Student.id, studentId));

    const studentEnrollments = getDataFromDB[0].studentEnrollments;
    const courseId = getDataFromDB[0].courseId;

    const checkIfIdExists = () => {
      let isExists: boolean = false;
      for (const ids of studentEnrollments) {
        if (ids === courseId) {
          isExists = true;
        } else {
        }
      }
      return isExists;
    };

    const matchFound = checkIfIdExists();

    if (matchFound) {
      return NextResponse.json({
        success: true,
        message: "Course already exists in your cart",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Course does not exists.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.., try again..",
    });
  }
}

// get the course by slug
