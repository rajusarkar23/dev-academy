"use client";

import { deleteCourse } from "@/app/actions/delete-course/action";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/react";
import Image from "next/legacy/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Course {
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
  coursePrice: string;
  createdBy: string;
  id: string;
  studentCapacity: string;
}

export default function SingleCourse() {
  const [course, setCourse] = useState<Course[]>([]);
  const router = useRouter();

  const id = useParams().id;
  const getCourseById = async () => {
    try {
      const res = await fetch("/api/admin/course/by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const response = await res.json();

      if (response.success === true) {
        setCourse(response.course);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseById();
  }, []);

  const handleEditButtonClick = () => {
    router.push(`/admin/dashboard/courses/edit/${course[0].id}`);
  };

  const handleDelete = async () => {
    const data = await deleteCourse(Number(id));
    if (data.success === true) {
      router.push("/admin/dashboard/all-courses")
    }
    
  };

  return (
    <div>
      {course.map((items) => (
        <div key={items.id}>
          <div className="flex space-x-4">
            <div className="space-y-2">
              <Image
                src={items.courseImageURL}
                alt={items.courseName}
                width={500}
                height={500}
                className="rounded border"
              />
              <div className="flex justify-center gap-4">
                <Button className="w-full font-bold" color="danger" onPress={handleDelete}>Delete</Button>
                <Button className="w-full font-bold" color="success" onPress={handleEditButtonClick}>Edit</Button>
              </div>
            </div>

            <div>
              <div className="mx-auto max-w-xl space-y-2">
                <h2 className="text-3xl font-bold">{items.courseName}</h2>
                <h3><span className="text-gray-300 font-bold">Heading: </span> {items.courseHeading}</h3>
                <div className="space-x-1">
                  <Chip><p className="font-bold">Price: {items.coursePrice}</p></Chip>
                  <Chip><p className="font-bold">Start: {items.courseStartDate}</p></Chip>
                  <Chip><p className="font-bold">End: {items.courseEndDate}</p></Chip>
                </div>
                <p><span className="text-gray-300 font-bold">Short description: </span>{items.courseShortDescription}</p>
                <div><span className="text-gray-300 font-bold">Description: </span>
                <div
                  className=" [&>ul]:list-disc [&>ul]:pl-6 max-w-[700px]"
                  dangerouslySetInnerHTML={{
                    __html: items.courseDescription.replace(
                      /<p>\s*<\/p>/g,
                      "<br>"
                    ),
                  }}
                />
              
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
