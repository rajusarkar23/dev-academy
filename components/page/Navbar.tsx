import { authValidate } from "@/app/actions/auth-validate/action";
import { CodeXml } from "lucide-react";
import Link from "next/link";
import StudentProifle from "../student/StudentProfile";

interface Student {
  email: string;
  profileImage: string;
}

export default async function Navbar() {
  const auth = await authValidate();

  return (
    <nav>
      <div className="navbar px-4 h-16 items-center flex justify-between">
        <div>
          <Link
            href={"/"}
            className="text-2xl font-semibold flex items-center gap-2"
          >
            Dev Acamdemy <CodeXml size={30} />
          </Link>
        </div>

        <div className="space-x-6 font-semibold flex items-center">
          <div className="hidden sm:flex">
            <Link href={"/"}>Courses</Link>
          </div>
          <div>
            {auth.authenticated ? (
              <StudentProifle
                profileImage={auth.studentDetails.map(
                  (student: Student) => student.profileImage
                )}
              />
            ) : (
              <Link
                className="bg-gradient-to-br from-blue-900 to-violet-800/40 p-2 rounded-full px-4"
                href={"/auth/signin"}
              >
                Signin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
