import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { Student } from "@/lib/schema/schema";

export async function POST(req: NextRequest) {
    const { studentId } = await req.json()
    if (typeof studentId !== "number") {
        return NextResponse.json({
            success: false, message: "Session id is not valid, login again"
        })
    }

    try {
        const findStudent = await db.select().from(Student).where(eq(Student.id, studentId))

        if (findStudent.length === 0) {
            return NextResponse.json({
                success: false, message: "Session is not valid or student not found, login again"
            })
        }

        return NextResponse.json({success: true, message: "Courses fetched successfully", studentDetails: {
            email: findStudent[0].email,
            name: findStudent[0].name,
            profileImage: findStudent[0].profileImageUrl,
        }})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false, message: "Something went wrong."
        })
    }
}