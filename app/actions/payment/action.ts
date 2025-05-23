"use server";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

export async function processOrder() {
  const cookie = (await cookies()).get("payment_session")?.value;

  if (!cookie) {
    return "Something went wrong in processing order.";
  }

  const verify = jwt.verify(cookie, `${process.env.PAYMENT_SESSION}`);
  //@ts-expect-error, sessionId is available
  const sessionId = verify.sessionId;
  //@ts-expect-error, orderId is available
  const orderUniqueId = verify.orderUniqueId;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/checkout/status`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, orderUniqueId }),
    }
  );

  const data = await res.json();
  return data;
}
