import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { db } from "@/lib/db/db";
import { Admin } from "@/lib/schema/schema";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    // if req fields are empty return err
    if (!email || !password) {
        return NextResponse.json({ success: false, message: "Password or email is not defined." })
    }

    try {
        // find 
        const findAdminByEmail = await db.select().from(Admin).where(eq(Admin.email, email))
        // if not found
        if (findAdminByEmail.length === 0) {
            return NextResponse.json({ success: false, message: "This email is not registered." })
        }
        // if found get the password
        const passwordFromDb = findAdminByEmail[0].password

        // compare it
        const compare = bcrypt.compareSync(password, passwordFromDb)
        // if comparison fails return err
        if (!compare) {
            return NextResponse.json({ success: false, message: "Invalid credentials." })
        }
        // if account not verified return err
        if (findAdminByEmail[0].isVerified === false) {
            return NextResponse.json({ success: false, message: "Account is not verified yet." })
        }
        // create jwt
        const jwt_token = jwt.sign({ userId: findAdminByEmail[0].id, name: findAdminByEmail[0].name }, `${process.env.SESSION_FOR_ADMIN}`);
        // set jwt
        (await cookies()).set("a_session", jwt_token, { maxAge: 30 * 24 * 60 * 60, expires: 30 * 24 * 60 * 60, httpOnly: true })
        // return success res
        return NextResponse.json({ success: true, message: "Login success." })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong, please try again." })
    }
}

// compare password