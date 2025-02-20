import { db } from "@/lib/db/db";
import { Course } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json()

    try {
        const findCourseById = await db.select().from(Course).where(eq(Course.id, id))

        if (findCourseById.length === 0) {
            return NextResponse.json({ message: "No course found" })
        }

        return NextResponse.json({ success: true, message: "Course found", course: findCourseById })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ success: false, message: "Something went wrong" })

    }
}

export async function PATCH(req: NextRequest) {
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
        id, coursePrice
    } = await req.json()

    try {
        const update = await db.update(Course).set({
            courseDescription,
            courseDuration,
            courseEndDate,
            courseHeading,
            courseImageURL,
            courseInstrutor: courseInstructor,
            courseName,
            courseShortDescription,
            courseStartDate,
            courseVideoURL,
            studentCapacity,
            coursePrice
        }).where(eq(Course.id, id)).returning()

        if (!update) {
            return NextResponse.json({ success: false, message: "Update failed" })
        }
        return NextResponse.json({ success: true, message: "Update success" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong." })
    }
}