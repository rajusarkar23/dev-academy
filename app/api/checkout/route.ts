import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { studentSession } from "@/lib/cookie-session/student-session";
import { db } from "@/lib/db/db";
import { Order } from "@/lib/schema/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-01-27.acacia'
})

export async function POST(req: NextRequest) {
    const {
        product,
        price,
        successUrl,
        cancelUrl
    } = await req.json()

    const studentId = await studentSession()

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: "rajusarkar@mail.com",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `${product}`
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1
                }
            ],
            success_url: successUrl,
            cancel_url: cancelUrl
        })
        

        const createOrder = await db.insert(Order).values({
            courseId: product,
            courseAmount: price,
            paymentSessionId: session.id,
            student: studentId,
        }).returning()

        const paymentSessionJWT = jwt.sign({
            sessionId: session.id, orderId: createOrder[0].id
        }, `${process.env.PAYMENT_SESSION}`);

        (await cookies()).set("payment_session", paymentSessionJWT, {
            maxAge: 30 * 24 * 60 * 60, httpOnly: true
        })

        return NextResponse.json({ url: session.url, paymentIntent: session.payment_intent });
    } catch (error) {
        console.log(error);

    }

}