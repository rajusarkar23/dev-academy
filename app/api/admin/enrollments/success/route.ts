import { db } from "@/lib/db/db";
import { Order, Student } from "@/lib/schema/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getFailedEnrollments = await db.select({courseId: Order.courseId, studentId: Order.student}).from(Order).where(eq(Order.paymentSuccess, false))

        if (getFailedEnrollments.length === 0) {
            return NextResponse.json({success: false, message: "No enrollments found."})
        }  

        return NextResponse.json({success: true, message: "Enrollments fethced", enrollments: getFailedEnrollments})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Something went wrong, please try again.."})
    }
}

// student name
// course id => course name
// created at