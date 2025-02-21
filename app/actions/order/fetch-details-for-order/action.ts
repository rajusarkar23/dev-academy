import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function fetchDetailsForOrder(){

     const cookie = (await cookies()).get("session")?.value;
        
            if (!cookie) {
                return { authenticated: false, message: "No cookie available" }
            }
        
            const verify = jwt.verify(cookie, `${process.env.SESSION_FOR_STUDENT}`)
            //@ts-expect-error, student id is there
            const userId = verify.studentId
            // console.log(userId);
        
            if (typeof userId === "undefined") {
                return "No user, undefined"
            }
    
    const productUUID = (await cookies()).get("uupid")?.value

    const res = await fetch("http://localhost:3000/api/checkout/fetch-product-and-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productUUID, studentId: userId })
    })

    const data = await res.json()

    console.log(data);
    
    

}



// user email
// prouct

// fetch-product-and-user