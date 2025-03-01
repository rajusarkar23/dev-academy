import { db } from "@/lib/db/db";
import { Order, Student } from "@/lib/schema/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getStudents = await db
      .select({
        studentId: Student.id,
        studentName: Student.name,
        studentEmail: Student.email,
        studentEnrollments: Student.enrollments,
      })
      .from(Student);
    if (getStudents.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No student found.",
      });
    }


    const getOrders = await db.select({courseId: Order.courseId, studentId: Order.student, orderPlace: Order.isOrderPlaceSuccess}).from(Order)
    if (getOrders.length === 0) {
      return NextResponse.json({success: false, message: "No enrollment found"})
    }

    return NextResponse.json({
      success: true,
      message: "Student fetched successfully",
      dashboard: [{ student: getStudents}, {enrolled: getOrders}],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, try again.",
    });
  }
}
