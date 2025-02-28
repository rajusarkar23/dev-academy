import { NextRequest, NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { Course, Student } from "@/lib/schema/schema";

export async function POST(req: NextRequest) {
    const { studentId } = await req.json()
    if (typeof studentId !== "number") {
        return NextResponse.json({
            success: false, message: "Session is not valid, login again"
        })
    }

    try {
        const findStudent = await db.select().from(Student).where(eq(Student.id, studentId))

        if (findStudent.length === 0) {
            return NextResponse.json({
                success: false, message: "Session is not valid, login again"
            })
        }

        const studentEnrollmentArr = findStudent[0].enrollments
        

        const getStudentCourses = await db.select({courseName: Course.courseName, slug: Course.slug, courseShortDescription: Course.courseShortDescription, instructor: Course.courseInstrutor,startingDate: Course.courseStartDate, endDate: Course.courseEndDate, imageUrl: Course.courseImageURL }).from(Course).where(inArray(Course.id, studentEnrollmentArr))

        if (getStudentCourses.length === 0) {
            return NextResponse.json({success: true, message: "Courses fetched successfully", studentDetails: {
                email: findStudent[0].email,
                name: findStudent[0].name,
                courses: []
            }})
        }

        // console.log(getStudentCourses);
        
                
        
        return NextResponse.json({success: true, message: "Courses fetched successfully", studentDetails: {
            email: findStudent[0].email,
            name: findStudent[0].name,
            courses: getStudentCourses
        }})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false, message: "Something went wrong."
        })
    }
}