"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const dashboardUrl = "/admin/dashboard";
  const addNewCourseUrl = "/admin/dashboard/add-new";
  const allCoursesUrl = "/admin/dashboard/all-courses";
  const studentsUrl = "/admin/dashboard/students";
  const StudentEnrollments = "/admin/dashboard/failed-student-enrollments"

  return (
    <div className="w-60 bg-zinc-800 min-h-screen text-white p-4">
      <Link href={"/admin/dashboard"} className="text-2xl font-bold">
        Admin Dashboard
      </Link>

      <div className="mt-10 flex flex-col justify-center">
        <Link
          href={"/admin/dashboard"}
          className={`${
            pathname === dashboardUrl
              ? "bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1 text-blue-500"
              : "hover:bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href={"/admin/dashboard/add-new"}
          className={`${
            pathname === addNewCourseUrl
              ? "bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1 text-blue-500"
              : "hover:bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1"
          }`}
        >
          Add new course
        </Link>
        <Link
          href={"/admin/dashboard/all-courses"}
          className={`${
            pathname === allCoursesUrl
              ? "bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1 text-blue-500"
              : "hover:bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1"
          }`}
        >
          View all courses
        </Link>
        <Link
          href={"/admin/dashboard/students"}
          className={`${
            pathname === studentsUrl
              ? "bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1 text-blue-500"
              : "hover:bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1"
          }`}
        >
          Students
        </Link>

        <Link
          href={"/admin/dashboard/failed-student-enrollments"}
          className={`${
            pathname === StudentEnrollments
              ? "bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1 text-blue-500"
              : "hover:bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold border-b-1"
          }`}
        >
          Failed enrollments
        </Link>
      </div>
    </div>
  );
}
