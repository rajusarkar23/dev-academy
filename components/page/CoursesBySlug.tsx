"use client"

import { Chip } from "@heroui/chip";
import { CalendarCheck, Clock, UserPen } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import PlaceOrderBtn from "../checkout/PlaceOrderBtn";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { createOrder } from "@/app/actions/order/create-order/action";

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
    const [loading, setLoading] = useState(false)

    const slug = useParams().slug


    const getCourseById = async () => {
        try {
            setLoading(true)
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
                setLoading(false)
            } else {
                console.log(response);
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }

    const handlePress = async () => {
        const order = await createOrder({
            price: course[0].coursePrice, productId: course[0].id
        })
        console.log(order);
        

    }

    useEffect(() => {
        getCourseById()
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950">
            {/* <div>
                {
                    loading ? (<Skeleton className="bg-blue-300/30"><p>Loading</p></Skeleton>) : (<h1>dvkjb</h1>)
                }

            </div> */}
            {
                course.map((item) => (
                    <div className="sm:flex sm:justify-between space-x-2 p-4 mx-auto max-w-4xl" key={item.id}>
                        {/* for left side */}
                        <div>
                            <div className="space-y-2">
                                <div>
                                    {
                                        loading ? (<Skeleton className="rounded-full bg-blue-400/20">
                                            <p>loading....</p></Skeleton>) : (
                                            <p className="text-2xl font-bold">{item.courseHeading}</p>
                                        )
                                    }
                                </div>
                                <p className="text-gray-400 font-bold">{item.courseShortDescription}</p>
                                <div className="space-x-1">
                                    <Chip startContent={<UserPen size={22} className="text-white/60" />} variant="flat" color="primary" className="px-2"><p className="font-semibold text-white/60">{item.courseInstrutor}</p></Chip>
                                    <Chip startContent={<Clock size={22} className="text-white/60" />} variant="flat" color="primary" className="px-2"><p className="font-semibold text-white/60">{item.courseDuration}</p></Chip>
                                    <Chip startContent={<CalendarCheck size={22} className="text-white/60" />} variant="flat" color="primary" className="px-2"><p className="font-semibold text-white/60">{item.courseDuration}</p></Chip>
                                </div>

                                <div className="mx-auto max-w-3xl">
                                    <div className=" [&>ul]:list-disc [&>ul]:pl-6 max-w-[700px]" dangerouslySetInnerHTML={{ __html: item.courseDescription.replace(/<p>\s*<\/p>/g, "<br>") }} />
                                </div>
                            </div>
                        </div>
                        {/* for right side */}
                        <div>
                            <div className="flex flex-col justify-center items-center border bg-gradient-to-br from-gray-900 to-red-900 rounded">
                                <Image src={item.courseImageURL} alt={item.courseName} height={400} width={400} className="p-4" />
                                <p className="text-2xl font-bold text-white/80">{item.courseName}@{item.coursePrice}</p>
                                <div className="px-4 w-full mb-4 mt-4">
                                    {/* <PlaceOrderBtn price={item.coursePrice} product={item.id} />
                                     */}

                                    <Button onPress={handlePress}>Get access</Button>
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