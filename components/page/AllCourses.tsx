"use client"
import { ChevronLeft, ChevronRight, User, UserPen } from "lucide-react"
import Image from "next/legacy/image"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { useRef } from "react"
import Link from "next/link"


interface Course {
    id: number
    title: string
    description: string
    instructor: string
    students: number
    logo: string
}
const courses: Course[] = [
    {
        id: 1,
        title: "Node.js mastery with 10 projects",
        description:
            "Learn Node.js with projects.",
        instructor: "Hitesh Choudhary",
        students: 5000,
        logo: "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/allcourses.jpg",
    },
    {
        id: 2,
        title: "Complete react for beginners",
        description:
            "Dive into React fundamentals and advanced topics through hands-on projects.",
        instructor: "Hitesh Choudhary",
        students: 20000,
        logo: "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/allcourses.jpg",
    },
    {
        id: 3,
        title: "Learn Docker with Project",
        description: "Learn Containers in practical way",
        instructor: "Hitesh Choudhary",
        students: 10000,
        logo: "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/allcourses.jpg",
    },
    {
        id: 4,
        title: "Kuberbetes with Project for beginners",
        description: "Learn Containers in practical way",
        instructor: "Hitesh Choudhary",
        students: 10000,
        logo: "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/allcourses.jpg",
    },
    {
        id: 5,
        title: "Chai aur Django in Hindi",
        description: "Learn Django in Hindi",
        instructor: "Hitesh Choudhary",
        students: 1000,
        logo: "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/allcourses.jpg",
    },
]

export default function AllCourses() {
    //@ts-expect-error - right now i don't know the type for useref
    const swiperRef = useRef<SwiperType>()


    return (
        <div className="p-4">
            <div className="mx-auto max-w-7xl space-y-3">
                <div className="space-y-4">
                    <p className="inline-flex items-center rounded-full bg-blue-500/40 px-4 py-1 text-sm text-white/80 font-semibold border border-green-300/70">All courses</p>
                    <h2 className="text-4xl">Explore More Coding Courses</h2>
                    <p className=" text-gray-400">Discover a variety of coding courses tailored for you.</p>
                </div>
                <div>
                    <div className="relative">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={24}
                            slidesPerView={"auto"}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper
                            }}
                        >
                            {courses.map((course) => (
                                <SwiperSlide key={course.id} className="!w-[300px]">
                                    <div className="bg-gradient-to-br from-black to-blue-900/40 rounded-lg overflow-hidden h-[450px]">
                                        <div className="relative w-full h-40">
                                            <Image
                                                src={course.logo}
                                                alt={course.logo}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="mt-4 space-y-2 flex flex-col justify-center items-center">
                                            <p className="text-3xl text-center">{course.title}</p>
                                            <p className="flex justify-center items-center text-sm text-gray-400"><UserPen size={18} className="mr-1" />Instructure: {course.instructor}</p>
                                            <p className="text-center">{course.description}</p>
                                            <p className="flex text-gray-400"><User />Students: {course.students}</p>
                                        </div>
                                        <div className="inset-x-0 bottom-0 absolute h-12 justify-center flex">
                                            <div className="space-x-4">
                                            <Link href={"/"} className="px-6 py-2 bg-blue-500 rounded-lg font-bold">Join</Link>
                                            <Link className="px-6 py-2 bg-gray-700 rounded-lg font-bold" href={"/"}>Learn</Link>
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
    )
}