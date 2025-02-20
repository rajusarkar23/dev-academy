import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import adminSession from "@/lib/cookie-session/admin-session";
import { db } from "@/lib/db/db";
import { Course } from "@/lib/schema/schema";

export async function POST(req: NextRequest) {
    const {
        courseName,
        courseHeading,
        courseShortDescription,
        courseInstructor,
        courseDuration,
        courseStartDate,
        courseEndDate,
        studentCapacity,
        courseDescription,
        courseImageURL,
        courseVideoURL,
        slug,
        coursePrice 
    } = await req.json()

    const userId = await adminSession()
    if (typeof userId !== "number") {
        return NextResponse.json({ success: false, message: "Please login again, invalid session." })
    }


    try {
        const addCourse = await db.insert(Course).values({
            courseName,
            courseHeading,
            courseShortDescription,
            courseInstrutor: courseInstructor,
            courseDuration,
            courseStartDate,
            courseEndDate,
            studentCapacity,
            courseDescription,
            courseImageURL,
            courseVideoURL,
            createdBy: Number(userId),
            slug,
            coursePrice
        }).returning()

        if (addCourse.length === 0) {
            return NextResponse.json({ 
                success: false, message: "Something went wrong in adding course, please try again." 
            })
        }
        return NextResponse.json({ 
            success: true, message: "Course added" 
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            success: false, message: "Something went wrong, please try again." 
        })

    }

}


export async function GET() {
    const id = await adminSession()
    if (typeof id !== "number") {
        return NextResponse.json({ 
            success: false, message: "Please login again, invalid session." 
        })
    }

    try {
        const getAllCourses = await db.select().from(Course).where(eq(Course.createdBy, id))

        if (getAllCourses.length === 0) {
            return NextResponse.json({ message: "No course found" })
        }

        return NextResponse.json({ success: true, message: "Course found", courses: getAllCourses })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: true, message: "Something went wrong." })
    }
}

