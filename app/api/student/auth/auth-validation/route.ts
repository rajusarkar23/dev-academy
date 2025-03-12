import { db } from "@/lib/db/db";
import { Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { studentId } = await req.json();

  try {
    const findStudentById = await db
      .select({
        name: Student.name,
        email: Student.email,
        profileImage: Student.profileImageUrl,
      })
      .from(Student)
      .where(eq(Student.id, studentId));
    if (findStudentById.length === 0) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      studentDetails: findStudentById,
    });
  } catch (error) {
    console.log(error);
  }
}
