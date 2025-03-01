"use client";

import { deleteCourse } from "@/app/actions/delete-course/action";
import { Button } from "@heroui/button";
import { Chip, Input, Spinner } from "@heroui/react";
import Image from "next/legacy/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ReactPlayer from "react-player";

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
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const id = useParams().id;
  const getCourseById = async () => {
    try {
      setLoading(true)
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
    getCourseById();
  }, []);

  const handleEditButtonClick = () => {
    router.push(`/admin/dashboard/courses/edit/${course[0].id}`);
  };

  const handleDelete = async () => {
    const data = await deleteCourse(Number(id));
    if (data.success === true) {
      router.push("/admin/dashboard/all-courses");
    }
  };


  if (loading) {
    return(
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <Spinner size="lg" color="white"/>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      {course.map((items) => (
        <div key={items.id}>
          <div className="sm:flex space-x-4 space-y-2 px-4">
            <div className="space-y-2">
              <Image
                src={items.courseImageURL}
                alt={items.courseName}
                width={800}
                height={500}
                className="rounded border"
              />
              <div className="flex justify-center gap-4">
                <Button
                  className="w-full font-bold"
                  color="danger"
                  onPress={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  className="w-full font-bold"
                  color="success"
                  onPress={handleEditButtonClick}
                >
                  Edit
                </Button>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-5xl font-bold">Videos:</p>
                <div>
                  <p className="font-bold text-gray-400">
                    You can upload video from here:
                  </p>

                  <div>
                    <Input type="file" className="w-64" />
                  </div>
                </div>

                <div>
                  <p className="font-bold">Uploaded videos for this course:</p>

                  <ReactPlayer
                    url="https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/18872865-hd_1920_1080_30fps.mp4" // Change this to your MKV file URL
                    playing={false}
                    controls
                    width="700px"
                    height="500px"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="mx-auto max-w-xl space-y-2">
                <h2 className="text-3xl font-bold">{items.courseName}</h2>
                <h3>
                  <span className="text-gray-300 font-bold">Heading: </span>{" "}
                  {items.courseHeading}
                </h3>
                <div className="space-x-1">
                  <Chip>
                    <p className="font-bold">Price: {items.coursePrice}</p>
                  </Chip>
                  <Chip>
                    <p className="font-bold">Start: {items.courseStartDate}</p>
                  </Chip>
                  <Chip>
                    <p className="font-bold">End: {items.courseEndDate}</p>
                  </Chip>
                </div>
                <p>
                  <span className="text-gray-300 font-bold">
                    Short description:
                  </span>
                  {items.courseShortDescription}
                </p>
                <div>
                  <span className="text-gray-300 font-bold">Description: </span>
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
