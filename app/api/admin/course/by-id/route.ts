import { db } from "@/lib/db/db";
import { Course } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// get a course by id
export async function POST(req: NextRequest) {
  const { id } = await req.json();

  try {
    const findCourseById = await db
      .select()
      .from(Course)
      .where(eq(Course.id, id));

    if (findCourseById.length === 0) {
      return NextResponse.json({success: false, message: "No course found" });
    }

    return NextResponse.json({
      success: true,
      message: "Course found",
      course: findCourseById,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// update a course by id
export async function PATCH(req: NextRequest) {
  const {
    courseName,
    courseHeading,
    courseShortDescription,
    courseInstructor,
    courseDuration,
    courseStartDate,
    courseEndDate,
    studentCapacity,
    courseDescription,
    courseImageURL,
    courseVideoURL,
    id,
    coursePrice,
  } = await req.json();

  try {
    const update = await db
      .update(Course)
      .set({
        courseDescription,
        courseDuration,
        courseEndDate,
        courseHeading,
        courseImageURL,
        courseInstrutor: courseInstructor,
        courseName,
        courseShortDescription,
        courseStartDate,
        courseVideoURL,
        studentCapacity,
        coursePrice,
      })
      .where(eq(Course.id, id))
      .returning();

    if (!update) {
      return NextResponse.json({ success: false, message: "Update failed" });
    }
    return NextResponse.json({ success: true, message: "Update success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}

// delete a courxe by id
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "Id is required to delete",
    });
  }

  try {
    const deleteCourse = await db.delete(Course).where(eq(Course.id, id));

    if (deleteCourse.length !== 0) {
      return NextResponse.json({
        success: false,
        message: "Unable to delete this course",
      });
    }
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
// NOT IN USE ANYMORE
// export async function GET(req: NextRequest) {
//   const params = req.nextUrl.searchParams;
//   const id = params.get("id");

//   try {
//     const getallCourse = await db
//       .select()
//       .from(Course)
//       .where(eq(Course.id, Number(id)));

//     if (getallCourse.length === 0) {
//       return NextResponse.json({
//         success: false,
//         message: "No course found with this ids",
//       });
//     }

//     return NextResponse.json({ success: true, courses: getallCourse });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong, try again",
//     });
//   }
// }
