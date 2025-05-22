"use client";

import {
  Button,
  Card,
  Spinner,
  Image,
  CardFooter,
} from "@heroui/react";
import { BookOpenCheck, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfileDetails } from "@/app/actions/get-student-profile-details/action";
import { useRouter } from "next/navigation";

interface courses {
  courseName: string;
  slug: string;
  courseShortDescription: string;
  instructor: string;
  startingDate: string;
  endDate: string;
  imageUrl: string;
}

export default function EnrollmentsComp() {
  const [isLoading, setIsLoading] = useState(true);
  const [enrollments, setEnrollmenets] = useState<courses[]>([]);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const fetchProfileDetails = async () => {
      const data = await getProfileDetails();
      setEnrollmenets(data.studentDetails.courses);
      setIsLoading(false);
    };
    fetchProfileDetails();
  }, []);

  // if (isLoading) {
  //   return <div>loading...</div>
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950">
      <div className="bg-default-300 w-full flex items-center space-x-2 pl-10 shadow-sm shadow-white">
        <div>
          <MoveLeft
            size={38}
            color="black"
            onClick={() => router.push("/")}
            className="hover:cursor-pointer"
          />
        </div>
        <div>
          <h3 className="text-black text-2xl font-semibold">
            Your Enrollments
          </h3>
        </div>
      </div>

      <div>
        {isLoading && (
          <div className="min-h-[90vh] flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>

      <div>
        {enrollments.length === 0 && (
          <div className="flex justify-center items-center min-h-[90vh]">
            <p>You do&#39;nt have any enrollments yet.</p>
          </div>
        )}
      </div>
      {/* NEW CARD */}
      <div>
        {enrollments.length !== 0 && (
          <div className="p-2">
            {enrollments.map((enrollment, index) => (
              <Card
                isFooterBlurred
                className="max-w-md h-[300px] col-span-12 sm:col-span-7"
                key={index}
              >
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-[500px] h-[270px] object-cover"
                  src={enrollment.imageUrl}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <BookOpenCheck size={30} />
                    <div className="flex flex-col">
                      <p className="text-tiny text-white/60">
                        Course: {enrollment.courseName}
                      </p>
                      <p className="text-tiny text-white/60">
                        By: {enrollment.instructor}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button
                      radius="full"
                      size="sm"
                      className="font-semibold"
                      onPress={() => router.push(`/course/${enrollment.slug}`)}
                    >
                      Details
                    </Button>
                    <Button
                      radius="full"
                      size="sm"
                      color="success"
                      className="font-semibold"
                    >
                      Videos
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
