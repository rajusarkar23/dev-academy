"use client"

import { Code } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    // admin/dashboard
    // admin/dashboard/add-new
    // admin/dashboard/all-courses

    const path = usePathname()

    const dashboardURl = "/admin/dashboard"
    const addNewUrl = "/admin/dashboard/add-new"
    const allCoursesUrl = "/admin/dashboard/all-courses"

    
    
       
    
    
    return (
        <div className="bg-black h-12 shadow-sm shadow-blue-400/50">
            <nav className="flex justify-between items-center max-w-6xl mx-auto px-4">
                <div className="flex space-x-4 justify-center items-center mt-2">
                    <Link className="flex text-2xl items-center" href={"/admin/dashboard"}><Code className="mr-1 mt-0.5" /> Admin panel</Link>
                    <Link className={`${path === dashboardURl ? "text-blue-500 underline underline-offset-2" : "text-white"}`} href={"/admin/dashboard"}>Dashboard</Link>
                </div>
                <div className="flex space-x-4 justify-center items-center mt-2">
                    <Link className="hover:underline hover:text-blue-400 transition-all underline-offset-4" href={"/admin/dashboard/add-new"}>Add new</Link>
                    <Link className="hover:underline hover:text-blue-400 transition-all underline-offset-4" href={"/admin/dashboard/all-courses"}>View all</Link>
                </div>
            </nav>
        </div>
    )
}