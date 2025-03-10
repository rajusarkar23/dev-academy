"use client";

import { Alert, Button, Chip } from "@heroui/react";
import React, { useEffect, useState } from "react";

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
  const [sendingMail, setSendingMail] = useState(false);
  const [mailsent, setMailSent] = React.useState(false);

  const title = "Email sent";
  const description = "Mail has been sent.";

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
              <p>
                Order Id:{" "}
                <span className="text-blue-300 font-bold">
                  {enrollment.orderId}
                </span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                {enrollment.maileSend ? (
                  <Chip className="text-gray-800" color="success">
                    <span className="font-bold">Mail sent</span>
                  </Chip>
                ) : (
                  <Chip className="font-semibold text-blue-900">
                    Mail not sent yet
                  </Chip>
                )}
              </div>
              <div>
                {enrollment.maileSend ? (
                  <></>
                ) : (
                  <div>
                    <Button
                      color="primary"
                      className="font-bold"
                      size="sm"
                      onPress={async () => {
                        try {
                          await fetch(
                            `/api/admin/enrollments/send-mail-for-failed-enrollments?id=${enrollment.orderId}&name=${enrollment.studentName}&email=${enrollment.studentEmail}&courseName=${enrollment.courseName}`
                          );
                          setMailSent(true);
                          enrollment.maileSend = true;
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

      <div className="top-0 fixed right-0 transition-all delay-150">
        {mailsent && (
          <Alert
            color="success"
            description={description}
            isVisible={mailsent}
            title={title}
            variant="faded"
            onClose={() => setMailSent(false)}
          />
        )}
      </div>
    </div>
  );
}

// send-mail-for-failed-enrollments
