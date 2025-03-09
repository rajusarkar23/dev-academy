import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { db } from "@/lib/db/db";
import { Admin } from "@/lib/schema/schema";
import { generateOTP } from "@/lib/generate-otp";
import { otpVerifyEmail } from "@/lib/emails/otp-verification-email";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    if (!email || !password) {
        return NextResponse.json({ success: false, message: "Email?/Password not defined." })
    }

    try {
        const checkIfAdminExist = await db.select().from(Admin).where(eq(Admin.email, email));

        if (checkIfAdminExist.length !== 0) {
            return NextResponse.json({ success: false, message: "This email is already registered." });
        }

        // password encrypt
        const hashedPassword = bcrypt.hashSync(password, 10);

        // otp encrypt
        const otp = generateOTP(6);
        const hashedOTP = bcrypt.hashSync(otp, 10);

        //create user
        const insertAdmin = await db.insert(Admin).values({
            email,
            password: hashedPassword,
            otp: hashedOTP
        }).returning();

        if (insertAdmin.length === 1) {
            console.log(otp);
            otpVerifyEmail(otp, email);
            // send mail
            console.log(insertAdmin[0].id);

            // genaret jwt
            const jwt_token = jwt.sign({ userId: insertAdmin[0].id }, `${process.env.OTP_VERIFY_SESSION}`);

            (await cookies()).set("v_session", jwt_token, {
                maxAge: 30 * 24 * 60 * 60,
                httpOnly: true
            });
            // return response            
            return NextResponse.json({ success: true, message: "Admin registered." });
        }
        return NextResponse.json({ success: false, message: "Something went wrong in admin creation, try agin." });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong, try agin." });
    }

}