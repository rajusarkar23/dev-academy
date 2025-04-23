"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/app/actions/logout/student/action";

export default function StudentProifle({
  email,
  profileImage,
}: {
  email: string;
  profileImage: string;
}) {
  const router = useRouter();

  return (
    <Dropdown className="text-black">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name="Jason Hughes"
          size="sm"
          src={profileImage}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="logedInAs">
          <p>Loged in as:</p>
          {email}
        </DropdownItem>
        <DropdownItem key="profile">
          <Link href={"/profile"}>My profile</Link>
        </DropdownItem>
        <DropdownItem key="enrollments">
          <Link href={"/profile/enrollments"}>My enrollments</Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          as="button"
          onPress={async () => {
            await deleteCookie();
            router.push("/");
          }}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
