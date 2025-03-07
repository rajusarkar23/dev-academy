"use client";
import { Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";

interface Students {
  id: number;
  email: string;
  name: string;
}

export default function StudentComp() {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Students[]>([]);

  useEffect(() => {
    const getAllStudents = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/student", {
          method: "GET",
        });

        const response = await res.json();

        if (response.success === true) {
          setStudent(response.student);
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

    getAllStudents();
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton className="rounded-lg bg-gray-500">
          <div className="h-8 w-40 rounded-lg bg-secondary"> loading.....</div>
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-4">
        <div className="space-y-2">
            <h2 className="text-center text-5xl font-semibold">Students</h2>
            <p className="text-center font-semibold text-gray-300">Total students: {student.length}</p>
        </div>
      <div className="grid grid-cols-2 gap-4">
        {student.map((items) => (
          <div key={items.id} className="bg-yellow-700/20 p-4 rounded">
            <div className="">
              <h2>Name: {items.name}</h2>
              <p>Email: {items.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
