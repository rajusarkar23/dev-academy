import { Metadata } from "next"
import Navbar from "@/components/page/Navbar"
import "../../globals.css"

export const metadata: Metadata = {
    title: "Browse Course | Dev Academy"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}