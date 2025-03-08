import { db } from "@/lib/db/db";
import { Course, Order, Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Course = {
  courseId:  number,
  courseName: string
}

type Student = {
  name: string,
  email: string
}

export async function GET() {
  try {
    const getFailedEnrollments = await db
      .select({ courseId: Order.courseId, studentId: Order.student })
      .from(Order)
      .where(eq(Order.paymentSuccess, false));

    if (getFailedEnrollments.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No enrollments found.",
      });
    }

    const courseid = getFailedEnrollments.map((ite) => ite.courseId);
    const studentId = getFailedEnrollments.map((ite) => ite.studentId);

    const ccourse: Course[][] = [];

    for (const ids of courseid) {
      const course = await db
        .select({ courseName: Course.courseName, courseId: Course.id })
        .from(Course)
        .where(eq(Course.id, ids));
      ccourse.push(course);
    }

    const students: Student[][] = [];

    for (const ids of studentId) {
      const student = await db
        .select({ email: Student.email, name: Student.name })
        .from(Student)
        .where(eq(Student.id, ids));
      students.push(student);
    }

    const failedEnrollments = students.map((student, index) => ({
      ...student[0],
      ...ccourse[index][0],
    }));

    return NextResponse.json({
      success: true,
      message: "Enrollments fethced",
      failedEnrollments,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again..",
    });
  }
}

// student name
// course id => course name
// created at
