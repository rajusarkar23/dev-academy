import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export default async function OTPCookie() {

    const cookie = (await cookies()).get("v_session")?.value
    if (!cookie) {
        return NextResponse.json({ success: false, message: "Invalid session." })
    }
    const decode = jwt.verify(cookie, `${process.env.OTP_VERIFY_SESSION}`)
    if (!decode) {
        return NextResponse.json({ success: false, message: "Unable to decode jwt" })
    }
    //@ts-expect-error i know it has userId
    const userId = decode.userId;

    return userId;
}