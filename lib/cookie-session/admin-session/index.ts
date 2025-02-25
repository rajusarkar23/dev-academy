import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function adminSession() {
  const session = false;

  const cookie = (await cookies()).get("a_session")?.value;

  if (!cookie) {
    return session;
  }

  const decode = jwt.verify(cookie, `${process.env.SESSION_FOR_ADMIN}`);

  //@ts-expect-error there is userId i know
  const userId = decode.userId;
  //@ts-expect-error, name is available
  const name = decode.name;

  return { adminDetails: {
    id: userId,
    name: name
  }};
}
