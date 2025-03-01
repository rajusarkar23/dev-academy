"use client";

import { useEffect, useState } from "react";

interface enrolled {
  courseId: number;
  studentId: number;
  orderPlace: boolean;
}

export default function DashboradComp() {
  const [student, setStudent] = useState([]);
  const [enrolled, setEnrolled] = useState<enrolled[]>([]);

  const enrollments = enrolled.filter(function (items) {
    return items.orderPlace === true;
  });

  const failedEnrollments = enrolled.filter(function (items) {
    return items.orderPlace === false;
  });

  const getAllStudents = async () => {
    try {
      const res = await fetch("/api/admin/get-dashboard", {
        method: "GET",
      });

      const response = await res.json();

      const enrollments = response.dashboard[1].enrolled;

      if (response.success === true) {
        setStudent(response.dashboard[0].student);
        setEnrolled(enrollments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="mt-8">
      <div className="flex space-x-5">
        <p className="bg-black p-4 rounded text-2xl font-bold hover:scale-95 transition-all">Total Students: {student.length}</p>
        <p className="bg-black p-4 rounded text-2xl font-bold hover:scale-95 transition-all">Total Enrollments: {enrollments.length}</p>
        <p className="bg-black p-4 rounded text-2xl font-bold hover:scale-95 transition-all">Total failed Enrollments: {failedEnrollments.length}</p>
      </div>
    </div>
  );
}
