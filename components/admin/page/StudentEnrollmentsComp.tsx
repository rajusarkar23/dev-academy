"use client";

import { useEffect, useState } from "react";

interface Enrollments {
    studentId: number,
    courseId: number
}

export default function StudentEnrollmentsComp() {
    const [loading, setLoading] = useState(false)
    const [enrollments, setEnrollments]= useState<Enrollments[]>([])
    console.log(enrollments);
    

  useEffect(() => {
    setLoading(true)
    const getFailedEnrollments = async () => {
      try {
        const res = await fetch("/api/admin/enrollments/success", {
          method: "GET",
        });

        const response = await res.json()

        if (response.success === true) {
            setEnrollments(response.enrollments)
            setLoading(false)
        } else{
            console.log(response);
            setLoading(false)
        }
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

    getFailedEnrollments()
  }, []);

  return <div>coursesById</div>;
}
