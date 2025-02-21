"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function createOrder({ price, productId }: { price: string, productId: string }) {

     const cookie = (await cookies()).get("session")?.value;
    
        if (!cookie) {
            return { authenticated: false, message: "No cookie available" }
        }
    
        const verify = jwt.verify(cookie, `${process.env.SESSION_FOR_STUDENT}`)
        //@ts-expect-error, student id is there
        const userId = verify.studentId
        console.log(userId);
    
        if (typeof userId === "undefined") {
            return
        }


    const res = await fetch("http://localhost:3000/api/checkout/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ price, productId, studentId: userId })
    })

    const data = await res.json()

    console.log(data);
    return
}