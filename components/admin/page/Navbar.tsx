"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function Navbar() {
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
        setIsOpen(false)
    }
  }, [path])

  return (
    <div className="container mx-auto px-4 border-b-small border-white/50">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Dev Academy</span>
        </Link>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden py-4">
          <div className="flex flex-col space-y-4 justify-center items-center">
            <Link
              href="/admin/dashboard/all-courses"
              className="hover:text-blue-600 transition-colors"
            >
              View all courses
            </Link>
            <Link
              href="/admin/dashboard/students"
              className="hover:text-blue-600 transition-colors"
            >
              Students
            </Link>
            <Link
              href={"/admin/dashboard/add-new"}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Add new course
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
