import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
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

        // const getStudentCourses = async () => {
        // studentEnrollmentArr.forEach(async function getCourses(items: number, index: number) {
        //     let allCourses: any = []
        //     const courses = (await db.select().from(Course).where(eq(Course.id, items)))
        //     allCourses.push(courses)
        //     // console.log(allCourses);
        //     return allCourses
        // })

        studentEnrollmentArr.forEach(async (items: number, index: number) => {
            let arr: any = []
            const courses = await db.select().from(Course).where(eq(Course.id, items))
            arr.push(courses)
            console.log(arr);

        }
        )

        return NextResponse.json({
            success: true, message: "User session available", student: findStudent
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false, message: "Something went wrong."
        })
    }
}