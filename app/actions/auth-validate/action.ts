"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function authValidate() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) {
    return { authenticated: false, message: "No cookie available" };
  }

  try {
    const verify = jwt.verify(cookie, `${process.env.SESSION_FOR_STUDENT}`);
    //@ts-expect-error, student id is there
    const userId = verify.studentId;

    const getUserLogin = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/student/auth/auth-validation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId: userId }),
      }
    );

    const data = await getUserLogin.json();
    return data;
  } catch (error) {
    console.log(error);
    const data = { authenticated: false };
    return data;
  }
}
