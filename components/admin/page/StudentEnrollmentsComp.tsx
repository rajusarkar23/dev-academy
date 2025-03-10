"use client";

import { Alert, Chip, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
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
  const [mailsent, setMailSent] = React.useState(false);
  const [deleted, setDeleted] = useState(false)
  const router = useRouter();

  const title = "Email sent";
  const description = "Mail has been sent successfully.";

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
      <div className="flex justify-center items-center min-h-[90vh]">
        <Spinner />
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
              <div>
                <button
                  className="bg-red-500 rounded-full px-4 py-1"
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `/api/admin/enrollments/delete-failed-enrollments?id=${enrollment.orderId}`,
                        {
                          method: "DELETE",
                        }
                      );
                      const response = await res.json();
                      if (response.success === true) {
                        enrollments.splice(index, 1);
                        router.refresh();
                        setDeleted(true)
                      } else {
                        console.log(response);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
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
                    <button
                      onClick={async (
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {
                        const button = event.currentTarget;
                        button.textContent =
                          button.textContent === "Send mail"
                            ? "Sending..."
                            : "Send mail";
                        button.disabled = true;

                        try {
                          await fetch(
                            `/api/admin/enrollments/send-mail-for-failed-enrollments?id=${enrollment.orderId}&name=${enrollment.studentName}&email=${enrollment.studentEmail}&courseName=${enrollment.courseName}`
                          );
                          setMailSent(true);
                          enrollment.maileSend = true;
                          router.refresh();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      className="bg-blue-600 rounded-full px-4 py-1"
                    >
                      Send mail
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="top-0 fixed right-0">
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
      <div className="top-0 fixed right-0">
        {deleted && (
          <Alert
            color="danger"
            description={"Order has been deleted successfully"}
            isVisible={deleted}
            title={"Deleted"}
            variant="faded"
            onClose={() => setDeleted(false)}
          />
        )}
      </div>
    </div>
  );
}

// send-mail-for-failed-enrollments
