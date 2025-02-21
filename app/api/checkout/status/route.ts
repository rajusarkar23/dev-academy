import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db/db";
import { Order } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia"
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
        }

        return NextResponse.json({ success: true, message: "Payment done successfully." })
    } catch (error) {
        console.log(error);
    }

}