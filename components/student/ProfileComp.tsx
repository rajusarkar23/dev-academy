"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Avatar, Chip } from "@heroui/react";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface courses {
  courseName: string;
  slug: string;
  courseShortDescription: string;
  instructor: string;
  startingDate: string;
  endDate: string;
  imageUrl: string;
}

export default function ProfileComp({
  email,
  name,
  courses,
}: {
  email: string;
  name: string;
  courses: courses[];
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center">
      <div className="mb-4 flex flex-col justify-center space-y-2">
        <div className="flex justify-center">
          <Avatar
            className="w-24 h-24 text-large"
            src="https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/19APAxl44Y0ZSjHolbJDVrNN3pmlFI-Ly"
          />
        </div>
        <p className="text-center font-bold">Hey, {name}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <Link
          className="bg-gradient-to-br from-blue-950 to-orange-800 rounded-lg font-bold text-xl justify-center w-80 h-10 items-center flex shadow-md shadow-gray-800"
          href={"/profile/personal-details"}
        >
          Your personal details <MoveRight className="ml-2" />
        </Link>
        <Link
          className="bg-gradient-to-br from-blue-950 to-orange-800 rounded-lg font-bold text-xl justify-center w-80 h-10 items-center flex shadow-md shadow-gray-800"
          href={"/profile/personal-details"}
        >
          Change/ Forgot password <MoveRight className="ml-2" />
        </Link>
        <Link
          className="bg-gradient-to-br from-blue-950 to-orange-800 rounded-lg font-bold text-xl justify-center w-80 h-10 items-center flex shadow-md shadow-gray-800"
          href={"/profile/personal-details"}
        >
          Your enrollments <MoveRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

// in profile

// => enrollments
// => profile details
