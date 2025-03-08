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
        console.log(response);
        

        if (response.success === true) {
          setEnrollments(response.enrollments);
          const studentIds = response.enrollments.map(
            (ite: Enrollments) => ite.studentId
          );
          const courseId = response.enrollments.map(
            (ite: Enrollments) => ite.courseId
          );

          console.log(courseId);

          async function fetchStudents(ids: number) {
            try {
              const res = await fetch(`/api/admin/student/by-id?id=${ids}`);

              return res.json();
            } catch (error) {
              console.log(error);
            }
          }

          async function fetchAllStudents() {
            try {
              const students = [];

              for (const id of studentIds) {
                const student = await fetchStudents(id);

                students.push(student);
              }

              console.log(students);
            } catch (error) {
              console.log(error);
            }
          }

          async function fetchCourses(ids: number) {
            try {
              const res = await fetch(`/api/admin/course/by-id?id=${ids}`);

              return res.json();
            } catch (error) {
              console.log(error);
            }
          }

          async function fetchAllCourses() {
            try {
              const courses = [];

              for (const ids of courseId) {
                const course = await fetchCourses(ids);

                courses.push(course);
              }

              console.log(courses);
            } catch (error) {
              console.log(error);
            }
          }

          fetchAllCourses();
          fetchAllStudents();
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

  return <div>coursesById</div>;
}
