import { db } from "@/lib/db/db";
import { Course, Student } from "@/lib/schema/schema";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getAllStudents = await db.select({id: Student.id, email: Student.email, name: Student.name, enrollments: Student.enrollments}).from(Student);

    if (getAllStudents.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No students found",
      });
    }
    // console.log(getAllStudents);

    const enrollmentsArr = getAllStudents.map((obj) => obj.enrollments);
    let courses = [];

    for (const enrollmentIds of enrollmentsArr) {
      if (enrollmentIds.length === 0) {
        courses.push([])
        continue;
      }


      
      const coursesById = await db
        .select()
        .from(Course)
        .where(inArray(Course.id, enrollmentIds));

        courses.push(coursesById)
    }


    const newArr = getAllStudents.map((stud, index) => ({
      ...stud,
      enrollments: courses[index] || []
    }))


    return NextResponse.json({
      success: true,
      message: "Students fetched",
      student: newArr,
      
    });
  } catch (error) {
    console.log();
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
