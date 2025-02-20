import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function studentSession() {
    const cookie = (await cookies()).get("session")?.value

    if (!cookie) {
        return "No session available"
    }

    const decode = jwt.verify(cookie, `${process.env.SESSION_FOR_STUDENT}`)
    //@ts-expect-error,i know value is there
    const studentId = decode.userId

    return studentId
}