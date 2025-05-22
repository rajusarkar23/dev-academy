import { db } from "@/lib/db/db";
import { Course, Videos } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const url = req.nextUrl

    const slug = url.searchParams.get("slug")

    try {
        const fetchVideoByVideoRef = await db.select({videoUrl: Videos.videoUrl, videoOrder: Videos.videoOrder, title: Videos.videoTitle, videoId: Videos.id, courseName: Course.courseName}).from(Videos).where(eq(Videos.courseRef, Course.id)).leftJoin(Course, eq(Course.slug, slug!))
        if (fetchVideoByVideoRef.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No video found for this course"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Videos found",
            videos: fetchVideoByVideoRef
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        })
    }
    
}