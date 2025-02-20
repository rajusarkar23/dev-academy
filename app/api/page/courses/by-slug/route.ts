import { db } from "@/lib/db/db";
import { Course } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { slug } = await req.json()

    if (typeof slug !== "string") {
        return NextResponse.json({ success: false, message: "Id should be integer type." })
    }

    try {
        const findCourseById = await db.select().from(Course).where(eq(Course.slug, slug))

        if (findCourseById.length === 0) {
            return NextResponse.json({ message: "No course found with this id." })
        }

        return NextResponse.json({ success: true, message: "Course found", course: findCourseById })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" })
    }
}