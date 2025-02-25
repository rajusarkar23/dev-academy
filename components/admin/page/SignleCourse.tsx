"use client";

import { deleteCourse } from "@/app/actions/delete-course/action";
import { Button } from "@heroui/button";
import Image from "next/image";
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
    await deleteCourse(Number(id));
  };
  return (
    <div className="my-10">
      {course.map((items) => (
        <div key={items.id}>
          <div className="flex flex-col justify-between items-center">
            <div>
              <p>{items.courseName}</p>
              <p>{items.courseShortDescription}</p>
            </div>
            <div>
              <Image
                src={items.courseImageURL}
                alt={items.courseName}
                height={400}
                width={400}
                className="border rounded-lg"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                color="primary"
                className="font-bold"
                type="button"
                onPress={handleEditButtonClick}
              >
                Edit
              </Button>
              <Button
                color="danger"
                className="font-bold"
                type="button"
                onPress={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
