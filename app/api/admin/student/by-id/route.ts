import { db } from "@/lib/db/db";
import { Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");

  try {
    const getstudent = await db
      .select()
      .from(Student)
      .where(eq(Student.id, Number(id)));

    if (getstudent.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No student found",
      });
    }

    return NextResponse.json({
      sucess: true,
      student: getstudent,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, try again",
    });
  }
}
