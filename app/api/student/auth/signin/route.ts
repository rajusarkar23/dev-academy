import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { Student } from "@/lib/schema/schema";
import { db } from "@/lib/db/db";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    if (!email || !password) {
        return NextResponse.json({ success: false, message: "Password or email is not defined." })
    }

    try {
        const findAdminByEmail = await db.select().from(Student).where(eq(Student.email, email))
        if (findAdminByEmail.length === 0) {
            return NextResponse.json({ success: false, message: "This email is not registered." })
        }

        const passwordFromDb = findAdminByEmail[0].password

        const compare = bcrypt.compareSync(password, passwordFromDb)
        if (!compare) {
            return NextResponse.json({ success: false, message: "Invalid credentials." })
        }

        if (findAdminByEmail[0].isVerified === false) {
            return NextResponse.json({ success: false, message: "Account is not verified yet." })
        }

        const jwt_token = jwt.sign({ studentId: findAdminByEmail[0].id }, `${process.env.SESSION_FOR_STUDENT}`);

        (await cookies()).set("session", jwt_token, { maxAge: 30 * 24 * 60 * 60, expires: 30 * 24 * 60 * 60, httpOnly: true })

        return NextResponse.json({ success: true, message: "Login success." })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong, please try again." })
    }
}