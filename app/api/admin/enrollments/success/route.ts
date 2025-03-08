import { db } from "@/lib/db/db";
import { Course, Order, Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Course = {
  courseId: number;
  courseName: string;
};

type Student = {
  name: string;
  email: string;
};

export async function GET() {
  try {
    const getFailedEnrollments = await db
      .select({
        courseId: Course.id,
        courseName: Course.courseName,
        studentName: Student.name,
        studentEmail: Student.email
      })
      .from(Order)
      .innerJoin(Course, eq(Order.courseId, Course.id))
      .innerJoin(Student, eq(Order.student, Student.id))
      .where(eq(Order.paymentSuccess, false));

    if (getFailedEnrollments.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No enrollments found.",
      });
    }

    console.log(getFailedEnrollments);
    

    return NextResponse.json({
      success: true,
      message: "Enrollments fethced",
      failedEnrollments: getFailedEnrollments
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again..",
    });
  }
}
