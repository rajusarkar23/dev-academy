"use client"

import Link from "next/link";
import { useEffect, useState } from "react"

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
    studentCapacity: string
}

export default function AllCoursesComp() {

    const [courses, setCourses] = useState<course[]>([])


    const getAllCourses = async () => {
        try {
            const res = await fetch("/api/admin/course", {
                method: "GET"
            })

            const response = await res.json()
            if (response.success === true) {
                setCourses(response.courses)
            } else{
                console.log(response);
                
            }

        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getAllCourses()
    }, [])
    return (
        <div>
            {
                courses.map((items) => (
                    <div key={items.id}>
                        <Link href={`/admin/dashboard/course/${items.id}`}>
                            <p>{items.courseName}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}