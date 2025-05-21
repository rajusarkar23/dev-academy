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
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { RefreshCcw, Upload } from "lucide-react";
import Image from "next/legacy/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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

interface Video {
  title: string;
  videoUrl: string;
  videoOrder: number;
  videoId: number;
}

export default function SingleCourse() {
  const [course, setCourse] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // show video comp states
  const [videos, setvideos] = useState<Video[]>([]);
  const [isFetchingVideos, setIsfetchingVideos] = useState<boolean>(false);

  const [firstVideo, setFirstVideo] = useState<string>("");
  const [firstVideoTitle, setFirstVideoTitle] = useState<string>("");

  const id = useParams().id;

  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    handleVideoFetch();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [firstVideo]);

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

  // video upload modal
  function VideoUploadModal() {
    // modal states
    const { isOpen, onOpen, onClose } = useDisclosure();

    // handle modal open
    const handleOpen = () => {
      onOpen();
    };

    const [videoUrl, setVideoUrl] = useState<string>("");
    const [videoUploading, setVideoUploading] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [videoOrder, setVideoOrder] = useState<string>("");

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
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                      label="Video order"
                      placeholder="Enter video order"
                      onChange={(e) => setVideoOrder(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      type="file"
                      label="Select a video file"
                      accept="video/mkv"
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        e.preventDefault();

                        const file = e.target.files?.[0];
                        if (!file) {
                          console.log("No file selected");
                          return;
                        }
                        const form = new FormData();
                        form.append("file", file);

                        try {
                          setVideoUploading(true);
                          setVideoUrl("");
                          const sendReq = await fetch(
                            "/api/media-upload/video",
                            {
                              method: "POST",
                              body: form,
                            }
                          );

                          const res = await sendReq.json();

                          if (res.success) {
                            setVideoUploading(false);
                            setVideoUrl(res.videoUrl);
                            return;
                          } else {
                            setVideoUploading(false);
                          }
                        } catch (error) {
                          console.error(error);
                          setVideoUploading(false);
                        }
                      }}
                    />

                    <div className="flex items-center ml-1">
                      {videoUploading && (
                        <p className="text-xs font-semibold text-blue-600 flex items-center">
                          Uploading... <Spinner size="sm" />
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {videoUrl.length !== 0 && (
                      <video
                        controls
                        width={400}
                        height={300}
                        className="rounded"
                      >
                        <source src={videoUrl} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={async () => {
                      try {
                        const sendReq = await fetch("/api/video/add", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            videoUrl,
                            title,
                            videoOrder: Number(videoOrder),
                            courseId: id,
                          }),
                        });
                        const res = await sendReq.json();

                        if (res.success) {
                          await handleVideoFetch();
                          onClose();
                        } else {
                          console.log(res);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  // fetch videos
  const handleVideoFetch = async () => {
    try {
      setIsfetchingVideos(true);
      const sendReq = await fetch(`/api/video/fetch?refCourse=${id}`, {
        method: "GET",
      });

      const res = await sendReq.json();
      if (res.success) {
        setIsfetchingVideos(false);
        const videos: Video[] = res.videos;
        const videoByOrder = videos.sort((a, b) => a.videoOrder - b.videoOrder);
        setFirstVideo(videoByOrder[0].videoUrl);
        setFirstVideoTitle(videoByOrder[0].title);
        setvideos(videoByOrder);
      } else {
        setIsfetchingVideos(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                <div className="bg-default-300 rounded-lg text-black py-2">
                  <div className="px-4 mx-auto max-w-xl">
                    {videos.length !== 0 && !isFetchingVideos && (
                      <>
                        <div className="flex flex-col justify-center items-center">
                          <div>
                            <video
                              controls
                              width={"550px"}
                              height={"450px"}
                              className="rounded-t-lg"
                              ref={videoRef}
                            >
                              <source src={firstVideo} type="video/mp4" />
                            </video>
                          </div>
                        </div>
                        <div>
                          <p className="text-lg px-2 font-semibold bg-blue-500 capitalize rounded-b-lg">
                            {firstVideoTitle}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="max-w-xl mx-auto px-4">
                    {videos.length === 0 && isFetchingVideos && (
                      <div className="flex items-center justify-center">
                        <p className="text-lg font-bold">No videos avaialble</p>
                        <div
                          className="ml-1 hover:cursor-pointer select-none"
                          onClick={handleVideoFetch}
                        >
                          <RefreshCcw
                            size={18}
                            className={`${
                              isFetchingVideos ? "animate-spin" : ""
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      {videos.length > 0 && (
                        <div>
                          <div
                            className="ml-1 hover:cursor-pointer select-none"
                            onClick={handleVideoFetch}
                          >
                            <RefreshCcw
                              size={18}
                              className={`${
                                isFetchingVideos ? "animate-spin" : ""
                              }`}
                            />
                          </div>
                          <div className="space-y-2">
                            {videos.map((video, index) => (
                              <div
                                key={index}
                                className={`shadow-md rounded-lg flex justify-between items-center pr-2 border-black hover:cursor-pointer ${
                                  firstVideo === video.videoUrl
                                    ? "bg-primary-200"
                                    : ""
                                }`}
                                onClick={() => {
                                  setFirstVideo(video.videoUrl);
                                  setFirstVideoTitle(video.title);
                                }}
                              >
                                <div>
                                  <video
                                    className="rounded"
                                    width={"100px"}
                                    height={"80px"}
                                  >
                                    <source
                                      src={video.videoUrl}
                                      type="video/mp4"
                                    />
                                  </video>
                                </div>

                                <div className="ml-4">
                                  <p>{video.title}</p>
                                </div>
                                <div>
                                  <Button
                                    color="danger"
                                    variant="flat"
                                    className="hover:bg-danger-600 hover:text-white"
                                    onPress={async () => {
                                      try {
                                        const sendReq = await fetch(
                                          `/api/video/delete?id=${video.videoId}`,
                                          {
                                            method: "DELETE",
                                          }
                                        );

                                        const res = await sendReq.json();

                                        if (res.success) {
                                          handleVideoFetch();
                                          return;
                                        } else {
                                          console.log(res);
                                        }
                                      } catch (error) {
                                        console.log(error);
                                      }
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
