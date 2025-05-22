"use client";

import { Chip } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { MoveLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Video {
  title: string;
  videoUrl: string;
  videoOrder: number;
  videoId: number;
  courseName: string;
}

const Videos = () => {
  const slug = useParams().slug;

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const router = useRouter();
  // fetch videos for the course
  useEffect(() => {
    (async () => {
      try {
        const sendReq = await fetch(`/api/video/fetch/by-slug?slug=${slug}`);
        const res = await sendReq.json();

        if (res.success) {
          const videos: Video[] = res.videos;
          const videoByOrder: Video[] = videos.sort(
            (a, b) => a.videoOrder - b.videoOrder
          );
          setVideos(videoByOrder);
          setCurrentVideo(videoByOrder[0].videoUrl);
          setCurrentVideoTitle(videoByOrder[0].title);
          setLoading(false);
          return;
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  // handle video change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950">
      <div>
        {loading && (
          <div className="flex justify-center items-center min-h-[90vh]">
            <Spinner />
          </div>
        )}
      </div>
      <div>
        {!loading && videos.length === 0 && (
          <div className="flex justify-center">
            <p className="text-4xl">
              There are no video available right now for this course.
            </p>
          </div>
        )}
      </div>
      <div>
        {videos.length !== 0 && (
          <div>
            <div className="bg-default-300 w-full flex items-center space-x-2 pl-4 shadow-sm shadow-white">
              <div>
                <MoveLeft
                  size={38}
                  color="black"
                  onClick={() => router.push("/profile/enrollments")}
                  className="hover:cursor-pointer"
                />
              </div>
              <div>
                <h3 className="text-black sm:text-2xl text-xl font-semibold">
                  {videos[0].courseName}
                </h3>
              </div>
            </div>
            <div className="py-2">
              <div className="sm:flex justify-between max-w-4xl mx-auto gap-2 sm:space-y-0 space-y-2 px-2">
                <div className="space-y-1">
                  <div>
                    <Chip color="secondary" size="sm">
                      Current playing
                    </Chip>
                  </div>
                  <div className="bg-blue-100 p-2 rounded">
                    <video
                      ref={videoRef}
                      controls
                      width={"500px"}
                      height={"300px"}
                      className="rounded"
                    >
                      <source src={currentVideo} type="video/mp4" />
                    </video>
                    <div>
                      <p className="text-black/70 text-sm font-semibold capitalize">
                        {currentVideoTitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <Chip size="sm">All Videos</Chip>
                  </div>
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className={`bg-yellow-50 w-full text-black flex items-center rounded p-0.5 space-x-2 hover:cursor-pointer ${
                        currentVideo === video.videoUrl
                          ? "bg-stone-600 text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setCurrentVideo(video.videoUrl);
                        setCurrentVideoTitle(video.title);
                      }}
                    >
                      <div>
                        <video
                          width={"100px"}
                          height={"60px"}
                          className="rounded"
                        >
                          <source src={video.videoUrl} />
                        </video>
                      </div>

                      <div>
                        <p className="capitalize text-sm font-bold">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
