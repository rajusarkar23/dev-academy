import { db } from "@/lib/db/db";
import { Videos } from "@/lib/schema/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const data = await req.json()

    try {
        const addVideo = await db.insert(Videos).values({
            courseRef: data.courseId,
            videoOrder: data.videoOrder,
            videoTitle: data.title,
            videoUrl: data.videoUrl
        }).returning()

        if (addVideo.length !== 1) {
            return NextResponse.json({
                success: false,
                message: "Unable to add video in db"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Video added successfully"
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        })
    }
    
}