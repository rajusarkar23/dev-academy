import { Button, Chip } from "@heroui/react";
import { Pen, Timer, UserPen } from "lucide-react";
import Image from "next/image";

interface courses {
  courseName: string;
  slug: string;
  courseShortDescription: string;
  instructor: string;
  startingDate: string;
  endDate: string;
  imageUrl: string;
}

export default function EnrollmentsComp({ enrolled }: { enrolled: courses[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 px-4 py-10">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {enrolled.map((items) => (
          <div className="bg-white/80 rounded">
            <div className="p-4">
              <Image
                src={items.imageUrl}
                alt={items.courseName}
                width={700}
                height={500}
                className="rounded"
              />
              <div className="bg-white px-2 rounded">
                <p className="text-black font-bold">Course: <span className="text-gray-700">{items.courseName}</span></p>
                <p className="text-black font-bold">Starts on: <span className="text-gray-700">{items.startingDate}</span></p>
                <p className="text-black font-bold">Ends on: <span className="text-gray-700">{items.endDate}</span></p>
                <div>
                  <span><Chip startContent={<UserPen size={22}/>} color="warning" className="px-2"><p className="font-semibold text-gray-700/80">{items.instructor}</p></Chip></span>
              <div className="p-2">
                <Button className="w-full font-bold" color="primary">Visit course page</Button>
              </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
