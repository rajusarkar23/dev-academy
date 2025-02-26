"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import generateSlug from "@/lib/generate-slug";
import { useRouter } from "next/navigation";

type Inputs = {
  courseName: string;
  slug: string;
  courseHeading: string;
  courseShortDescription: string;
  courseInstructor: string;
  courseDuration: string;
  courseStartDate: string;
  courseEndDate: string;
  studentCapacity: string;
  courseDescription: string;
  courseImageURL: string;
  courseVideoURL: string;
  coursePrice: string;
};

export default function AddNewCourse() {

  const router = useRouter()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [courseDescription, setCourseDescription] = useState("");
  const [name, setName] = useState("");
  console.log(name);

  const setSlug = async () => {
    const slug = await generateSlug(name);
    setValue("slug", slug);
  };
  useEffect(() => {
    setSlug();
  }, [name]);
  useEffect(() => {
    setValue("courseDescription", courseDescription);
  }, [courseDescription]);

  const onsubmit: SubmitHandler<Inputs> = async (data) => {

    try {
      const res = await fetch("/api/admin/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json()
      if (response.success === true) {
        router.push("/admin/dashboard/all-courses")
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return <p>No file selected</p>;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/media-upload", {
        method: "POST",
        body: formData,
      });

      const response = await res.json();

      if (response.success === true) {
        if (e.target.id === "image") {
          console.log("file was a image type");
          setValue("courseImageURL", response.url);
        }

        if (e.target.id === "video") {
          console.log("it was a video type");
          setValue("courseVideoURL", response.url);
        }
      } else {
        console.log("no file");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl mt-10 space-y-5">
      <div>
        <h1 className="text-center text-4xl font-bold">Add a new course</h1>
      </div>
      <form
        className="mx-auto max-w-lg space-y-4"
        onSubmit={handleSubmit(onsubmit)}
      >
        {/* course name and heading */}
        <div className="flex flex-row space-x-3">
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Course name:
            </label>
            <Input
              label="Course name"
              labelPlacement="inside"
              {...register("courseName", {
                required: "Course name is required",
              })}
              onChange={(e) => setName(e.target.value)}
            />
            {errors && (
              <p className="text-sm text-red-500">
                {errors.courseName?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Course heading:
            </label>
            <Input
              label="Course heading"
              labelPlacement="inside"
              {...register("courseHeading", {
                required: "Course heading is required",
              })}
            />
            {errors && (
              <p className="text-sm text-red-500">
                {errors.courseHeading?.message}
              </p>
            )}
          </div>
        </div>

        {/* course instructor and short description */}
        <div className="flex flex-row space-x-3">
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Course short description:
            </label>
            <Input
              label="Course short description"
              labelPlacement="inside"
              {...register("courseShortDescription", {
                required: "Course short description is required",
              })}
            />
            {errors && (
              <p className="text-sm text-red-500">
                {errors.courseShortDescription?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-3">
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Course duration: eg:- 6 Months
            </label>
            <Input
              label="Course duration"
              labelPlacement="inside"
              {...register("courseDuration", {
                required: "Course duration is required",
              })}
            />
            {errors && (
              <p className="text-sm text-red-500">
                {errors.courseDuration?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Student capacity: eg:- 60
            </label>
            <Input
              label="Student capacity"
              labelPlacement="inside"
              {...register("studentCapacity", {
                required: "Student capacity is required",
              })}
            />
            {errors && (
              <p className="text-sm text-red-500">
                {errors.studentCapacity?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Course end date: eg: 02/02/2025
            </label>
            <Input
              label="Course end date"
              labelPlacement="inside"
              {...register("courseEndDate", {
                required: "Course end date is required",
              })}
            />
            {errors && (
              <p className="text-sm text-red-500">
                {errors.courseEndDate?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Course start date: eg:- 01/01/2025
            </label>
            <Input
              label="Course start date"
              labelPlacement="inside"
              {...register("courseStartDate", {
                required: "Course start date is required",
              })}
            />
            {errors && (
              <p className="text-sm text-red-500">
                {errors.courseStartDate?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-3">
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Upload course image:
            </label>
            <Input id="image" type="file" onChange={handleFileUpload} />
          </div>
          <div className="w-full">
            <label className="font-semibold text-sm text-gray-300">
              Upload course video:
            </label>
            <Input id="video" type="file" onChange={handleFileUpload} />
          </div>
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-300">
            Course descripton:{" "}
          </label>
          <RichTextEditor
            content={courseDescription}
            setContent={setCourseDescription}
          />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-300">
            Course Price: eg- 1000{" "}
          </label>
          <Input
            label="Course price"
            labelPlacement="inside"
            {...register("coursePrice", {
              required: "Course price is required",
            })}
          />
          {errors && (
            <p className="text-sm text-red-500">
              {errors.coursePrice?.message}
            </p>
          )}
        </div>

        <div>
          <Input {...register("courseVideoURL")} type="hidden" />
        </div>
        <div>
          <Input {...register("courseImageURL")} type="hidden" />
        </div>
        <div>
          <Input {...register("slug")} type="hidden" />
        </div>

        <div className="flex justify-center w-full">
          <Button type="submit" color="primary" className="font-bold w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
