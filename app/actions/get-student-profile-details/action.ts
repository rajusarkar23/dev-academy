"use server"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation";
export async function getProfileDetails(){
    const cookie = (await cookies()).get("session")?.value;

    if (!cookie) {
        return {message: "No session available"}
    }

    try {
        const verify  = jwt.verify(cookie, `${process.env.SESSION_FOR_STUDENT}`);
        //@ts-expect-error, studentId available
        const studentId = verify.studentId

        const get = await fetch("http://localhost:3000/api/student/get-user-details-by-id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({studentId})
        })

        const data = await get.json()
        return data
    } catch (error) {
        console.log(error);
        redirect("auth/signin")
    }


}