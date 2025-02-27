"use client";
import {
  Button,
  Avatar,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { MoveRight } from "lucide-react";
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
}: {
  email: string;
  name: string;
  courses: courses[];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

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
        <div className="flex justify-center">
          <Button
            className="bg-blue-500 rounded-lg font-bold text-xl justify-center w-80 h-10 items-center flex shadow-md shadow-gray-800 text-white"
            key={"3xl"}
            onPress={() => handleOpen()}
          >
            Your personal details <MoveRight />
          </Button>
          <Modal isOpen={isOpen} size={"2xl"} onClose={onClose} backdrop="blur">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-black">
                    Your Email & Name.
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex justify-center">
                      <Input type="text" defaultValue={name} color="primary" className="w-64" />
                    </div>
                    <div className="flex justify-center">
                      <Input
                        type="text"
                        defaultValue={email}
                        color="primary"
                        className="w-64"
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Link
          className="bg-blue-500 rounded-lg font-bold text-xl justify-center w-80 h-10 items-center flex shadow-md shadow-gray-800"
          href={"/profile/password-change"}
        >
          Change/ Forgot password <MoveRight className="ml-2" />
        </Link>
        <Link
          className="bg-blue-500 rounded-lg font-bold text-xl justify-center w-80 h-10 items-center flex shadow-md shadow-gray-800"
          href={"/profile/enrollments"}
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
