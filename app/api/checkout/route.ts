import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { db } from "@/lib/db/db";
import { Order } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia'
})

export async function POST(req: NextRequest) {
    const {
        product,
        price,
        successUrl,
        cancelUrl,
        email,
        orderUniqueId
    } = await req.json()

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: email,
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


        await db.update(Order).set({
            paymentSessionId: session.id,
        }).where(eq(Order.uniqueOrderIdentifier, orderUniqueId)).returning()

        const paymentSessionJWT = jwt.sign({
            sessionId: session.id,
            orderUniqueId: orderUniqueId,
        }, `${process.env.PAYMENT_SESSION}`);

        (await cookies()).set("payment_session", paymentSessionJWT, {
            maxAge: 60 * 60, expires: 60 * 60, httpOnly: true
        })

        return NextResponse.json({ url: session.url, paymentIntent: session.payment_intent });
    } catch (error) {
        console.log(error);
    }

}