import { db } from "@/lib/db/db";
import { failedOrderEmail } from "@/lib/emails/failed-order-email";
import { Order } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");
  const email = params.get("email");
  const name = params.get("name");
  const courseName = params.get("courseName");

  try {
    failedOrderEmail(email!, courseName!, name!);
    await db
      .update(Order)
      .set({
        orderFailedEmailSent: true,
      })
      .where(eq(Order.id, Number(id)));
    return NextResponse.json({
      success: true,
      message: "Email sent.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again...",
    });
  }
}
