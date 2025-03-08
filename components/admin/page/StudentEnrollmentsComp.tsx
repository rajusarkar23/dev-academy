"use client";

import { useEffect, useState } from "react";

interface Enrollments {
  courseId: number;
  courseName: string;
  email: string;
  name: string;
}

export default function StudentEnrollmentsComp() {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollments[]>([]);
  console.log(enrollments);

  useEffect(() => {
    setLoading(true);
    const getFailedEnrollments = async () => {
      try {
        const res = await fetch("/api/admin/enrollments/success", {
          method: "GET",
        });

        const response = await res.json();

        if (response.success === true) {
          setEnrollments(response.failedEnrollments);
          setLoading(false);
        } else {
          console.log(response);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getFailedEnrollments();
  }, []);

  if (loading) {
    return (
      <div>
        <p>loading....</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-2 sm:grid sm:grid-cols-3 gap-2 justify-center items-center">
      {enrollments.map((enrollment, index) => (
        <div key={index} className="bg-yellow-700/40 p-4 rounded">
          <p>Course name: <span className="text-white/70 font-bold">{enrollment.courseName}</span></p>
          <p>Student name: <span className="text-white/70 font-bold">{enrollment.name}</span></p>
          <p>Student email: <span className="text-white/70 font-bold">{enrollment.email}</span></p>
        </div>
      ))}
    </div>
  );
}
