import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { generateOTP } from "@/lib/generate-otp";
import { otpVerifyEmail } from "@/lib/emails/otp-verification-email";

import { db } from "@/lib/db/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { Student } from "@/lib/schema/schema";
export async function POST(req: NextRequest) {
    const { email, password, name } = await req.json()

    if (!email || !password) {
        return NextResponse.json({ success: false, message: "Email?/Password not defined." })
    }

    try {
        const checkIfStudentExist = await db.select().from(Student).where(eq(Student.email, email));

        if (checkIfStudentExist.length !== 0) {
            return NextResponse.json({ success: false, message: "This email is already registered." });
        }

        // password encrypt
        const hashedPassword = bcrypt.hashSync(password, 10);

        // otp encrypt
        const otp = generateOTP(6);
        const hashedOTP = bcrypt.hashSync(otp, 10);

        //create user
        const insertStudent = await db.insert(Student).values({
            name,
            email,
            password: hashedPassword,
            otp: hashedOTP,
        }).returning();

        if (insertStudent.length === 1) {
            console.log(otp);

            otpVerifyEmail(otp, email)
            // send mail
            // genaret jwt
            const jwt_token = jwt.sign({ userId: insertStudent[0].id }, `${process.env.OTP_VERIFY_SESSION}`);

            (await cookies()).set("v_session", jwt_token, {
                maxAge: 30 * 24 * 60 * 60,
                httpOnly: true
            });
            // return response            
            return NextResponse.json({ success: true, message: "Student registered." });
        }
        return NextResponse.json({ success: false, message: "Something went wrong in admin creation, try agin." });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong, try agin." });
    }

}