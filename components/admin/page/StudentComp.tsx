"use client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Enrollments {
  id: number,
  courseName: string,
  courseImageURL: string
}

interface Students {
  id: number;
  email: string;
  name: string;
  enrollments: Enrollments[];
}

export default function StudentComp() {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Students[]>([]);

  const [selectedStudent, setSelectedStudent] = useState<Students | null>(null);

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
      <div className="flex justify-center items-center min-h-[92vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-8 space-y-4 min-h-[95vh]">
      <div className="space-y-2">
        <h2 className="text-center text-5xl font-semibold">Students</h2>
        <p className="text-center font-semibold text-gray-300">
          Total students: {student.length}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {student.map((items, index) => (
          <div key={index}>
            {/* Showing name and email id inside a button */}
            <Button
              onPress={() => setSelectedStudent(items)}
              className="w-full h-16"
            >
              <div>
                <p className="font-semibold">Name: {items.name}</p>
                <p className="font-semibold">Email: {items.email}</p>
              </div>
            </Button>
            {/*Creating a modal to show all other course details  */}
            <Modal
              isOpen={!!selectedStudent} //!! transform into boolean value
              onOpenChange={() => setSelectedStudent(null)}
              className="text-black"
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-2xl font-semibold text-blue-600">
                      Student details and enrollments
                    </ModalHeader>
                    <ModalBody>
                      {selectedStudent && (
                        <>
                          <p className="font-semibold">
                            Student name: <span className="text-gray-700 font-bold">{selectedStudent.name}</span>
                          </p>
                          <p className="font-semibold">
                            Email: <span className="text-gray-700 font-bold">{selectedStudent.email}</span>
                          </p>
                          <div className="font-bold">
                            <p className="text-blue-600 underline underline-offset-2 font-bold">Student enrollments:</p>
                            {selectedStudent.enrollments.length > 0 ? (
                              selectedStudent.enrollments.map((course) => (
                                <div key={course.id}>
                                  <Link href={`/admin/dashboard/courses/${course.id}`} className="text-green-700 hover:underline">{course.courseName}</Link>
                                  <Divider />
                                </div>
                              ))
                            ) : (
                              <p className="text-red-500">This student has no enrollments.</p>
                            )}
                          </div>
                        </>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => setSelectedStudent(null)}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
