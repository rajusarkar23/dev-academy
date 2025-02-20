import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { Admin } from "@/lib/schema/schema";
import { db } from "@/lib/db/db";
import OTPCookie from "@/lib/cookie-session/otp-session";

export async function POST(req: NextRequest) {
    const { otp } = await req.json()
    const user = await OTPCookie()

    console.log(user);


    if (!user || !otp) {
        return NextResponse.json({ success: false, message: "otp or the session is not valid." })
    }

    const findAdmin = await db.select().from(Admin).where(eq(Admin.id, user))

    if (findAdmin.length === 0) {
        return NextResponse.json({ success: false, message: "User not found." })
    }

    const getOtpFromDb = findAdmin[0].otp;

    const compare = bcrypt.compareSync(otp, getOtpFromDb)
    if (!compare) {
        return NextResponse.json({ success: false, message: "Wrong OTP." })
    }

    const update = await db.update(Admin).set({ isVerified: true }).where(eq(Admin.id, user)).returning()

    if (!update[0].isVerified) {
        return NextResponse.json({ success: false, message: "Something went wrong in verifying this account, try again." })
    }

    const jwt_token = jwt.sign({ userId: update[0].id }, `${process.env.SESSION_FOR_ADMIN}`);

    (await cookies()).set("a_session", jwt_token, { maxAge: 30 * 24 * 60 * 60, expires: 30 * 24 * 60 * 60, httpOnly: true })

    return NextResponse.json({ success: true, message: "Verified successfully." })
}