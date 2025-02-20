"use client"

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { UserPen } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import PlaceOrderBtn from "../checkout/PlaceOrderBtn";

interface course {
    courseDescription: string,
    courseDuration: string,
    courseEndDate: string,
    courseHeading: string,
    courseImageURL: string,
    courseInstrutor: string,
    courseName: string,
    courseShortDescription: string,
    courseStartDate: string,
    courseVideoURL: string,
    createdBy: string,
    id: string,
    studentCapacity: string,
    slug: string,
    coursePrice: string
}

export default function CoursesBySlug() {

    const [course, setCourse] = useState<course[]>([])
    console.log(course);

    const slug = useParams().slug


    const getCourseById = async () => {
        try {
            const res = await fetch("/api/page/courses/by-slug", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ slug })
            })

            const response = await res.json()

            if (response.success === true) {
                setCourse(response.course)
            } else {
                console.log(response);
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getCourseById()
    }, [])
    return (
        <div>
            {
                course.map((item) => (
                    <div className="flex justify-between space-x-2 p-4 mx-auto max-w-4xl" key={item.id}>
                        {/* for left side */}
                        <div>
                            <div>
                                <p className="text-2xl font-bold">{item.courseHeading}</p>
                                <p className="text-gray-400 font-bold">{item.courseShortDescription}</p>
                                <div>
                                    <Chip startContent={<UserPen size={20} />} variant="flat" color="success">{item.courseInstrutor}</Chip>
                                </div>

                                <div className="mx-auto max-w-3xl">
                                    <div className=" [&>ul]:list-disc [&>ul]:pl-6 max-w-[700px]" dangerouslySetInnerHTML={{ __html: item.courseDescription.replace(/<p>\s*<\/p>/g, "<br>") }} />
                                </div>
                            </div>
                        </div>
                        {/* for right side */}
                        <div>
                            <div className="flex flex-col justify-center items-center border bg-gradient-to-br from-gray-900 to-red-900 rounded">
                                <Image src={item.courseImageURL} alt={item.courseName} height={300} width={300} className="p-4 rounded-xl" />
                                <p className="text-2xl font-bold text-white/80">{item.courseName}@{item.coursePrice}</p>
                                <div className="px-4 w-full mb-4 mt-4">
                                    <PlaceOrderBtn price={item.coursePrice} product={item.id}/>
                                </div>

                            </div>



                        </div>
                    </div>
                ))
            }
        </div>
    )
}

// later i will fetch courses by slug