import { db } from "@/lib/db/db";
import { Course, Order, Student } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { studentId, productUUID } = await req.json()

    try {
        const order = await db.select().from(Order).where(eq(Order.uniqueOrderIdentifier, productUUID))
        if (order.length === 0) {
            return NextResponse.json({ success: false, message: "Order details not found" })
        }
        const productid = order[0].courseId

        const getProduct = await db.select().from(Course).where(eq(Course.id, productid))
        if (getProduct.length === 0) {
            return NextResponse.json({ success: false, message: "Order details not found" })
        }

        const findStudent = await db.select().from(Student).where(eq(Student.id, studentId))
        if (findStudent.length === 0) {
            return NextResponse.json({ success: false, message: "Student details not found" })

        }

        const orderDetails = { productTitle: getProduct[0].courseName, studentEmail: findStudent[0].email, price: getProduct[0].coursePrice }

        return NextResponse.json({ success: true, message: "Fetched", details: orderDetails })

    } catch (error) {
        console.log(error);
    }
}

// product

// studet