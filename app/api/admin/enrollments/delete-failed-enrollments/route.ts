import { db } from "@/lib/db/db";
import { Order } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");

  try {
    await db.delete(Order).where(eq(Order.id, Number(id)));
    return NextResponse.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again..",
    });
  }
}
