"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation";

export async function createOrder({ price, productId }: { price: string, productId: string }) {

     const cookie = (await cookies()).get("session")?.value;

     console.log(cookie);
     
    
        if (!cookie) {

            console.log("no cookie");
            
            return redirect("/auth/signin")
        }
    
        const verify = jwt.verify(cookie, `${process.env.SESSION_FOR_STUDENT}`)
        //@ts-expect-error, student id is there
        const userId = verify.studentId

        // if (typeof userId === "undefined") {
        //     console.log("ran");
            
        //     return
        // }


    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/checkout/create-order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ price, productId, studentId: userId })
    })

    const data = await res.json();
    (await cookies()).set("uupid", data.uniqueId, {maxAge: 60 * 60, expires: 60 * 60, httpOnly: true})
    if (data.success === true) {
        redirect(`/order-details/${data.uniqueId}`)
    }
    return
}