"use client"


import { useEffect } from "react";

export default function StudentComp() {
  useEffect(() => {
    const getAllStudents = async () => {
        console.log("ran");
        
      try {
        const res = await fetch("/api/admin/student", {
          method: "GET",
        });

        console.log(await res.json());
      } catch (error) {
        console.log(error);
      }
    };

    getAllStudents()
  }, []);

  return <div>student comp</div>;
}
