"use client";

import { Button, Chip } from "@heroui/react";
import { useEffect, useState } from "react";

interface Enrollments {
  courseId: number;
  courseName: string;
  studentEmail: string;
  studentName: string;
  maileSend: boolean;
  orderId: number;
}

export default function StudentEnrollmentsComp() {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollments[]>([]);

  useEffect(() => {
    setLoading(true);
    const getFailedEnrollments = async () => {
      try {
        const res = await fetch("/api/admin/enrollments/success", {
          method: "GET",
        });

        const response = await res.json();
        console.log(response);

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
    <div className="mt-4">
      <div>
        <h1 className="text-4xl text-center font-semibold text-white/70">
          All failed enrollments
        </h1>
      </div>
      <div className="p-2 space-y-2 sm:grid sm:grid-cols-3 gap-2 justify-center items-center">
        {enrollments.map((enrollment, index) => (
          <div key={index} className="bg-yellow-700/40 p-4 rounded space-y-2">
            <div>
              <p>
                Course name:
                <span className="text-white/70 font-bold">
                  {enrollment.courseName}
                </span>
              </p>
              <p>
                Student name:
                <span className="text-white/70 font-bold">
                  {enrollment.studentName}
                </span>
              </p>
              <p>
                Student email:
                <span className="text-white/70 font-bold">
                  {enrollment.studentEmail}
                </span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <Chip>
                {enrollment.maileSend ? (
                  <p className="font-semibold text-green-900">Mail already sent</p>
                ) : (
                  <p className="font-semibold text-blue-900">Mail not sent yet</p>
                )}
              </Chip>
              <div>
                {enrollment.maileSend ? (
                  <></>
                ) : (
                  <div>
                    <Button
                      color="primary"
                      className="font-bold"
                      onPress={async () => {
                        try {
                          const res = await fetch(
                            `/api/admin/enrollments/send-mail-for-failed-enrollments?id=${enrollment.orderId}&name=${enrollment.studentName}&email=${enrollment.studentEmail}&courseName=${enrollment.courseName}`
                          );
                          console.log(await res.json());
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Send mail
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// send-mail-for-failed-enrollments
