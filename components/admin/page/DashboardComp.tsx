"use client";

import { Spinner } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface enrolled {
  courseId: number;
  studentId: number;
  orderPlace: boolean;
}

export default function DashboradComp() {
  const [student, setStudent] = useState([]);
  const [enrolled, setEnrolled] = useState<enrolled[]>([]);

  const [loading, setLoading] = useState(true);

  const enrollments = enrolled.filter(function (items) {
    return items.orderPlace === true;
  });

  const failedEnrollments = enrolled.filter(function (items) {
    return items.orderPlace === false;
  });

  const getAllStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/get-dashboard", {
        method: "GET",
      });

      const response = await res.json();

      const enrollments = response.dashboard[1].enrolled;

      if (response.success === true) {
        setStudent(response.dashboard[0].student);
        setEnrolled(enrollments);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="mt-8 min-h-[90vh]">
      <div className="sm:flex sm:gap-3 sm:space-y-0 space-y-4 max-w-7xl mx-auto w-full">
        <div className="bg-yellow-700/20 p-4 rounded w-64 flex justify-center hover:scale-95 transition-all">
          {loading ? (
            <span>
              <Spinner />
            </span>
          ) : (
            <Link
              href={"/admin/dashboard/students"}
              className="font-semibold hover:underline hover:text-blue-500 hover:scale-105"
            >
              Total students: {student.length}
            </Link>
          )}
        </div>
        <div className="bg-yellow-700/20 p-4 rounded w-64 flex justify-center hover:scale-95 transition-all">
          {loading ? (
            <span>
              <Spinner />
            </span>
          ) : (
            <Link
              href={"/admin/dashboard/student-enrollments"}
              className="font-semibold hover:underline hover:text-blue-500 hover:scale-105"
            >
              Total enrollments: {enrollments.length}
            </Link>
          )}
        </div>
        <div className="bg-yellow-700/20 p-4 rounded w-64 flex justify-center hover:scale-95 transition-all">
          {loading ? (
            <span>
              <Spinner />
            </span>
          ) : (
            <Link
              href={"/"}
              className="font-semibold hover:underline hover:text-blue-500 hover:scale-105"
            >
              Total failed enrollments {failedEnrollments.length}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
