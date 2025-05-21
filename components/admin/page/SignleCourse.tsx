"use client";

import { deleteCourse } from "@/app/actions/delete-course/action";
import { Button } from "@heroui/button";
import {
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { Upload } from "lucide-react";
import Image from "next/legacy/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Course {
  courseDescription: string;
  courseDuration: string;
  courseEndDate: string;
  courseHeading: string;
  courseImageURL: string;
  courseInstrutor: string;
  courseName: string;
  courseShortDescription: string;
  courseStartDate: string;
  courseVideoURL: string;
  coursePrice: string;
  createdBy: string;
  id: string;
  studentCapacity: string;
}

export default function SingleCourse() {
  const [course, setCourse] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const id = useParams().id;

  // get course by id
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/course/by-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const response = await res.json();

        if (response.success === true) {
          setCourse(response.course);
          setLoading(false);
        } else {
          console.log(response);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  // edit btn click
  const handleEditButtonClick = () => {
    router.push(`/admin/dashboard/courses/edit/${course[0].id}`);
  };

  // handle delete of a course
  const handleDelete = async () => {
    const data = await deleteCourse(Number(id));
    if (data.success === true) {
      router.push("/admin/dashboard/all-courses");
    }
  };

  // if data loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <Spinner size="lg" color="white" />
        </div>
      </div>
    );
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    const form = new FormData();
    form.append("file", file);

    try {
      const sendReq = await fetch("/api/media-upload/video", {
        method: "POST",
        body: form,
      });

      console.log(await sendReq.json());
    } catch (error) {
      console.error(error);
    }
  };

  // video upload modal
  function VideoUploadModal() {
    // modal states
    const { isOpen, onOpen, onClose } = useDisclosure();

    // handle modal open
    const handleOpen = () => {
      onOpen();
    };

    return (
      <>
        <div className="flex flex-wrap gap-3 py-2">
          <Button
            onPress={() => handleOpen()}
            className="w-full text-lg font-bold"
          >
            Upload Course Videos <Upload />
          </Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-black">
                  Upload a new video for this course
                </ModalHeader>
                <ModalBody className="text-black">
                  <div className="space-y-2">
                    <Input
                      label="Video title"
                      placeholder="Enter video title eg: Video no: 1 of abcd, understand basic of abcd"
                      labelPlacement="inside"
                      type="text"
                    />

                    <NumberInput
                      label="Video order"
                      hideStepper
                      placeholder="Enter video order"
                    />
                  </div>
                  <div>
                    <Input
                      type="file"
                      label="Select a video file"
                      accept="video/mkv"
                      onChange={handleVideoUpload}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <div className="py-4">
      {course.map((items) => (
        <div key={items.id}>
          <div className="sm:flex space-x-4 space-y-2 px-4">
            <div className="space-y-2">
              <Image
                src={items.courseImageURL}
                alt={items.courseName}
                width={800}
                height={500}
                className="rounded border"
              />
              <div className="flex justify-center gap-4">
                <Button
                  className="w-full font-bold"
                  color="danger"
                  onPress={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  className="w-full font-bold"
                  color="success"
                  onPress={handleEditButtonClick}
                >
                  Edit
                </Button>
              </div>
              {/* video section */}

              <div>
                <h3 className="text-4xl font-semibold underline underline-offset-4">
                  Videos:-
                </h3>

                <div>
                  <VideoUploadModal />
                </div>
              </div>
            </div>

            <div>
              <div className="mx-auto max-w-xl space-y-2">
                <h2 className="text-3xl font-bold">{items.courseName}</h2>
                <h3>
                  <span className="text-gray-300 font-bold">Heading: </span>{" "}
                  {items.courseHeading}
                </h3>
                <div className="space-x-1">
                  <Chip>
                    <p className="font-bold">Price: {items.coursePrice}</p>
                  </Chip>
                  <Chip>
                    <p className="font-bold">Start: {items.courseStartDate}</p>
                  </Chip>
                  <Chip>
                    <p className="font-bold">End: {items.courseEndDate}</p>
                  </Chip>
                </div>
                <p>
                  <span className="text-gray-300 font-bold">
                    Short description:
                  </span>
                  {items.courseShortDescription}
                </p>
                <div>
                  <span className="text-gray-300 font-bold">Description: </span>
                  <div
                    className=" [&>ul]:list-disc [&>ul]:pl-6 max-w-[700px]"
                    dangerouslySetInnerHTML={{
                      __html: items.courseDescription.replace(
                        /<p>\s*<\/p>/g,
                        "<br>"
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
