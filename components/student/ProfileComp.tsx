"use client";
import Image from "next/image";
import Link from "next/link";


export default function ProfileComp({
  email,
  name,
  profileImage,
}: {
  email: string;
  name: string;
  profileImage: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center">
      <div className="w-[100px] h-[100px] rounded-full">
        <Image
          src={profileImage}
          width={300}
          height={150}
          alt="profile-image"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-xl">Hello, {name}</h3>
        <h3>Email: {email}</h3>

        <p>
          Looking for
          <span className="text-primary-500 hover:cursor-pointer underline underline-offset-2">
            <Link href={"/profile/enrollments"}> Enrollments</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
