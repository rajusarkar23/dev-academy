import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { studentSession } from "@/lib/cookie-session/student-session";
import { db } from "@/lib/db/db";
import { Student } from "@/lib/schema/schema";

export async function GET() {
    const studentId = await studentSession()
    console.log(studentId);
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

        return NextResponse.json({
            success: true, messahe: "User session available"
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false, message: "Something went wrong."
        })
    }
}