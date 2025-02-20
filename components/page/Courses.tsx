"use client"
import Image from "next/image"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Link from "next/link";

export default function Courses() {

    const courses = [
        {
            title: "Complete web development course",
            description: "Only web development course that you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, Deployment etc",
            thumbnaileImageUrl: "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/thumbImageUrl.jpg",
            category: "Full-Stack Web Development"
        },
        {
            title: "Complete web development course 2",
            description: "Only web development course that you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, Deployment etc",
            thumbnaileImageUrl: "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/thumbImageUrl.jpg",
            category: "Backend-End Web Development"
        },
    ]

    return (
        <div className="mx-auto max-w-7xl p-4 xl:p-1">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="h-[500px] w-full"

            >
                {
                    courses.map((items, index) => (
                        <SwiperSlide key={index}>
                            <div className="h-full w-full rounded-lg bg-gradient-to-r from-black to-blue-900/50">
                                <div className="flex items-center justify-center h-full text-white px-4 ">
                                    <div className="space-y-3">
                                        <p className="inline-flex items-center rounded-full bg-blue-500/40 px-4 py-1 text-sm text-white/80 font-semibold border border-green-300">{items.category}</p>
                                        <p className="text-4xl">{items.title}</p>
                                        <p className="text-sm w-72">{items.description}</p>
                                        <div className="space-x-3">
                                            <Link href={"/"} className="bg-blue-500 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-all">Join Now </Link>
                                            <Link href={"/"} className="bg-gray-600 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-all">Learn</Link>
                                        </div>
                                    </div>
                                    <div className="relative w-full h-40">
                                        <Image
                                            src={items.thumbnaileImageUrl}
                                            alt={items.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))

                }
            </Swiper>
        </div>
    )
}