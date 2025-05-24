import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookie = cookies();
    (await cookie).delete("session")
    return NextResponse.json({message: "logout"})
}