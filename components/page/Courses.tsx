"use client";
import Image from "next/legacy/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";

export default function Courses() {

  const courses = [
    {
      title: "Unlock opportunities with this Master Docker course.",
      description:
        "Containers have revolutionized how modern applications are developed, deployed, and managed.",
      thumbnaileImageUrl:
        "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/1_mktjwp",
      category: "Docker mastery",
      link: "/course/master-docker"
    },
    {
      title: "Master React.js - Build Modern Web Applications",
      description:
        "Unlock the power of React.js, the most popular front-end library, and become a skilled web developer.",
      thumbnaileImageUrl:
        "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/1_d61p4i",
      category: "Master React.js",
      link: "/course/master-reactjs"
    },
  ];

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
        {courses.map((items, index) => (
          <SwiperSlide key={index}>
            <div className="h-full rounded-lg bg-gradient-to-r from-black to-blue-900/50 flex justify-center items-center px-4">
              <div className="sm:flex text-white gap-4 space-y-3">
                <div className="flex justify-center pt-10 px-1 sm:mb-8">
                  <Image
                    src={items.thumbnaileImageUrl}
                    alt={items.title}
                    className="rounded-lg"
                    height={800}
                    width={1600}
                  />
                </div>
                <div className="space-y-3 flex flex-col justify-center">
                  <p className="inline-flex items-center rounded-full bg-blue-500/40 px-4 py-1 text-sm text-white/80 font-semibold border border-green-300 w-64 text-center">
                    {items.category}
                  </p>
                  <p className="text-4xl">{items.title}</p>
                  <p className="text-sm w-72">{items.description}</p>
                  <div className="space-x-3">
                    <Link
                      href={items.link}
                      className="bg-blue-500 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
                    >
                      Join Now
                    </Link>
                    <Link
                      href={items.link}
                      className="bg-gray-600 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
                    >
                      Learn
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
