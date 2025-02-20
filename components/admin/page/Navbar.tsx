import { Code } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="bg-black h-12 shadow-sm shadow-blue-400/50">
            <nav className="flex justify-between items-center max-w-6xl mx-auto px-4">
                <div className="flex space-x-4 justify-center items-center mt-2">
                    <Link className="flex text-2xl items-center" href={"/admin/dashboard"}><Code className="mr-1 mt-0.5" /> Admin panel</Link>
                    <Link className="hover:underline hover:text-blue-400 transition-all underline-offset-4" href={"/admin/dashboard/live-courses"}>Live</Link>
                    <Link className="hover:underline hover:text-blue-400 transition-all underline-offset-4" href={"/admin/dashboard/drafts"}>Drafts</Link>
                </div>
                <div className="flex space-x-4 justify-center items-center mt-2">
                    <Link className="hover:underline hover:text-blue-400 transition-all underline-offset-4" href={"/admin/dashboard/add-new"}>Add new</Link>
                    <Link className="hover:underline hover:text-blue-400 transition-all underline-offset-4" href={"/admin/dashboard/all-courses"}>View all</Link>
                </div>
            </nav>
        </div>
    )
}