"use client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
} from "@heroui/react";
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
  const [visible, setVisible] = useState(false);

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
      <div>
        <Skeleton className="rounded-lg bg-gray-500">
          <div className="h-8 w-40 rounded-lg bg-secondary"> loading.....</div>
        </Skeleton>
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
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-2xl text-gray-900">
                      Student details and enrollments
                    </ModalHeader>
                    <ModalBody>
                      {selectedStudent && (
                        <>
                          <p className="font-semibold">
                            Student name: {selectedStudent.name}
                          </p>
                          <p className="font-semibold">
                            Email: {selectedStudent.email}
                          </p>
                          <div className="font-bold">
                            <p className="text-blue-600">Student enrollments:</p>
                            {selectedStudent.enrollments.length > 0 ? (
                              selectedStudent.enrollments.map((course) => (
                                <div>
                                  <p key={course.id} className="text-green-700">{course.courseName}</p>
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
