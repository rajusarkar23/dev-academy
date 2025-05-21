import { db } from "@/lib/db/db";
import { Videos } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    const url = req.nextUrl

    const id  = url.searchParams.get("id")

    try {
        const deleteAVideo = await db.delete(Videos).where(eq(Videos.id, Number(id))).returning()

        if (deleteAVideo.length !== 1) {
            return NextResponse.json({
                success: false,
                message: "Unable to delete this videp,"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Video deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        })
    }
}