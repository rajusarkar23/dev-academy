import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db/db";
import { Course, Order, Student } from "@/lib/schema/schema";
import { eq} from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia"
})

export async function POST(req: NextRequest) {

    const { orderUniqueId, sessionId } = await req.json()

    const payment_intent = (await stripe.checkout.sessions.retrieve(sessionId)).payment_intent?.toString();

    try {
        await db.update(Order).set({
            paymentId: payment_intent
        }).where(eq(Order.uniqueOrderIdentifier, orderUniqueId)).returning()

        const paymentDetails = await stripe.paymentIntents.retrieve(payment_intent!.toString())

        if (paymentDetails.status === "succeeded") {
            await db.update(Order).set({
                isOrderPlaceSuccess: true,
                paymentSuccess: true
            }).where(eq(Order.uniqueOrderIdentifier, orderUniqueId))

            const getFullOrder = await db.select().from(Order).where(eq(Order.uniqueOrderIdentifier, orderUniqueId))
            const getCourse = await db.select().from(Course).where(eq(Course.id, getFullOrder[0].courseId))
            const courseId = getCourse[0].id
            await db.update(Course).set({
                studentCapacity: (Number(getCourse[0].studentCapacity) - 1).toString()
            }).where(eq(Course.id, getCourse[0].id)).returning()

            const student = await db.select().from(Student).where(eq(Student.id, getFullOrder[0].student))
            const enroll = student[0].enrollments

            if (enroll.length !== 0) {
                const newEnroll = [...enroll, courseId]
                await db.update(Student).set({
                    enrollments: newEnroll
                }).where(eq(Student.id, getFullOrder[0].student))

                return NextResponse.json({ success: true, message: "Payment done successfully." })
            } else{
                await db.update(Student).set({
                    enrollments: [courseId]
                }).where(eq(Student.id, getFullOrder[0].student))
                return NextResponse.json({ success: true, message: "Payment done successfully." })
            }
        }

        return NextResponse.json({ success: false, message: "Payment failed." })

    } catch (error) {
        console.log(error);
    }

}