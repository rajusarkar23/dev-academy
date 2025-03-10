"use client";

import { Chip } from "@heroui/chip";
import { ArrowRight, CalendarCheck, Clock, LoaderCircle, UserPen } from "lucide-react";
import Image from "next/legacy/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { createOrder } from "@/app/actions/order/create-order/action";
import { Spinner } from "@heroui/spinner";

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
  slug: string;
  coursePrice: string;
}

export default function CoursesBySlug() {
  const [course, setCourse] = useState<course[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderClicked, setOrderClicked] = useState(false);
  const [courseExists, setCourseExists] = useState(false);
  const router = useRouter()

  const slug = useParams().slug;

  const getCourseById = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/page/courses/by-slug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      const response = await res.json();

      if (response.success === true) {
        setCourse(response.course);
        setLoading(false);
      } else {
        console.log(response);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const checkIfCourseExistOnStudentEnrollments = async () => {
    try {
      const res = await fetch(
        "/api/student/check-if-student-already-enrolled",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        }
      );

      const response = await res.json();
      if (response.success === true) {
        setCourseExists(true);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = async () => {
    setOrderClicked(true);
    await createOrder({
      price: course[0].coursePrice,
      productId: course[0].id,
    });
  };

  useEffect(() => {
    getCourseById();
    checkIfCourseExistOnStudentEnrollments();
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center min-h-screen py-5">
          <LoaderCircle className="animate-spinner-ease-spin" size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950">
      {course.map((item) => (
        <div
          className="sm:flex sm:justify-between space-x-6 p-4 mx-auto max-w-7xl"
          key={item.id}
        >
          {/* for left side */}
          <div>
            <div className="bg-white/80 rounded">
              <div className="p-4">
                <Image
                  src={item.courseImageURL}
                  alt={item.courseName}
                  width={700}
                  height={500}
                  className="rounded"
                />
                <div className="bg-white px-2 rounded">
                  <div>
                    <div className="p-2 space-y-2">
                      <p className="text-black text-xl font-bold">
                        Course name:{" "}
                        <span className="text-blue-500">{item.courseName}</span>
                      </p>
                      <p className="text-black text-xl font-bold">
                        Course fees:{" "}
                        <span className="text-blue-500">
                          INR {item.coursePrice}
                        </span>
                      </p>
                      <p className="text-black text-xl font-bold">
                        Available seats:{" "}
                        <span className="text-red-500">
                          {item.studentCapacity}
                        </span>
                      </p>
                      <div>
                        {courseExists ? (
                          <Button
                            color="secondary"
                            className="w-full font-bold"
                            onPress={() => {
                              router.replace("/profile/enrollments")
                            }}
                          >
                            You are already enrolled in this, Go to dashboard <ArrowRight />
                          </Button>
                        ) : (
                          <div>
                            {orderClicked ? (
                              <Button disabled className="w-full">
                                <Spinner />
                              </Button>
                            ) : (
                              <Button
                                className="w-full font-bold"
                                color="primary"
                                onPress={handlePress}
                              >
                                Book your seat
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-2 mt-2 sm:mt-0">
              <div>
                {loading ? (
                  <Skeleton className="rounded-full bg-blue-400/20">
                    <p>loading....</p>
                  </Skeleton>
                ) : (
                  <p className="text-2xl font-bold">{item.courseHeading}</p>
                )}
              </div>
              <p className="text-gray-400 font-bold">
                {item.courseShortDescription}
              </p>
              <div className="space-x-1">
                <Chip
                  startContent={<UserPen size={22} className="text-white/60" />}
                  variant="flat"
                  color="primary"
                  className="px-2"
                >
                  <p className="font-semibold text-white/60">
                    {item.courseInstrutor}
                  </p>
                </Chip>
                <Chip
                  startContent={<Clock size={22} className="text-white/60" />}
                  variant="flat"
                  color="primary"
                  className="px-2"
                >
                  <p className="font-semibold text-white/60">
                    {item.courseDuration}
                  </p>
                </Chip>
                <Chip
                  startContent={
                    <CalendarCheck size={22} className="text-white/60" />
                  }
                  variant="flat"
                  color="primary"
                  className="px-2"
                >
                  <p className="font-semibold text-white/60">
                    {item.courseStartDate}
                  </p>
                </Chip>
              </div>

              <div className="mx-auto max-w-3xl">
                <div
                  className=" [&>ul]:list-disc [&>ul]:pl-6 max-w-[700px]"
                  dangerouslySetInnerHTML={{
                    __html: item.courseDescription.replace(
                      /<p>\s*<\/p>/g,
                      "<br>"
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          {/* for right side */}
        </div>
      ))}
    </div>
  );
}

// later i will fetch courses by slug
