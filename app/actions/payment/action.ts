"use server"
import { cookies } from "next/headers";

import jwt from "jsonwebtoken"

export async function processOrder() {

    const cookie = (await cookies()).get("payment_session")?.value;

    console.log(cookie);


    if (!cookie) {
        return "Something went wrong in processing order."
    }

    const verify = jwt.verify(cookie, `${process.env.PAYMENT_SESSION}`);
    //@ts-expect-error, sessionId is available
    const sessionId = verify.sessionId;
    //@ts-expect-error, orderId is available
    const orderId = verify.orderId;


    const res = await fetch("http://localhost:3000/api/checkout/status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId, orderId })
    })

    const data = await res.json()
    console.log(data);
    return data


}