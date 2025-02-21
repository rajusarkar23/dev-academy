import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function studentSession() {
      const cookie = (await cookies()).get("session")?.value;
      console.log(cookie);
      
        
            if (!cookie) {
                return { authenticated: false, message: "No cookie available" }
            }
        
            const verify = jwt.verify(cookie, `${process.env.SESSION_FOR_STUDENT}`)
            //@ts-expect-error, student id is there
            const userId = verify.studentId
            console.log(userId);
        
            if (typeof userId === "undefined") {
                return
            }

            return userId
}