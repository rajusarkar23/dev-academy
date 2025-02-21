import { db } from "@/lib/db/db"
import { generateOTP } from "@/lib/generate-otp"
import { Order } from "@/lib/schema/schema"
import { NextResponse } from "next/server"


export async function POST(req: NextResponse) {
    const { price, productId, studentId } = await req.json()
    
    const uniqueOrderIdentifier = generateOTP(12)

    try {
        const createOrder = await db.insert(Order).values({
            courseAmount: price,
            courseId: productId,
            student: studentId,
            uniqueOrderIdentifier
        }).returning()

        if (createOrder.length === 0) {
            return NextResponse.json({
                success: false, message: "Unable to create order, please try again"
            })
        }

        return NextResponse.json({
            success: true, message: "Order created successfully", uniqueId: createOrder[0].uniqueOrderIdentifier
        })
    } catch (error) {
        console.log(error);

    }
}