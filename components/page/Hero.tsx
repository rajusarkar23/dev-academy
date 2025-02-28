import { CircleArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="background-hero">
            <div className="max-w-6xl">
                <div className="flex justify-center">
                    <Link href={"/course/full-stack-web-development"} className="flex items-center bg-blue-400/40 px-3 py-2 shadow-md mb-1 rounded-full font-bold text-sm hover:scale-105 transition-all border border-green-300/70">Join this bootcamp <CircleArrowRight size={20} className="ml-2" /></Link>
                </div>
                <h1 className="text-6xl text-center ">Master your full-stack web development skills with this bootcamp.</h1>
                <p className="text-center">We will teach here evrything, that make you a good developer. This bootcamp include Recat, Next.js, Node.js, Databases like MongoDB/PostgreSQL</p>
                <div className="flex justify-center mt-2 space-x-4 items-center">
                    <Link href={`/course/full-stack-web-development`} className="px-5 py-3 bg-blue-600 shadow-lg rounded-lg font-bold text-white/80 hover:scale-105 transition-all">Join Now</Link>
                    <Link href={"/course/full-stack-web-development"} className="px-5 py-3 bg-yellow-100/40 rounded-lg font-bold text-white/80 hover:scale-105 transition-all shadow-lg">Learn</Link>
                </div>
            </div>
        </div>
    )
}