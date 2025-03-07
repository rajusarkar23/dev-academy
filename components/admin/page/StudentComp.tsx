"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";

interface Students {
  id: number;
  email: string;
  name: string;
  enrollments: []
}


export default function StudentComp() {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Students[]>([]);
  const [visible, setVisible] = useState(true)

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

        <div>
          <Button onPress={() => setVisible(!visible)}>Press</Button>
        </div>
        {student.map((items, index) => (
          <div key={index}>
            <Button onPress={onOpen} className="w-full h-16">
              <div>
                <p className="font-semibold">Name: {items.name}</p>
                <p className="font-semibold">Email: {items.email}</p>
              
              </div>
            </Button>

            <div>
              {
                visible && <div>   
                  {
                  items.enrollments.map((course, index) => (
                    <p key={index}>{course.slug}</p>
                  ))
              }
              
              </div>
              }
            </div>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              className="text-black"
              size="5xl"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-2xl text-gray-900">
                      Student details and enrollments
                    </ModalHeader>
                    <ModalBody>
                      <p className="font-semibold">
                        Student name: {items.name}
                      </p>
                      <p className="font-semibold">Email: {items.email}</p>
                      <div className="font-bold">
                        <p>Student enrollments:uiu</p>
                          <p>
                            {/* {
                                items.enrollments.map((course, index) => (
                                  <p>{course.slug}</p>
                                ))
                            } */}

                            dfjfvljfbjkf
                          </p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
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
