import { CodeXml } from "lucide-react";
import Link from "next/link";

export default function Navbar() {

    return (
        <nav>
            <div className="navbar px-4 h-16 items-center flex justify-between">
                <div>
                    <Link href={"/"} className="text-2xl font-semibold flex items-center gap-2">Dev Acamdemy <CodeXml size={30} /></Link>
                </div>
                <div className="space-x-6 font-semibold flex items-center">
                    <div>
                        <Link href={"/"}>Courses</Link>
                    </div>
                    <div>
                        <Link href={"/"}>Courses</Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}