"use client";

import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StudentProifle({
  profileImage,
}: {
  profileImage: string;
}) {

  const [isPopOverOpen, setisPopOverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopOverOpen}
      onOpenChange={(open) => setisPopOverOpen(open)}
    >
      <PopoverTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          color="primary"
          name="Jason Hughes"
          size="sm"
          src={profileImage}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 text-black flex flex-col items-center w-36">
          <Link
            href={"/profile"}
            className="hover:bg-default-300 hover:cursor-pointer w-32 flex justify-center py-1 rounded-lg transition-all"
            onClick={() => setisPopOverOpen(false)}
          >
            Profile
          </Link>
          <Link
            href={"/profile/enrollments"}
            className="hover:bg-default-300 hover:cursor-pointer w-32 flex justify-center py-1 rounded-lg transition-all"
            onClick={() => setisPopOverOpen(false)}
          >
            Enrollments
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
