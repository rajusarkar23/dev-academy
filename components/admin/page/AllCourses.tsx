"use client";

import { Chip, Spinner } from "@heroui/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface course {
  courseDescription: string;
  courseDuration: string;
  courseEndDate: string;
  courseHeading: string;
  courseImageURL: string;
  courseInstrutor: string;
  courseName: string;
  courseShortDescription: string;
  courseStartDate: string;
  courseVideoURL: string;
  createdBy: string;
  id: string;
  studentCapacity: string;
}

export default function AllCoursesComp() {
  const [courses, setCourses] = useState<course[]>([]);
  const [loading, setLoading] = useState(false)

  

  const getAllCourses = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/course", {
        method: "GET",
      });

      const response = await res.json();
      if (response.success === true) {
        setCourses(response.courses);
        setLoading(false)
      } else {
        console.log(response);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  if (loading) {
    return(
      <div className="flex justify-center items-center min-h-[90vh]">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mx-auto max-w-5xl p-6">
      {courses.map((items) => (
        <div
          key={items.id}
          className="bg-zinc-800 rounded p-4 flex items-center justify-center hover:scale-95 transition-all hover:bg-zinc-700 "
        >
          <Link href={`/admin/dashboard/courses/${items.id}`} className="space-y-2">
            <Image
              src={items.courseImageURL}
              alt={items.courseName}
              width={600}
              height={400}
              className="rounded"
            />
            <p className="mt-2 text-xl">{items.courseName}</p>
            <div>
              <Chip>
                <p className="font-semibold"> Enrolled: {200 - Number(items.studentCapacity)}</p>
              </Chip>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
