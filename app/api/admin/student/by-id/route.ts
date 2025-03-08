import { db } from "@/lib/db/db";
import { Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const params = req.nextUrl.searchParams
    console.log(params.get("id"));
    const id = params.get("id")

    try {
        const getstudent = await db.select().from(Student).where(eq(Student.id, Number(id)))

        console.log(getstudent);
        return NextResponse.json({getstudent})
    } catch (error) {
        
    }
    
    return NextResponse.json({id: params.get("id")})
}