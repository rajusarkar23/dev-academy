"use server";

// import { redirect } from "next/navigation";

export async function deleteCourse(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/course/by-id`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}
