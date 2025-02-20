import { db } from "@/lib/db/db";
import { Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { studentId } = await req.json()

    try {
        console.log("ran");
        
        const findStudentById = await db.select().from(Student).where(eq(Student.id, studentId));
        if (findStudentById.length === 0) {
            return NextResponse.json({ authenticated: false })
        }
        return NextResponse.json({ authenticated: true })
    } catch (error) {
        console.log(error);
    }
}