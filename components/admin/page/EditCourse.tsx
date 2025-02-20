"use client"

import { Input } from "@heroui/input"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@heroui/button"
import RichTextEditor from "./RichTextEditor"

interface course {
    courseDescription: string,
    courseDuration: string,
    courseEndDate: string,
    courseHeading: string,
    courseImageURL: string,
    courseInstrutor: string,
    courseName: string,
    courseShortDescription: string,
    courseStartDate: string,
    courseVideoURL: string,
    createdBy: string,
    id: string,
    studentCapacity: string,
    coursePrice: string
}

type Inputs = {
    courseName: string,
    courseHeading: string,
    courseShortDescription: string,
    courseInstructor: string,
    courseDuration: string,
    courseStartDate: string,
    courseEndDate: string,
    studentCapacity: string,
    courseDescription: string,
    courseImageURL: string,
    courseVideoURL: string,
    id: number,
    coursePrice: string
}

export default function EditCourseComp() {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const [courseDescription, setCourseDescription] = useState("");

    const id = useParams().id
    const router = useRouter()
    const [courses, setCourses] = useState<course[]>([])

    const getCourseById = async () => {
        try {
            const res = await fetch("/api/admin/course/by-id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
            const response = await res.json()
            if (response.success === true) {
                setCourses(response.course)
            } else {
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCourseById()
        setValue("courseDescription", courseDescription)

    }, [courseDescription])
    useEffect(() => {
        setValue("id", Number(id))
    }, [])

    const onsubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await fetch("/api/admin/course/by-id", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await res.json()
            if (response.success === true) {
                router.replace("/admin/dashboard/all-courses")
            } else {
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const selectedFile = e.target.files?.[0]

        if (!selectedFile) {
            return <p>No file selected</p>
        }

        const formData = new FormData()

        formData.append("file", selectedFile)

        try {
            const res = await fetch("/api/media-upload", {
                method: "POST",
                body: formData
            })

            const response = await res.json()

            if (response.success === true) {
                if (e.target.id === "image") {
                    console.log("file was a image type");
                    setValue("courseImageURL", response.url)

                }

                if (e.target.id === "video") {
                    console.log("it was a video type");
                    setValue("courseVideoURL", response.url)
                }

            } else {
                console.log("no file");

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mx-auto max-w-4xl mt-10 space-y-5">
            <div>
                <h1 className="text-center text-4xl font-bold">Edit course</h1>
            </div>
            {
                courses.map((items) => (
                    <form className="mx-auto max-w-lg space-y-4" key={items.id} onSubmit={handleSubmit(onsubmit)}>
                        {/* course name and heading */}
                        <div className="flex flex-row space-x-3">
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course name:</label>
                                <Input defaultValue={items.courseName} {...register("courseName", { required: "Course heading is required" })} />
                            </div>
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course heading:</label>
                                <Input defaultValue={items.courseHeading} {...register("courseHeading", { required: "Course heading is required" })} />
                            </div>
                        </div>

                        {/* course instructor and short description */}
                        <div className="flex flex-row space-x-3">
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course short description:</label>
                                <Input defaultValue={items.courseShortDescription}
                                    {...register("courseShortDescription", { required: "Course short description is required" })}

                                />
                                {errors && <p className="text-sm text-red-500">{errors.courseShortDescription?.message}</p>}
                            </div>

                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course instructor:</label>
                                <Input defaultValue={items.courseInstrutor} {...register("courseInstructor", { required: "Course instructor is required" })} />
                                {errors && <p className="text-sm text-red-500">{errors.courseInstructor?.message}</p>}
                            </div>

                        </div>

                        <div className="flex flex-row space-x-3">
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course duration: eg:- 6 Months</label>
                                <Input defaultValue={items.courseDuration} {...register("courseDuration", { required: "Course duration is required" })} />
                                {errors && <p className="text-sm text-red-500">{errors.courseDuration?.message}</p>}

                            </div>
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Student capacity: eg:- 60</label>
                                <Input defaultValue={items.studentCapacity} {...register("studentCapacity", { required: "Student capacity is required" })} />
                                {errors && <p className="text-sm text-red-500">{errors.studentCapacity?.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-row space-x-3">
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course end date: eg: 02/02/2025</label>
                                <Input defaultValue={items.courseEndDate} {...register("courseEndDate", { required: "Course end date is required" })} />
                                {errors && <p className="text-sm text-red-500">{errors.courseEndDate?.message}</p>}
                            </div>
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course start date: eg:- 01/01/2025</label>
                                <Input defaultValue={items.courseStartDate} {...register("courseStartDate", { required: "Course start date is required" })} />
                                {errors && <p className="text-sm text-red-500">{errors.courseStartDate?.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Upload course image:</label>
                                <Input id="image" type="file" onChange={handleFileUpload} />
                            </div>
                            <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Upload course video:</label>
                                <Input id="video" type="file" onChange={handleFileUpload} />
                            </div>
                            
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-gray-300">Course descripton: </label>
                            <RichTextEditor content={items.courseDescription} setContent={setCourseDescription} />
                        </div>
                        <div className="w-full">
                                <label className="font-semibold text-sm text-gray-300">Course price: eg:- 1000</label>
                                <Input defaultValue={items.coursePrice} {...register("coursePrice", { required: "Course price is required" })} />
                                {errors && <p className="text-sm text-red-500">{errors.coursePrice?.message}</p>}
                            </div>

                        <div>
                            <Input {...register("courseVideoURL")} type="hidden" defaultValue={items.courseVideoURL} />
                        </div>
                        <div>
                            <Input {...register("courseImageURL")} type="hidden" defaultValue={items.courseImageURL} />
                        </div>

                        <div className="flex justify-center w-full">
                            <Button type="submit" color="primary" className="font-bold w-full">Submit</Button>
                        </div>

                    </form>
                ))
            }

        </div>
    )
}