"use client";

import { useEffect, useState } from "react";

interface Enrollments {
  studentId: number;
  courseId: number;
}

export default function StudentEnrollmentsComp() {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollments[]>([]);
  // console.log(enrollments);

  useEffect(() => {
    setLoading(true);
    const getFailedEnrollments = async () => {
      try {
        const res = await fetch("/api/admin/enrollments/success", {
          method: "GET",
        });

        const response = await res.json();

        if (response.success === true) {
          setEnrollments(response.enrollments);
          const studentIds = response.enrollments.map(
            (ite: Enrollments) => ite.studentId
          );

          console.log(studentIds.length);
          
       
          async function fetchStudents(ids: number){
            try {
                const res = await fetch(`/api/admin/student/by-id?id=${ids}`)
                // console.log(await res.json());

                return res.json()
                
            } catch (error) {
                console.log(error);
                
            }
          }

          async function fetchAll(){
            try {
                const res = []

                for(const id of studentIds) {
                    const student = await fetchStudents(id)

                    res.push(student)
                }

                console.log(res);
                
                
            } catch (error) {
                console.log(error);
                
            }
          }

          setLoading(false);

          fetchAll()
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

  return <div>coursesById</div>;
}
