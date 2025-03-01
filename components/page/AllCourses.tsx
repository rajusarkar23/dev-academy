"use client";
import { ChevronLeft, ChevronRight, Loader, User, UserPen } from "lucide-react";
import Image from "next/legacy/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  seats: number;
  image: string;
}

export default function AllCourses() {
  //@ts-expect-error - right now i don't know this type for useref
  const swiperRef = useRef<SwiperType>();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false)

  const getCourses = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/page/courses", {
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
    }
  };

  useEffect(() => {
    getCourses();
  }, []);


  if (loading) {
    return(
      <div>
        <div className="flex justify-center py-5">
          <Loader className="animate-spinner-ease-spin" size={50}/>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mx-auto max-w-7xl space-y-3">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-blue-500/40 px-4 py-1 text-sm text-white/80 font-semibold border border-green-300/70">
            All courses
          </p>
          <h2 className="text-4xl">Explore More Coding Courses</h2>
          <p className=" text-gray-400">
            Discover a variety of coding courses tailored for you.
          </p>
        </div>
        <div>
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={"auto"}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {courses.map((course) => (
                <SwiperSlide key={course.id} className="!w-[300px]">
                  <div className="bg-gradient-to-br from-black to-blue-900/40 rounded-lg overflow-hidden h-[480px]">
                    <div className="relative w-full h-40">
                      <Image
                        src={course.image}
                        alt={course.image}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="mt-4 space-y-2 flex flex-col justify-center items-center">
                      <p className="text-3xl text-center">{course.title}</p>
                      <p className="flex justify-center items-center text-sm text-gray-400">
                        <UserPen size={18} className="mr-1" />
                        Instructure: {course.instructor}
                      </p>
                      <p className="text-center">{course.description}</p>
                      <p className="flex text-gray-400">
                        <User />
                        Seats available: {course.seats}
                      </p>
                    </div>
                    <div className="inset-x-0 bottom-0 absolute h-12 justify-center flex">
                      <div className="space-x-4">
                        <Link
                          href={"/"}
                          className="px-6 py-2 bg-blue-500 rounded-lg font-bold"
                        >
                          Join
                        </Link>
                        <Link
                          className="px-6 py-2 bg-gray-700 rounded-lg font-bold"
                          href={"/"}
                        >
                          Learn
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex gap-2 absolute mt-2 right-4 z-10">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="bg-blue-500 hover:bg-gray-700 p-2 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="bg-blue-500 hover:bg-gray-700 p-2 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
